<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private const REFRESH_COOKIE = 'refresh_token';
    private const REFRESH_TTL_MINUTES = 60 * 24 * 14;

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $accessToken = JWTAuth::fromUser($user);

        return $this->respondWithToken($accessToken, $user);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        if (!$accessToken = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Wrong credentials'], 401);
        }

        return $this->respondWithToken($accessToken, auth('api')->user());
    }
    public function me(Request $request)
    {
        return response()->json(auth('api')->user());
    }

    public function logout(Request $request){
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out'])
            ->withCookie(Cookie::forget(self::REFRESH_COOKIE));
    }

    public function refresh(Request $request){
        $refreshToken = $request->cookie(self::REFRESH_COOKIE);

        if(!$refreshToken){
            return response()->json(['error' => 'Refresh token is missing'], 401);
        }

        try {
            $payload = JWTAuth::setToken($refreshToken)->getPayload();
            $user = User::find($payload->get('sub'));
            if (!$user) {
                throw new JWTException('User not found');
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Refresh token is invalid'], 401);
        }

        $newAccessToken = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $newAccessToken,
        ]);
    }

    private function respondWithToken(string $accessToken, User $user)
    {
        $payload = JWTAuth::factory()
            ->customClaims(['refresh' => true])
            ->setTTL(self::REFRESH_TTL_MINUTES)
            ->make(['sub' => $user->getJWTIdentifier()]);

        $refreshToken = (string) JWTAuth::manager()->encode($payload);

        $cookie = Cookie::make(
            self::REFRESH_COOKIE,
            $refreshToken,
            self::REFRESH_TTL_MINUTES,
            '/',
            null,
            true,
            true,
            false,
            'Lax'
        );

        return response()->json([
            'access_token' => $accessToken,
        ])->withCookie($cookie);
    }
}

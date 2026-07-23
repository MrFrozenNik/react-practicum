<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = auth('api')->user();

        $query = Order::with(['items', 'user'])->orderBy('created_at', 'desc');

        if (!$user->is_admin) {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->get());
    }

    public function show(Request $request, Order $order): JsonResponse
    {
        $user = auth('api')->user();

        if (!$user->is_admin && $order->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        return response()->json($order->load(['items', 'user']));
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validated = $validator->validated();
        $user = auth('api')->user();

        $order = DB::transaction(function () use ($user, $validated) {
            $order = Order::create([
                'user_id' => $user->id,
                'comment' => $validated['comment'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                $order->items()->create([
                    'product_id' => $product->id,
                    'title' => $product->title,
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                ]);
            }

            return $order;
        });

        return response()->json($order->load('items'), 201);
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => ['required', Rule::enum(OrderStatus::class)],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order->update(['status' => $validator->validated()['status']]);

        return response()->json($order->load('items'));
    }
}

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware(['api', 'auth:api'])->prefix('profile')->group(function () {
    Route::patch('name', [ProfileController::class, 'updateName']);
    Route::patch('password', [ProfileController::class, 'updatePassword']);
});

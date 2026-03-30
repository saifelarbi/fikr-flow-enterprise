<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\StatsController;

// Apply CORS middleware to all routes
Route::middleware(\App\Http\Middleware\CorsMiddleware::class)->group(function () {
    // Health check endpoint
    Route::get('/health', function () {
        return response()->json(['status' => 'ok', 'message' => 'Backend is running']);
    });

    // Public routes
    Route::post('/auth/signup', [AuthController::class, 'signup']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    // Clients
    Route::apiResource('clients', ClientController::class);

    // Invoices
    Route::apiResource('invoices', InvoiceController::class);

    // Expenses
    Route::apiResource('expenses', ExpenseController::class);

    // Stats
    Route::get('/stats/summary', [StatsController::class, 'summary']);
    });
});

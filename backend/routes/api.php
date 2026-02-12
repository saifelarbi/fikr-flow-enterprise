<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\StatsController;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes (for MVP, will add middleware in production)
Route::middleware('api')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Clients
    Route::apiResource('clients', ClientController::class);

    // Invoices
    Route::apiResource('invoices', InvoiceController::class);

    // Expenses
    Route::apiResource('expenses', ExpenseController::class);

    // Stats
    Route::get('/stats/summary', [StatsController::class, 'summary']);
    Route::get('/stats/invoices', [StatsController::class, 'invoiceStats']);
    Route::get('/stats/expenses', [StatsController::class, 'expenseStats']);
});

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
    ]);
});

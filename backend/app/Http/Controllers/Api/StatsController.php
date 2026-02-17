<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function summary(Request $request)
    {
        $user = $request->user();
        
        // Default to current month
        $dateFrom = $request->has('date_from') 
            ? $request->date_from 
            : now()->firstDayOfMonth()->toDateString();
        $dateTo = $request->has('date_to') 
            ? $request->date_to 
            : now()->toDateString();

        // Revenue from selling invoices
        $revenue = $user->invoices()
            ->where('type', 'SELLING')
            ->whereDate('invoice_date', '>=', $dateFrom)
            ->whereDate('invoice_date', '<=', $dateTo)
            ->sum('total');

        // Expenses
        $expenses = $user->expenses()
            ->whereDate('expense_date', '>=', $dateFrom)
            ->whereDate('expense_date', '<=', $dateTo)
            ->sum('amount');

        // Pending invoices
        $pendingInvoices = $user->invoices()
            ->whereIn('status', ['DRAFT', 'SENT'])
            ->whereDate('invoice_date', '>=', $dateFrom)
            ->whereDate('invoice_date', '<=', $dateTo)
            ->sum('total');

        // Total clients
        $totalClients = $user->clients()->count();

        // Profit
        $profit = $revenue - $expenses;

        // Revenue by invoice type
        $revenueByType = $user->invoices()
            ->selectRaw('type, SUM(total) as total')
            ->whereDate('invoice_date', '>=', $dateFrom)
            ->whereDate('invoice_date', '<=', $dateTo)
            ->groupBy('type')
            ->get()
            ->keyBy('type');

        // Expenses by category
        $expensesByCategory = $user->expenses()
            ->selectRaw('category, SUM(amount) as total, COUNT(*) as count')
            ->whereDate('expense_date', '>=', $dateFrom)
            ->whereDate('expense_date', '<=', $dateTo)
            ->groupBy('category')
            ->get();

        return response()->json([
            'revenue' => (float) $revenue,
            'expenses' => (float) $expenses,
            'profit' => (float) $profit,
            'pending_invoices' => (float) $pendingInvoices,
            'total_clients' => $totalClients,
            'date_from' => $dateFrom,
            'date_to' => $dateTo,
            'revenue_by_type' => $revenueByType,
            'expenses_by_category' => $expensesByCategory,
        ]);
    }
}

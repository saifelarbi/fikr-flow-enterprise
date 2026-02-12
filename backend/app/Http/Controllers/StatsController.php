<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Expense;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function summary()
    {
        $userId = auth()->id() ?? 1;

        $totalRevenue = Invoice::where('user_id', $userId)
            ->where('type', 'SELLING')
            ->sum('total');

        $totalExpenses = Expense::where('user_id', $userId)
            ->sum('amount');

        $profit = $totalRevenue - $totalExpenses;

        $invoices = [
            'buying' => Invoice::where('user_id', $userId)->where('type', 'BUYING')->count(),
            'selling' => Invoice::where('user_id', $userId)->where('type', 'SELLING')->count(),
        ];

        $topExpenseCategory = Expense::where('user_id', $userId)
            ->select('category', DB::raw('SUM(amount) as total'))
            ->groupBy('category')
            ->orderByDesc('total')
            ->first();

        return response()->json([
            'totalRevenue' => $totalRevenue,
            'totalExpenses' => $totalExpenses,
            'profit' => $profit,
            'invoices' => $invoices,
            'topExpenseCategory' => $topExpenseCategory->category ?? null,
        ]);
    }

    public function invoiceStats()
    {
        $userId = auth()->id() ?? 1;

        $stats = Invoice::where('user_id', $userId)
            ->select('type', DB::raw('COUNT(*) as count'), DB::raw('SUM(total) as total'))
            ->groupBy('type')
            ->get();

        return response()->json($stats);
    }

    public function expenseStats()
    {
        $userId = auth()->id() ?? 1;

        $stats = Expense::where('user_id', $userId)
            ->select('category', DB::raw('SUM(amount) as total'))
            ->groupBy('category')
            ->orderByDesc('total')
            ->get();

        return response()->json($stats);
    }
}

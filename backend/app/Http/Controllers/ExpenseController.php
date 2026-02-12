<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id() ?? 1;
        $category = $request->query('category');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Expense::where('user_id', $userId);

        if ($category) {
            $query->where('category', $category);
        }

        if ($startDate) {
            $query->whereDate('date', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('date', '<=', $endDate);
        }

        $expenses = $query->orderBy('date', 'desc')->get();

        return response()->json([
            'data' => $expenses,
            'total' => $expenses->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $expense = Expense::create([
            'user_id' => auth()->id() ?? 1,
            'category' => $validated['category'],
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'date' => $validated['date'],
        ]);

        return response()->json($expense, 201);
    }

    public function show(Expense $expense)
    {
        return response()->json($expense);
    }

    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'category' => 'sometimes|string',
            'amount' => 'sometimes|numeric|min:0',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
        ]);

        $expense->update($validated);

        return response()->json($expense);
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully']);
    }
}

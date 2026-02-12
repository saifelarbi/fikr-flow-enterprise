<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id() ?? 1;
        $type = $request->query('type');

        $query = Invoice::where('user_id', $userId)->with('client', 'items');

        if ($type) {
            $query->where('type', $type);
        }

        $invoices = $query->orderBy('date', 'desc')->get();

        return response()->json([
            'data' => $invoices,
            'total' => $invoices->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'type' => 'required|in:BUYING,SELLING',
            'invoice_number' => 'required|string|unique:invoices',
            'amount' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'date' => 'required|date',
            'items' => 'nullable|array',
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|numeric|min:0',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $tax = $validated['tax'] ?? 0;
        $total = $validated['amount'] + $tax;

        $invoice = Invoice::create([
            'user_id' => auth()->id() ?? 1,
            'client_id' => $validated['client_id'],
            'type' => $validated['type'],
            'invoice_number' => $validated['invoice_number'],
            'amount' => $validated['amount'],
            'tax' => $tax,
            'total' => $total,
            'status' => 'DRAFT',
            'date' => $validated['date'],
        ]);

        if (!empty($validated['items'])) {
            foreach ($validated['items'] as $item) {
                $itemTotal = $item['quantity'] * $item['unit_price'];
                $invoice->items()->create([
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total' => $itemTotal,
                ]);
            }
        }

        return response()->json($invoice->load('items'), 201);
    }

    public function show(Invoice $invoice)
    {
        return response()->json($invoice->load('client', 'items'));
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'status' => 'sometimes|string',
            'tax' => 'sometimes|numeric',
        ]);

        $invoice->update($validated);

        return response()->json($invoice);
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->items()->delete();
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $invoices = $request->user()->invoices()
            ->with('client', 'items')
            ->get();
        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'type' => 'required|in:BUYING,SELLING',
            'invoice_number' => 'required|string|unique:invoices',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'status' => 'nullable|in:DRAFT,SENT,PAID,OVERDUE',
            'notes' => 'nullable|string',
            'items' => 'nullable|array',
            'items.*.description' => 'required_with:items|string',
            'items.*.quantity' => 'required_with:items|numeric|min:0',
            'items.*.unit_price' => 'required_with:items|numeric|min:0',
            'items.*.amount' => 'required_with:items|numeric|min:0',
        ]);

        // Verify client belongs to user
        $client = $request->user()->clients()->findOrFail($validated['client_id']);

        $invoice = $request->user()->invoices()->create($validated);

        // Create invoice items if provided
        if (isset($validated['items'])) {
            foreach ($validated['items'] as $item) {
                $invoice->items()->create($item);
            }
        }

        return response()->json([
            'invoice' => $invoice->load('items'),
        ], 201);
    }

    public function show(Request $request, Invoice $invoice)
    {
        $this->authorize('view', $invoice);
        return response()->json($invoice->load('client', 'items'));
    }

    public function update(Request $request, Invoice $invoice)
    {
        $this->authorize('update', $invoice);

        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'type' => 'sometimes|in:BUYING,SELLING',
            'invoice_number' => 'sometimes|string|unique:invoices,invoice_number,' . $invoice->id,
            'invoice_date' => 'sometimes|date',
            'due_date' => 'nullable|date',
            'subtotal' => 'sometimes|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'sometimes|numeric|min:0',
            'status' => 'nullable|in:DRAFT,SENT,PAID,OVERDUE',
            'notes' => 'nullable|string',
        ]);

        $invoice->update($validated);
        return response()->json($invoice->load('client', 'items'));
    }

    public function destroy(Request $request, Invoice $invoice)
    {
        $this->authorize('delete', $invoice);
        $invoice->delete();
        return response()->json(['message' => 'Invoice deleted']);
    }
}

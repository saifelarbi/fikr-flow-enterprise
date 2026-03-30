<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $clients = $request->user()->clients()->get();
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'tax_id' => 'nullable|string',
            'company_name' => 'nullable|string',
        ]);

        $client = $request->user()->clients()->create($validated);
        return response()->json($client, 201);
    }

    public function show(Request $request, Client $client)
    {
        $this->authorize('view', $client);
        return response()->json($client);
    }

    public function update(Request $request, Client $client)
    {
        $this->authorize('update', $client);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'tax_id' => 'nullable|string',
            'company_name' => 'nullable|string',
        ]);

        $client->update($validated);
        return response()->json($client);
    }

    public function destroy(Request $request, Client $client)
    {
        $this->authorize('delete', $client);
        $client->delete();
        return response()->json(['message' => 'Client deleted']);
    }
}

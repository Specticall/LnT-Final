<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProductResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        // Get the user data
        $user = User::find(Auth::user()->id);
        
        // Get the most recent user invoice (on_progress)
        $mostRecentInvoice = $user->invoices()->latest()->first();

        // Get every product related to the invoice
        $allInvoiceProducts = $mostRecentInvoice->products;

        return inertia("Invoice", [
            "mostRecentInvoice" => new InvoiceResource($mostRecentInvoice),
            'invoiceProducts' => ProductResource::collection($allInvoiceProducts),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Add new item to the on_progress invoice
     */
    public function store(StoreInvoiceRequest $request)
    {   
        $data = $request->validated();
        $user = User::find(Auth::user()->id);

        // Find the most recent invoice (always on progress)
        $mostRecentInvoice = $user->invoices()->latest()->first();

        // Retrieve the data that wants to be added
        $productId = $data["product_id"];
        
        // Insert the data into the invoice.
        $mostRecentInvoice->products()->attach($productId);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {


        // Get every product related to the invoice
        $allInvoiceProducts = $invoice->products;

        return inertia("Invoice", [
            "mostRecentInvoice" => new InvoiceResource($invoice),
            'invoiceProducts' => ProductResource::collection($allInvoiceProducts),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {   
        $data = $request->validated();
        
        $invoice->update([
            "shipping_address" => $data["shipping_address"],
            "postal_code" => $data["postal_code"],
            "status" => "completed",
        ]);


        // Create a new invoice
        Invoice::create([
            'user_id' => Auth::user()->id,
            'invoice_number' => fake()->unique()->numerify('INV#####'),
            'shipping_address' => "",
            'created_at' => time(),
            'postal_code' => 0,
            'category' => "",
            "status" => "on_progress",
        ]);

        return redirect()->route('product.index')->with("success", "Invoice Successfuly Created");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}

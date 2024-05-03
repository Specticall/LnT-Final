<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ProductResource;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        // 1. Retrieve all products from the database.
        $products = Product::all();

        // Whatever we pass here will be passed into the inertia array, it will become available in frontend. So make sure to not pass sensitive information.
        // Once we pass the data to the view, it gets sent to the view. this is similar to doing express's `response.send({})`
        if(Auth::user()->role == "user") {
            $user = User::find(Auth::user()->id);

            // get the most recent invoice the user created.
            $mostRecentInvoice = $user->invoices()->latest()->first();

            // If recent invoice does not exist then create a new one
            if(!$mostRecentInvoice) {
                $mostRecentInvoice = $mostRecentInvoice = Invoice::create([
                    'user_id' => $user->id,
                    'invoice_number' => fake()->unique()->numerify('INV#####'),
                    'shipping_address' => "",
                    'created_at' => time(),
                    'postal_code' => 0,
                    'category' => "",
                ]);
            };

            // Get every product related to the invoice
            $allInvoiceProducts = $mostRecentInvoice->products;


            return inertia('UserProduct', [
                'products' => ProductResource::collection($products),
                'recentInvoice' => new InvoiceResource($mostRecentInvoice),
                'invoiceProducts' => ProductResource::collection($allInvoiceProducts),
                "serverMessage" => session("serverMessage"),    
            ]);
        }

        return inertia('Product', [
            'products' => ProductResource::collection($products),
            "serverMessage" => session("serverMessage"),    
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        dd("create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {           
        $data = $request->validated();

        if($data["action"] == "update") {
            $product = Product::find($request->id);
            return $this->update($request, $product);
        }

        $image = $data["image_file"] ?? null;
        if($image) {
            $data["image_URL"] = $image->store('product/'.Str::random(), 'public');
        }
        Product::create($data);

        return to_route('product.index')->with("serverMessage", "Product was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProductRequest $request, Product $product)
    {
        // dd($request->all());
        $data = $request->validated();
        
        // // Retrieve the previous URL
        $previousURL = $product->image_URL;
        
        // dd($request->hasFile("image_file"));
        if($request->hasFile("image_file")) {  
            // Deletes old image.            
            if(Storage::exists('public/' . $previousURL)) {
                Storage::disk("public")->delete($previousURL);
            }
            
            // Handle the image editing process
            $image = $data["image_file"] ?? null;
            // Insert the new file
            $data["image_URL"] = $image->store('product/'.Str::random(), 'public');
        }

        $product->update($data);
        return to_route("product.index")->with("serverMessage", "Successfully edited");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {   
        $name = $product->name;
        if(Auth::user()->role !== "admin") {
            return to_route("product.index")->with("serverMessage", "Invalid Permission");
        }
        
        // Delete the image
        if (Storage::exists('public/' . $product->image_URL)) {
            Storage::delete('public/' . $product->image_URL);
        }

        $product->delete();
        
        return to_route("product.index")->with("serverMessage", "Successfully deleted \"$name\"");
    }
}

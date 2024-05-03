<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    /**
     * Transform the a request into a JSON format of the product table.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'category' => $this->category,
            'price' => $this->price,
            'imageURL' => Storage::exists('public/' . $this->image_URL) ? Storage::url($this->image_URL) : $this->image_URL,
            'id' => $this->id,
        ];
    }
}

/*

        $table->string("category");
        $table->string("name");
        $table->integer("price");
        $table->string("image_URL");
        $table->id();

*/

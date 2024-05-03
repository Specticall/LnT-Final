<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'invoice_number',
        'shipping_address',
        'created_at',
        'postal_code',
        'category' 
    ];
    
    // Inoice table belongs to user tables because users are able to create invoices.
    public function users()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'invoice_products');
    }
}

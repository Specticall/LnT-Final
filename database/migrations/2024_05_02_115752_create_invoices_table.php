<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->string("invoice_number");
            $table->string("category");
            $table->longText("shipping_address");
            $table->integer("postal_code");

            $table->string("status")->default("on_progress");

            // Each users can have many invoices.
            $table->foreignId("user_id")->references("id")->on("users");

            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};

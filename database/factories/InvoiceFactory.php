<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_number' => fake()->unique()->numerify('INV#####'),
            'category' => fake()->word(),
            'shipping_address' => fake()->address(),
            'postal_code' => "999999",
            'user_id' => null,
            'created_at' => time(),
            'status' => "on_progress",
        ];
    }
}

/*
            $table->string("invoice_number");
            $table->string("category");
            $table->longText("shipping_address");
            $table->integer("postal_code");

            // Each users can have many invoices.
            $table->foreignId("user_id")->references("id")->on("users");

            $table->id();
            $table->timestamps();
*/

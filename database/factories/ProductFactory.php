<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category' => fake()->realText(),
            'name' => fake()->sentence(),
            'price' => fake()->randomFloat(0, 1, 500000),
            'image_URL' => fake()->imageUrl(),
        ];
    }
}


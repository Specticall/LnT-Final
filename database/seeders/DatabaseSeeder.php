<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Joseph',
        //     'email' => 'josephyusmita@gmail.com',
        //     'password' => bcrypt("password"),
        //     'phone_number' => '081210248515',
        //     'role' => "admin",
        // ]);

        // Product::factory()->count(20)->create();

        $productIds = [1, 2, 3, 4, 5];
        $users = User::where("role", "user")->get();

        foreach($users as $user) {
            $invoice = Invoice::factory()->make();
            $invoice->user_id = $user->id;
            $invoice->save();
            for($i = 0; $i < count($productIds); $i++) {
                $invoice->products()->attach($productIds[$i]);
            };
        }
    }
}

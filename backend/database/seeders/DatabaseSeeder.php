<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@test.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('adminadmin'),
                'email_verified_at' => now(),
            ]
        );
        $admin->is_admin = true;
        $admin->save();

        Product::factory()->count(24)->create();
        $testUser = User::where('email', 'test@test.com')->first();

        Order::factory()
            ->count(5)
            ->create(['user_id' => $testUser->id])
            ->each(function (Order $order) {
                OrderItem::factory()
                    ->count(fake()->numberBetween(1, 4))
                    ->for($order)
                    ->create();
            });

    }
}

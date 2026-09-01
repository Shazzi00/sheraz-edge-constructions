<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'sherazasadkhan123@gmail.com'],
            [
                'name' => 'Sheraz Admin',
                'password' => Hash::make('12345678'),
            ]
        );
    }
}
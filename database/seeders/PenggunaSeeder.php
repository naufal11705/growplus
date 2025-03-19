<?php

namespace Database\Seeders;

use App\Models\Pengguna;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenggunaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'role_id' => 1,
                'username' => 'testadmin',
                'password' => bcrypt('123456'),
                'nama' => 'Test Admin',
                'email' => 'testadmin@gmail.com'
            ],
            [
                'role_id' => 2,
                'username' => 'testuser',
                'password' => bcrypt('123456'),
                'nama' => 'Test User',
                'email' => 'testuser@gmail.com'
            ],
            [
                'role_id' => 3,
                'username' => 'testpetugas',
                'password' => bcrypt('123456'),
                'nama' => 'Test Petugas',
                'email' => 'testpetugas@gmail.com'
            ],
        ];

        foreach ($data as $user) {
            Pengguna::create($user);
        }

        Pengguna::factory(10)->create();
    }
}

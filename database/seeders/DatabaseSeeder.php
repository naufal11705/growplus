<?php

namespace Database\Seeders;

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

        $this->call([
            RoleSeeder::class,
            PenggunaSeeder::class,
            PuskesmasSeeder::class,
            ImunisasiSeeder::class,
            OrangTuaSeeder::class,
            FasKesSeeder::class,
            AnakSeeder::class,
            FaseSeeder::class,
            ArtikelSeeder::class,
            TantanganSeeder::class,
        ]);
    }
}

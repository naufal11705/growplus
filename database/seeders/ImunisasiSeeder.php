<?php

namespace Database\Seeders;

use App\Models\Imunisasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImunisasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Imunisasi::factory(10)->create();
    }
}

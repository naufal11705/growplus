<?php

namespace Database\Seeders;

use App\Models\FasKes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FasKesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FasKes::factory(20)->create();
    }
}

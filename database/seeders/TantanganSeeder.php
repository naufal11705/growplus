<?php

namespace Database\Seeders;

use App\Models\Tantangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TantanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tantangan::factory(15)->create();
    }
}

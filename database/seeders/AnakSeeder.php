<?php

namespace Database\Seeders;

use App\Models\Anak;
use Illuminate\Database\Seeder;

class AnakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Anak::factory(1)->create();
    }
}

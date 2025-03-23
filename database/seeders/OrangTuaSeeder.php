<?php

namespace Database\Seeders;

use App\Models\OrangTua;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrangTuaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrangTua::factory(1)->create();
    }
}

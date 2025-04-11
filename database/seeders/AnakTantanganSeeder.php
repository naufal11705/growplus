<?php

namespace Database\Seeders;

use App\Models\AnakTantangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnakTantanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'anak_id' => 2,
                'tantangan_id' => 1,
            ],
            [
                'anak_id' => 2,
                'tantangan_id' => 2,
            ],
            [
                'anak_id' => 2,
                'tantangan_id' => 3,
            ],
        ];

        foreach ($data as $anakTantangan) {
            AnakTantangan::create($anakTantangan);
        }
    }
}

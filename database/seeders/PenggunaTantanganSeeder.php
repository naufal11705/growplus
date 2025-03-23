<?php

namespace Database\Seeders;

use App\Models\PenggunaTantangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenggunaTantanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'pengguna_id' => 2,
                'tantangan_id' => 1,
            ],
            [
                'pengguna_id' => 2,
                'tantangan_id' => 2,
            ],
            [
                'pengguna_id' => 2,
                'tantangan_id' => 3,
            ],
        ];

        foreach ($data as $penggunaTantangan) {
            PenggunaTantangan::create($penggunaTantangan);
        }
    }
}

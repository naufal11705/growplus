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
        $data = [
            [
                'puskesmas_id' => 2,
                'nama' => 'Imunisasi DPT',
                'jenis' => 'DPT',
                'usia_minimum' => 2,
                'usia_maksimum' => 5,
                'tanggal' => now()
            ],
            [
                'puskesmas_id' => 2,
                'nama' => 'Imunisasi Polio',
                'jenis' => 'Polio',
                'usia_minimum' => 2,
                'usia_maksimum' => 5,
                'tanggal' => now()
            ],
            [
                'puskesmas_id' => 3,
                'nama' => 'Imunisasi Campak',
                'jenis' => 'Campak',
                'usia_minimum' => 9,
                'usia_maksimum' => 12,
                'tanggal' => now()
            ],
        ];
        foreach ($data as $imunisasi) {
            Imunisasi::create($imunisasi);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Puskesmas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PuskesmasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Puskesmas Ledo',
                'alamat' => 'Jl. Raya No. 1',
                'kecamatan' => 'Ledo',
                'kota' => 'Bengkalis',
                'kontak' => '081234567890',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Puskesmas Bengkalis',
                'alamat' => 'Jl. Raya No. 2',
                'kecamatan' => 'Bengkalis',
                'kota' => 'Bengkalis',
                'kontak' => '081234567891',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nama' => 'Puskesmas Siak Kecil',
                'alamat' => 'Jl. Raya No. 3',
                'kecamatan' => 'Siak Kecil',
                'kota' => 'Bengkalis',
                'kontak' => '081234567892',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($data as $puskesmas) {
            Puskesmas::create($puskesmas);
        }
    }
}

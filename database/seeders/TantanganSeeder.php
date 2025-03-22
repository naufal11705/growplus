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
        $data = [
            // Challenge 1: Usia Kehamilan 1-3 Bulan (Trimester 1)
            [
                'fase_id' => 1,
                'activity' => 'Melakukan pemeriksaan kehamilan',
                'point' => 10,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 1,
                'activity' => 'Mengecek tanda bahaya kehamilan',
                'point' => 15,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 1,
                'activity' => 'Tidur selama 6-7 jam di malam hari, tidur siang 1-2 jam',
                'point' => 5,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 1,
                'activity' => 'Menghindari paparan rokok',
                'point' => 10,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 1,
                'activity' => 'Mengonsumsi tablet tambah darah',
                'point' => 10,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Challenge 2: Pemberian (MPASI)
            [
                'fase_id' => 2,
                'activity' => 'Mulai MPASI pada usia 6 bulan dengan makanan yang kaya gizi',
                'point' => 15,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 2,
                'activity' => 'Perkenalkan berbagai jenis makanan dengan tekstur lembut',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 2,
                'activity' => 'Berikan sayur dan buah setiap hari untuk memenuhi kebutuhan gizi',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Challenge 3: Makanan Bergizi
            [
                'fase_id' => 3,
                'activity' => 'Berikan makanan yang mengandung protein, karbohidrat, dan lemak',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 3,
                'activity' => 'Pastikan anak mendapatkan sumber vitamin dan mineral yang cukup',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 3,
                'activity' => 'Hindari memberikan makanan olahan dan cepat saji yang tinggi gula',
                'point' => 15,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Challenge 4: Pencegahan Stunting
            [
                'fase_id' => 4,
                'activity' => 'Pastikan anak mendapatkan asupan gizi yang cukup sejak dalam kandungan',
                'point' => 15,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 4,
                'activity' => 'Tingkatkan perkembangan gizi yang seimbang untuk anak di usia bayi/belita',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 4,
                'activity' => 'Lakukan imunisasi lengkap untuk mendukung tumbuh kembang optimal',
                'point' => 15,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Challenge 5: Imunisasi Dasar
            [
                'fase_id' => 5,
                'activity' => 'Pastikan anak mendapatkan imunisasi dasar lengkap sesuai jadwal',
                'point' => 15,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 5,
                'activity' => 'Konsultasikan dengan tenaga medis jika anak mengalami efek setelah imunisasi',
                'point' => 10,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fase_id' => 5,
                'activity' => 'Jangan lupa mencatat jadwal imunisasi berikutnya agar tidak terlewat',
                'point' => 5,
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($data as $tantangan) {
            Tantangan::create($tantangan);
        }

        Tantangan::factory(15)->create();
    }
}

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
        $data = [
            [
                'orangtua_id' => 1,
                'nama' => 'Hasan',
                'nik' => '1234567890123456',
                'no_jkn' => '1234567890123456789',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '2020-01-15',
                'golongan_darah' => 'A',
                'berat_badan' => 30,
                'tinggi_badan' => 50,
                'jenis_kelamin' => 1,
                'sudah_lahir' => 1,
                'tanggal_terakhir_menstruasi' => null,
            ],
            [
                'orangtua_id' => 1,
                'nama' => 'Husein',
                'nik' => '1234567890123457',
                'no_jkn' => '1234567890123456790',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => null,
                'golongan_darah' => 'B',
                'berat_badan' => 37,
                'tinggi_badan' => 48,
                'jenis_kelamin' => 2,
                'sudah_lahir' => 1,
                'tanggal_terakhir_menstruasi' => '2025-02-23',
            ],
            [
                'orangtua_id' => 2,
                'nama' => 'Zahra',
                'nik' => '1234567890123458',
                'no_jkn' => '1234567890123456801',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '2024-12-23',
                'golongan_darah' => 'O',
                'berat_badan' => 32,
                'tinggi_badan' => 49,
                'jenis_kelamin' => 1,
                'sudah_lahir' => 1,
                'tanggal_terakhir_menstruasi' => null,
            ],
            [
                'orangtua_id' => 3,
                'nama' => 'Wiwin',
                'nik' => '1234567890123459',
                'no_jkn' => '1234567890123456812',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '2025-01-30',
                'golongan_darah' => 'AB',
                'berat_badan' => 38,
                'tinggi_badan' => 52,
                'jenis_kelamin' => 2,
                'sudah_lahir' => 1,
                'tanggal_terakhir_menstruasi' => null,
            ],
        ];
        foreach ($data as $item) {
            Anak::create($item);
        }
    }
}

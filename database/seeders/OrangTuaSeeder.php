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
    protected $fillable = [
        'pengguna_id',
        'nama',
        'nik',
        'no_jkn',
        'tempat_lahir',
        'tanggal_lahir',
        'golongan_darah',
        'jenis_kelamin',
        'alamat',
        'kecamatan',
        'kabupaten',
        'provinsi',
        'pekerjaan',
        'penghasilan',
        'sumber_penghasilan',
        'jumlah_tanggungan',
        'status_rumah',
        'tanggungan_listrik',
        'tanggungan_air',
        'tingkat_ekonomi'
    ];
    public function run(): void
    {
        $data = [
            [
                'pengguna_id' => 1,
                'nama' => 'Suparni',
                'nik' => '1234567890123456',
                'no_jkn' => '9876543210',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '1980-01-01',
                'golongan_darah' => 'A',
                'jenis_kelamin' => 'Perempuan',
                'alamat' => 'Jl. Merdeka No. 1',
                'kecamatan' => 'Ledo',
                'kabupaten' => 'Bengkalis',
                'provinsi' => 'Kalimantan Selatan',
                'pekerjaan' => 'PNS',
                'penghasilan' => 5000000,
                'sumber_penghasilan' => 'Gaji',
                'jumlah_tanggungan' => 3,
                'status_rumah' => 'Milik Sendiri',
                'tanggungan_listrik' => 1,
                'tanggungan_air' => 1,
                'tingkat_ekonomi' => 1
            ],
            [
                'pengguna_id' => 2,
                'nama' => 'Dina Maria Ulfa',
                'nik' => '6543210987654321',
                'no_jkn' => '0123456789',
                'tempat_lahir' => 'Bandung',
                'tanggal_lahir' => '1990-02-02',
                'golongan_darah' => 'B',
                'jenis_kelamin' => 'Perempuan',
                'alamat' => 'Jl. Merdeka No. 2',
                'kecamatan' => 'Antapani',
                'kabupaten' => 'Bandung',
                'provinsi' => 'Jawa Barat',
                'pekerjaan' => 'Swasta',
                'penghasilan' => 3000000,
                'sumber_penghasilan' => 'Usaha Sendiri',
                'jumlah_tanggungan' => 2,
                'status_rumah' => 'Kontrak',
                'tanggungan_listrik' => 1,
                'tanggungan_air' => 1,
                'tingkat_ekonomi' => 2
            ],
            [
                'pengguna_id' => 3,
                'nama' => 'Fatimah',
                'nik' => '7890123456789012',
                'no_jkn' => '3456789012',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '1985-03-03',
                'golongan_darah' => 'O',
                'jenis_kelamin' => 'Perempuan',
                'alamat' => 'Jl. Merdeka No. 3',
                'kecamatan' => 'Gubeng',
                'kabupaten' => 'Surabaya',
                'provinsi' => 'Jawa Timur',
                'pekerjaan' => 'Wirausaha',
                'penghasilan' => 1000000,
                'sumber_penghasilan' => 'Usaha Sendiri',
                'jumlah_tanggungan' => 4,
                'status_rumah' => 'Kontrak',
                'tanggungan_listrik' => 1,
                'tanggungan_air' => 1,
                'tingkat_ekonomi' => 3
            ],
        ];
        foreach ($data as $orangTua) {
            OrangTua::create($orangTua);
        }
    }
}

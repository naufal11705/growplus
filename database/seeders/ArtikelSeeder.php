<?php

namespace Database\Seeders;

use App\Models\Artikel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArtikelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'artikel_id' => 1,
                'title' => 'Kehamilan Trimester 1',
                'author' => 'Harimurti Samosir',
                'content' => 'Meskipun secara fisik perubahan pada ibu belum jelas terlihat, 
                tetapi pastinya terjadi perubahan besar dalam tubuh ibu, seperti kadar hormon 
                yang berubah secara signifikan. Rahim akan mulai mendukung pertumbuhan 
                plasenta dan janin. Tubuh juga akan menambah suplai darah untuk membawa 
                oksigen dan nutrisi ke janin yang sedang berkembang.
                
                Pada trimester pertama ini, janin akan mengembangkan semua organnya pada 
                akhir bulan ketiga. Makanya, momen-momen ini sangat penting agar ibu hamil 
                mempertahankan pola makan sehat, termasuk menambahkan jumlah asam folat 
                yang cukup untuk membantu mencegah cacat tabung saraf pada janin.
                
                Selama trimester pertama, risiko keguguran biasanya cukup tinggi. 
                Oleh sebab itu, ibu harus menjaga kondisi dan vitalitas tubuh. Tanyakan 
                kondisi kesehatan ibu hamil kepada dokter untuk penanganan kehamilan yang tepat.',
                'slug' => 'kehamilan-trimester-1',
                'banner' => 'ilustrasi-kehamilan-1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'artikel_id' => 2,
                'title' => 'Kehamilan Trimester 2',
                'author' => 'Lulut Maryadi',
                'content' => 'Trimester kedua adalah periode paling nyaman bagi mayoritas ibu hamil. 
                Sebagian besar gejala kehamilan awal seperti morning sickness akan menghilang. 
                Perut juga akan mulai terlihat membesar karena rahim akan tumbuh dengan cepat pada masa-masa ini.
                
                Walaupun gejala mual perlahan hilang, tetapi ada beberapa keluhan umum yang akan dirasakan ibu, 
                termasuk kram kaki, nyeri di ulu hati, selera makan tinggi, muncul varises, sakit punggung, 
                dan terkadang hidung tersumbat.
                
                Trimester kedua adalah masa ketika ibu hamil dapat merasakan janin bergerak untuk pertama kalinya. 
                Biasanya, pergerakan ini terjadi pada minggu ke-20 masa kehamilan. Pada momen ini, 
                janin bahkan bisa mendengar dan mengenali suara ibu.
                
                Beberapa tes screening biasanya dilakukan pada trimester kedua. Pastikan untuk membicarakan 
                riwayat medis pribadi dan keluarga kepada dokter untuk mengetahui masalah genetik yang dapat 
                memberikan risiko pada janin.
                
                Trimester kedua juga menjadi momen ketika bagian-bagian tubuh janin terbentuk seperti jantung, 
                paru-paru, ginjal, dan otak. Ibu juga bisa mengetahui jenis kelamin bayi di trimester kedua. 
                Biasanya selama trimester kedua, dokter menguji diabetes gestasional yang umumnya dideteksi 
                antara minggu ke-26 dan 28 masa kehamilan.',
                'slug' => 'kehamilan-trimester-2',
                'banner' => 'ilustrasi-kehamilan-2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'artikel_id' => 3,
                'title' => 'Kehamilan Trimester 3',
                'author' => 'Salsabila Pertiwi',
                'content' => 'Trimester ketiga berlangsung dari minggu ke-28 kehamilan sampai masa kelahiran bayi. 
                Pada trimester ketiga, janin sudah bisa membuka, menutup mata, dan menghisap jempolnya. 
                Janin bisa menendang, merenggangkan badan, dan merespon cahaya.
                
                Memasuki bulan kedelapan, pertumbuhan otak akan berlangsung terus dan cepat. 
                Ibu mungkin bisa mendapatkan bentuk siku atau tumit di perut. Di bulan ke 9 
                atau usia kehamilan 34-36 minggu paru-paru sudah matang dan siap bekerja sendiri.
                
                Untuk ibu sendiri akan ada pemeriksaan teratur seperti tes urine untuk mengetahui 
                kadar protein di dalam tubuh, memeriksa tekanan darah, memantau detak jantung janin, 
                dan persiapan-persiapan lain menuju proses persalinan.',
                'slug' => 'kehamilan-trimester-3',
                'banner' => 'ilustrasi-kehamilan-3.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($data as $artikel) {
            Artikel::create($artikel);
        }
    }
}

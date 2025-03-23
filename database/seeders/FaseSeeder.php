<?php

namespace Database\Seeders;

use App\Models\Fase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $data = [
            [
                'judul' => 'Usia Kehamilan 1-3 Bulan',
                'deskripsi' => 'Mengawali perjalanan sebagai seorang ibu adalah pengalaman yang luar biasa dan penuh tantangan. Dalam tantangan harian ini, Anda akan diajak untuk memahami dan mempersiapkan setiap tahap kehamilan dengan lebih baik. Mulai dari menjaga kesehatan diri, memantau perkembangan janin, hingga memastikan asupan gizi yang optimal bagi calon buah hati. Setiap hari, Anda akan diberikan tugas sederhana namun bermanfaat, seperti memeriksa kondisi kehamilan, menerapkan pola makan sehat, serta menjaga keseimbangan emosional. Dengan menyelesaikan setiap tantangan, Anda tidak hanya memperkaya pengetahuan, tetapi juga memastikan kesejahteraan diri dan bayi yang sedang berkembang. 🌱 Mulai perjalanan ini dan jadilah ibu yang siap menghadapi tantangan dengan penuh percaya diri! 💕',
                'benefits' => 'Memastikan kesehatan ibu dan perkembangan bayi. Agar dapat dirawat dengan segera jika ditemukan kondisi yang membahayakan ibu dan bayi. ',
                'banner' => 'https://i.ibb.co.com/KMqbPmX/brave-screenshot.png',
                'progress' => 20,
                'status' => 1
            ],
            [
                'judul' => 'Usia Kehamilan 4-6 Bulan',
                'deskripsi' => 'Memasuki trimester kedua kehamilan, Anda akan semakin dekat dengan momen kehadiran si kecil. Dalam tantangan harian ini, Anda akan diajak untuk memperdalam pemahaman tentang perkembangan janin yang pesat. Mulai dari menjaga stamina ibu, memastikan nutrisi seimbang, hingga mempersiapkan bonding awal dengan calon bayi. Setiap hari, Anda akan mendapatkan tugas ringan namun bermakna, seperti melakukan peregangan ringan, mencatat pola makan, atau belajar teknik relaksasi. Dengan setiap langkah kecil ini, Anda membangun fondasi kuat untuk kesehatan ibu dan bayi, sekaligus menikmati perjalanan menuju keajaiban kelahiran. 🌟 Bersama-sama, kita wujudkan kehamilan yang sehat dan bahagia! 💖',
                'benefits' => 'Memastikan kesehatan ibu dan perkembangan bayi. Agar dapat dirawat dengan segera jika ditemukan kondisi yang membahayakan ibu dan bayi. ',
                'banner' => 'https://i.ibb.co.com/KMqbPmX/brave-screenshot.png',
                'progress' => 0,
                'status' => 1
            ],
            [
                'judul' => 'Usia Kehamilan 7-9 Bulan',
                'deskripsi' => 'Trimester ketiga adalah puncak perjalanan kehamilan menuju kelahiran si kecil. Dalam tantangan harian ini, Anda akan dipandu untuk mempersiapkan diri menyambut kelahiran dengan penuh kesiapan. Mulai dari menjaga kesehatan fisik, mempelajari tanda-tanda persalinan, hingga memastikan nutrisi optimal untuk ibu dan janin. Setiap hari, Anda akan diberikan tugas praktis seperti latihan pernapasan, menyiapkan kebutuhan persalinan, atau berkonsultasi dengan tenaga medis. Dengan menyelesaikan tantangan ini, Anda akan merasa lebih tenang dan percaya diri menghadapi hari istimewa tersebut. 🌸 Sambut buah hati Anda dengan cinta dan kesiapan penuh! 💞',
                'benefits' => 'Memastikan kesehatan ibu dan perkembangan bayi. Agar dapat dirawat dengan segera jika ditemukan kondisi yang membahayakan ibu dan bayi. ',
                'banner' => 'https://i.ibb.co.com/KMqbPmX/brave-screenshot.png',
                'progress' => 0,
                'status' => 1
            ],
            [
                'judul' => 'Usia 0-6 Bulan',
                'deskripsi' => 'Memasuki fase pertama kehidupan si kecil, tantangan harian ini akan membantu Anda menavigasi dunia baru sebagai orang tua. Anda akan diajak untuk memahami kebutuhan bayi usia 0-6 bulan, mulai dari menyusui, menjaga kebersihan, hingga memantau tumbuh kembangnya. Setiap hari, Anda akan mendapatkan tugas sederhana seperti mencatat jadwal menyusui, melakukan stimulasi sederhana, atau memastikan tidur bayi yang nyenyak. Dengan setiap langkah, Anda akan semakin percaya diri merawat si kecil, memastikan ia tumbuh sehat dan bahagia. 🌼 Awali perjalanan parenting Anda dengan cinta dan perhatian! 💙',
                'benefits' => 'Memastikan kesehatan ibu dan perkembangan bayi. Agar dapat dirawat dengan segera jika ditemukan kondisi yang membahayakan ibu dan bayi. ',
                'banner' => 'https://i.ibb.co.com/KMqbPmX/brave-screenshot.png',
                'progress' => 0,
                'status' => 1
            ],
            [
                'judul' => 'Usia 6-12 Bulan',
                'deskripsi' => 'Di usia 6-12 bulan, si kecil mulai menunjukkan perkembangan yang menakjubkan. Dalam tantangan harian ini, Anda akan dipandu untuk mendukung tumbuh kembangnya dengan cara yang menyenangkan. Mulai dari memperkenalkan makanan pendamping ASI, melatih motorik, hingga membangun kelekatan emosional. Setiap hari, Anda akan diberikan tugas ringan seperti mencoba resep MPASI sehat, bermain bersama, atau memantau milestone perkembangan. Dengan mengikuti tantangan ini, Anda membantu si kecil menjelajahi dunia dengan penuh semangat dan nutrisi yang tepat. 🌈 Bersama, wujudkan langkah awal yang kuat untuk masa depannya! 💚',
                'benefits' => 'Memastikan kesehatan ibu dan perkembangan bayi. Agar dapat dirawat dengan segera jika ditemukan kondisi yang membahayakan ibu dan bayi. ',
                'banner' => 'https://i.ibb.co.com/KMqbPmX/brave-screenshot.png',
                'progress' => 0,
                'status' => 0
            ],
        ];

        foreach ($data as $fase) {
            Fase::create($fase);
        }

        // Fase::factory(5)->create();
    }
}

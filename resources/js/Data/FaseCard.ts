import { Fase } from "../types/fase";

export const fases: Fase[] = [
    {
        fase_id: 1,
        judul: "Usia Kehamilan 1-3 Bulan (Trimester 1)",
        subjudul: "Masa Penting Pembentukan Bagian Tubuh Janin",
        deskripsi:
            "Mengawali perjalanan sebagai seorang ibu adalah pengalaman yang luar biasa dan penuh tantangan. Dalam tantangan harian ini, Anda akan diajak untuk memahami dan mempersiapkan setiap tahap kehamilan dengan lebih baik. Mulai dari menjaga kesehatan diri, memantau perkembangan janin, hingga memastikan asupan gizi yang optimal bagi calon buah hati. Setiap hari, Anda akan diberikan tugas sederhana namun bermanfaat, seperti memeriksa kondisi kehamilan, menerapkan pola makan sehat, serta menjaga keseimbangan emosional. Dengan menyelesaikan setiap tantangan, Anda tidak hanya memperkaya pengetahuan, tetapi juga memastikan kesejahteraan diri dan bayi yang sedang berkembang.🌱 Mulai perjalanan ini dan jadilah ibu yang siap menghadapi tantangan dengan penuh percaya diri! 💕",
        banner: "https://i.ibb.co.com/KMqbPmX/brave-screenshot.png",
        tantangans: [
            {
                tantangan_id: 1,
                activity: "Melakukan pemeriksaan kehamilan"
            },
            {
                tantangan_id: 2,
                activity: "Mengecek tanda bahaya kehamilan"
            },
            {
                tantangan_id: 3,
                activity: "Tidur selama 6-7 jam di malam hari, tidur siang 1-2 jam"
            },
            {
                tantangan_id: 4,
                activity: "Menghindari paparan rokok"
            },
            {
                tantangan_id: 5,
                activity: "Mengonsumsi tablet tambah darah"
            }
        ],
        benefits: [
            "Persiapan Mental dan Emosional",
            "Pola Hidup Sehat untuk Ibu dan Bayi",
            "Kesadaran akan Pemeriksaan Kehamilan",
            "Edukasi Seputar Kehamilan ",
            "Membangun Kebiasaan Positif Sejak Dini",
        ],
        progress: 60,
        status: 1,
    },
    {
        fase_id: 2,
        judul: "Pemberian (MPASI)",
        subjudul:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        deskripsi:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        banner: "https://i.ibb.co.com/zVLq5b3D/image.png",
        tantangans: [
            {
                tantangan_id: 6,
                activity: "Mulai MPASI pada usia 6 bulan dengan makanan yang kaya gizi."
            },
            {
                tantangan_id: 7,
                activity: "Perkenalkan berbagai jenis makanan dengan tekstur lembut."
            },
            {
                tantangan_id: 8,
                activity: "Berikan sayur dan buah setiap hari untuk memenuhi kebutuhan gizi."
            }
        ],
        benefits: ["Persiapan Mental dan Emosional"],
        progress: 80,
        status: 0,
    },
    {
        fase_id: 3,
        judul: "Makanan Bergizi",
        subjudul:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        deskripsi:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        banner: "https://i.ibb.co.com/KMqbPmX/brave-screenshot.png",
        tantangans: [
            {
                tantangan_id: 9,
                activity: "Berikan makanan yang mengandung protein, karbohidrat, dan lemak."
            },
            {
                tantangan_id: 10,
                activity: "Pastikan anak mendapatkan sumber vitamin dan mineral yang cukup"
            },
            {
                tantangan_id: 11,
                activity: "Hindari memberikan makanan olahan dan cepat saji yang tinggi gula"
            }
        ],
        benefits: ["Persiapan Mental dan Emosional"],
        progress: 80,
        status: 0,
    },
    {
        fase_id: 4,
        judul: "Pencegahan Stunting",
        subjudul:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        deskripsi:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        banner: "https://i.ibb.co.com/KMqbPmX/brave-screenshot.png",
        tantangans: [
            {
                tantangan_id: 12,
                activity: "Pastikan anak mendapatkan asupan gizi yang cukup sejak dalam kandungan."
            },
            {
                tantangan_id: 13,
                activity: "Tingkatkan perkembangan gizi yang seimbang untuk anak di usia bayi/belita."
            },
            {
                tantangan_id: 14,
                activity: "Lakukan imunisasi lengkap untuk mendukung tumbuh kembang optimal."
            }
        ],
        benefits: ["Persiapan Mental dan Emosional"],
        progress: 20,
        status: 0,
    },
    {
        fase_id: 5,
        judul: "Imunisasi Dasar",
        subjudul:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        deskripsi:
            "Selamat! Anda kini siap memasuki tahapan baru dalam kehidupan, menjadi Ibu.",
        banner: "https://i.ibb.co.com/KMqbPmX/brave-screenshot.png",
        tantangans: [
            {
                tantangan_id: 15,
                activity: "Pastikan anak mendapatkan imunisasi dasar lengkap sesuai jadwal."
            },
            {
                tantangan_id: 16,
                activity: "Konsultasikan dengan tenaga medis jika anak mengalami efek setelah imunisasi."
            },
            {
                tantangan_id: 17,
                activity: "Jangan lupa mencatat jadwal imunisasi berikutnya agar tidak terlewat."
            }
        ],
        benefits: ["Persiapan Mental dan Emosional"],
        progress: 100,
        status: 0,
    },
];

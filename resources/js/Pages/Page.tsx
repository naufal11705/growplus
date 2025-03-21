import Layout from "@/Layouts/Anonymous";
import { useEffect, useState } from 'react';

export default function Artikel() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <Layout>
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="w-full h-0 bg-gray-200">
                    <div 
                        className="h-1 bg-wine transition-all duration-200 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>
            <section className="lg:mt-24 mt-20 bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-left lg:py-16">
                    <a href="/artikel">
                        <button type="button" className="text-gray-900 bg-white flex flex-row items-center justify-center text-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-3 py-2.5 me-2 mb-10">
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                            </svg>
                            Kembali ke Artikel
                        </button>
                    </a>
                    <span className="bg-wine bg-opacity-50 px-4 py-2 text-xs text-white rounded-full">Teknik</span>
                    <h1 className="mb-8 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Persiapan Persalinan yang Harus Diketahui Agar Proses Melahirkan Lebih Lancar dan Nyaman</h1>
                    <div className="flex lg:flex-row flex-col gap-5">
                        <h1 className="inline-flex gap-3 items-center text-lg font-bold text-center text-black flex flex-row">
                            <img className="w-10 h-10 rounded-full" src="https://wridev.id/talents/riovaldo-alfiyan-fahmi-rahman.jpg" alt="Rounded avatar" />
                            John Doe
                        </h1>
                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            <span>2025-11-15</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            <span>7 min read</span>
                        </div>
                    </div>
                    <img src="https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/12/22043146/Ini-X-Kegiatan-Ibu-di-Kelas-Parenting-Kehamilan.jpg.webp" alt="" className="w-full h-96 mt-7 rounded-xl object-cover" />
                    
                    <div className="mt-10 text-gray-700 text-lg leading-relaxed">
                        <p>Kehamilan adalah perjalanan luar biasa yang penuh dengan berbagai perubahan fisik dan emosional. Salah satu momen yang paling dinantikan adalah persalinan, sebuah proses yang menandai peralihan dari kehamilan ke kehidupan baru bersama bayi yang telah dinantikan. Oleh karena itu, penting bagi calon ibu dan keluarga untuk mempersiapkan diri dengan baik agar proses persalinan berjalan lancar dan aman. Berikut adalah beberapa hal yang harus diperhatikan dalam mempersiapkan persalinan.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">1. Memahami Tahapan Persalinan</h2>
                        <p>Persalinan terdiri dari tiga tahap utama: tahap pertama dimulai dengan kontraksi awal hingga pembukaan serviks mencapai 10 cm, tahap kedua adalah proses mendorong bayi keluar melalui jalan lahir, dan tahap ketiga adalah pengeluaran plasenta setelah bayi lahir. Dengan memahami setiap tahapan ini, ibu hamil dapat lebih siap secara mental dan fisik.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">2. Memilih Tempat Bersalin</h2>
                        <p>Menentukan lokasi persalinan adalah keputusan penting. Pilihan tempat melahirkan bisa berupa rumah sakit atau klinik bersalin dengan fasilitas medis lengkap, bersalin di rumah dengan bantuan tenaga medis profesional, atau birth center yang menawarkan pendekatan lebih alami dan nyaman. Pastikan tempat yang dipilih memiliki tenaga medis berpengalaman dan sesuai dengan kondisi kesehatan ibu dan bayi.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">3. Mengikuti Kelas Persiapan Persalinan</h2>
                        <p>Kelas persalinan dapat membantu ibu hamil memahami teknik pernapasan, posisi melahirkan, serta cara menghadapi kontraksi. Selain itu, kelas ini juga memberikan edukasi bagi pasangan agar dapat mendukung secara maksimal selama proses persalinan.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">4. Menjaga Kesehatan Fisik dan Mental</h2>
                        <p>Menjaga tubuh tetap sehat selama kehamilan sangat penting. Konsumsi makanan bergizi kaya protein, zat besi, kalsium, dan asam folat, tetap aktif dengan olahraga ringan seperti yoga prenatal atau jalan kaki, serta kelola stres dengan meditasi atau terapi relaksasi.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">5. Mempersiapkan Tas Persalinan</h2>
                        <p>Saat mendekati hari perkiraan lahir, pastikan tas persalinan sudah siap. Barang yang perlu dibawa meliputi dokumen penting seperti kartu identitas dan buku kontrol kehamilan, pakaian ibu dan bayi seperti pakaian ganti dan popok, serta peralatan pribadi seperti pembalut khusus ibu bersalin.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">6. Menentukan Metode Persalinan</h2>
                        <p>Ibu hamil perlu berdiskusi dengan dokter mengenai metode persalinan yang sesuai, seperti persalinan normal yang umumnya lebih cepat pulih, persalinan dengan epidural untuk mengurangi rasa sakit, atau operasi caesar yang direkomendasikan dalam kondisi tertentu.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">7. Mempersiapkan Mental dan Emosi</h2>
                        <p>Persalinan membutuhkan kesiapan mental. Dapatkan dukungan dari pasangan dan keluarga, bergabung dalam komunitas ibu hamil untuk berbagi pengalaman, dan lakukan latihan pernapasan serta afirmasi positif untuk meningkatkan rasa percaya diri.</p>

                        <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">Kesimpulan</h2>
                        <p>Persiapan persalinan bukan hanya sekadar menunggu hari kelahiran tiba, tetapi juga melibatkan kesiapan fisik, mental, dan lingkungan. Dengan memahami tahapan persalinan, menjaga kesehatan, memilih tempat bersalin, serta mendapatkan dukungan dari keluarga dan tenaga medis, ibu hamil dapat menjalani proses melahirkan dengan lebih tenang dan nyaman.</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
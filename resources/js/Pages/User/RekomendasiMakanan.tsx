import { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";

export default function RekomendasiMakanan() {
    const [alamat, setAlamat] = useState<string>("");

    // Fungsi untuk mendapatkan lokasi pengguna
    useEffect(() => {
        if ("geolocation" in navigator) {
            // Jika geolocation tersedia di browser
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setAlamat(`${latitude}, ${longitude}`); // Set lokasi pengguna
                },
                (err) => {
                    setAlamat("Lokasi tidak tersedia"); // Jika gagal mendapatkan lokasi
                }
            );
        } else {
            setAlamat("Geolocation tidak didukung di browser ini");
        }
    }, []);

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900">Rekomendasi Makanan</h2>
                    <div className="block mt-8 p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="lg:grid lg:grid-cols-4 lg:gap-4">
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Lokasi Anda</label>
                                <input
                                    type="text"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan alamat"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Pendapatan</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan pendapatan"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Alergi</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan alergi"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Berat Badan</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan berat badan"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Tinggi Badan</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan tinggi badan"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Usia</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan usia"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Golongan Darah</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan golongan darah"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Gula Darah</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan gula darah"
                                />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Riwayat Penyakit</label>
                                <input
                                    type="text"
                                    className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5"
                                    placeholder="Masukkan riwayat penyakit"
                                />
                            </div>
                        </div>
                        <button type="button" className="mt-5 px-5 py-2 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">
                            Analisis Rekomendasi
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

import { useState } from "react";
import Layout from "../../Layouts/Layout";
export default function PerhitunganStunting() {
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("Pilih");
    const [height, setHeight] = useState<number | string>("");
    const [usia, setUsia] = useState<number | string>("");

    const toggleGenderDropdown = () => {
        setIsGenderOpen(!isGenderOpen);
    };
    const handleGenderSelect = (genderOption: string) => {
        setSelectedGender(genderOption);
        setIsGenderOpen(false);
    };
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900">Perhitungan Stunting</h2>
                    <div className="block mt-8 p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="lg:grid lg:grid-cols-3 grid grid-cols-1 gap-5">
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Jenis Kelamin</label>
                                <button onClick={toggleGenderDropdown} className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-medium rounded-xl text-sm px-5 py-2.5" type="button">
                                    {selectedGender}
                                    <svg className={`w-2.5 h-2.5 ml-3 transform ${isGenderOpen ? "rotate-180" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {isGenderOpen && (
                                    <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                        <ul className="py-2 text-gray-700 font-medium">
                                            {["Laki-Laki", "Perempuan"].map(option => (
                                                <li key={option}>
                                                    <a href="#" onClick={() => handleGenderSelect(option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                        <img className="w-6 h-6 me-2 rounded-full" src={option === "Laki-Laki" ? "https://cdn-icons-png.flaticon.com/512/3048/3048127.png" : "https://cdn-icons-png.flaticon.com/512/3749/3749780.png"} alt={option} />
                                                        {option}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Berapa tinggi Anda? (cm)</label>
                                <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5" placeholder="Masukkan tinggi badan (cm)" />
                            </div>
                            <div className="lg:mb-0 mb-5">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Berapa usia anak Anda?</label>
                                <input type="text" value={usia} onChange={(e) => setUsia(e.target.value)} className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5" placeholder="Masukkan berat badan (kg)" />
                            </div>
                            <button type="button" className="lg:px-0 px-5 py-2 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">
                                Hitung Stunting
                            </button>
                        </div>
                    </div>
                    <div className="block mt-8 p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="flex flex-row font-bold gap-2 text-gray-500 mb-3 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-auto text-yellow-500">
                                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>
                            Harap Dibaca
                        </div>
                        <div className="font-bold text-gray-500">
                            Hasil yang diberikan oleh kalkulator stunting ini bersifat informatif dan tidak dimaksudkan sebagai pengganti diagnosis medis atau nasihat dari tenaga kesehatan profesional. Perlu diingat bahwa perhitungan stunting didasarkan pada standar pertumbuhan WHO, namun banyak faktor lain yang dapat memengaruhi status gizi anak, seperti pola makan, riwayat kesehatan, kondisi lingkungan, dan faktor genetik. Oleh karena itu, meskipun kalkulator ini dapat memberikan gambaran umum, sebaiknya Anda berkonsultasi dengan dokter atau ahli gizi untuk evaluasi lebih lanjut dan rekomendasi yang sesuai.
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

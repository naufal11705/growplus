import { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function KalkulatorKalori() {
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isActivityOpen, setIsActivityOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("Pilih");
    const [selectedActivity, setSelectedActivity] = useState<string>("Pilih Aktivitas");
    const [height, setHeight] = useState<number | string>("");
    const [weight, setWeight] = useState<number | string>("");

    const toggleGenderDropdown = () => {
        setIsGenderOpen(!isGenderOpen);
    };

    const toggleActivityDropdown = () => {
        setIsActivityOpen(!isActivityOpen);
    };

    const handleGenderSelect = (genderOption: string) => {
        setSelectedGender(genderOption);
        setIsGenderOpen(false);
    };

    const handleActivitySelect = (activityOption: string) => {
        setSelectedActivity(activityOption);
        setIsActivityOpen(false);
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900">Kalkulator Kalori</h2>
                    <div className="block mt-8 p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="mb-4">
                            <label htmlFor="datepicker-actions" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir Anda</label>
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-actions" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-200 block w-full ps-10 p-2.5" placeholder="Select date" />
                            </div>
                            <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                            <div className="lg:grid lg:grid-cols-4 lg:gap-5">
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
                                    <label className="block mb-2 text-sm font-bold text-gray-900">Berapa berat badan Anda? (kg)</label>
                                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="text-gray-500 w-full bg-gray-100 border border-gray-100 flex justify-between items-center font-bold rounded-xl text-sm px-5 py-2.5" placeholder="Masukkan berat badan (kg)" />
                                </div>
                                <div className="lg:mb-0 mb-5">
                                    <label className="block mb-2 text-sm font-bold text-gray-900">Pilih tingkat intensitas aktivitas fisik</label>
                                    <div className="relative">
                                        <button onClick={toggleActivityDropdown} className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-medium rounded-xl text-sm px-5 py-2.5" type="button">
                                            {selectedActivity}
                                            <svg className={`w-2.5 h-2.5 ml-3 transform ${isActivityOpen ? "rotate-180" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </button>
                                        {isActivityOpen && (
                                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                                <ul className="py-2 text-gray-700 font-medium">
                                                    {["Ringan", "Sedang", "Berat"].map(option => (
                                                        <li key={option}>
                                                            <a href="#" onClick={() => handleActivitySelect(option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                                {option}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button type="button" className="lg:px-0 px-5 py-2 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-pinky focus:ring-4 focus:outline-none focus:ring-light-pinky">
                                    Hitung Kalori
                                </button>
                            </div>
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
                            Hasil yang diberikan oleh kalkulator BMR ini bersifat informatif dan tidak dimaksudkan sebagai pengganti diagnosis medis atau nasihat dari tenaga medis profesional. Perlu diingat bahwa banyak faktor yang dapat memengaruhi perhitungan BMR, seperti usia, kondisi fisik tubuh, berat badan, tinggi badan, serta tingkat aktivitas yang dilakukan setiap hari. Oleh karena itu, meskipun kalkulator ini dapat memberikan gambaran umum, sebaiknya Anda selalu berkonsultasi dengan dokter atau ahli gizi sebelum membuat perubahan besar dalam gaya hidup atau pola makan Anda.
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

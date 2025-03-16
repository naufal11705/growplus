import { useState } from "react";

interface DataAnakProps {
    onNext: (data: any) => void;
}

export default function DataAnak({ onNext }: DataAnakProps) {
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("Pilih");

    const [isAgeOpen, setIsAgeOpen] = useState(false);
    const [selectedAge, setSelectedAge] = useState<string>("Pilih");

    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<string>("Pilih");

    const toggleDropdown = (dropdown: string) => {
        setIsGenderOpen(dropdown === "gender" ? !isGenderOpen : false);
        setIsAgeOpen(dropdown === "age" ? !isAgeOpen : false);
        setIsFoodOpen(dropdown === "food" ? !isFoodOpen : false);
    };

    const handleSelect = (dropdown: string, option: string) => {
        switch (dropdown) {
            case "gender":
                setSelectedGender(option);
                setIsGenderOpen(false);
                break;
            case "age":
                setSelectedAge(option);
                setIsAgeOpen(false);
                break;
            case "food":
                setSelectedFood(option);
                setIsFoodOpen(false);
                break;
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                    Isi Data Anak Anda ✍️
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5">
                        <div>
                            <label htmlFor="nama-lengkap" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap Anak</label>
                            <input type="text" name="nama-lengkap" id="nama-lengkap" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Nama Lengkap" required />
                        </div>
                        <div>
                            <label htmlFor="tanggal-lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir Anak</label>
                            <input type="date" name="tanggal-lahir" id="tanggal-lahir" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Nama Lengkap" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Jenis Kelamin Anak</label>
                            <button onClick={() => toggleDropdown("gender")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                                {selectedGender}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${isGenderOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isGenderOpen && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {["Laki-Laki", "Perempuan"].map(option => (
                                            <li key={option}>
                                                <a href="#" onClick={() => handleSelect("gender", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Fase Usia Anak</label>
                            <button onClick={() => toggleDropdown("age")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                                {selectedAge}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${isAgeOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isAgeOpen && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {["Bayi (0-12 bulan)", "Balita (1-5 Tahun)", "Pra-Sekolah(5-7 Tahun)"].map(option => (
                                            <li key={option}>
                                                <a href="#" onClick={() => handleSelect("age", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                    <div>
                        <label htmlFor="berat-badan" className="block mb-2 text-sm font-medium text-gray-900">Berat Badan Anak</label>
                        <input type="text" name="berat-badan" id="berat-badan" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Berat Badan" required />
                    </div>
                    <div>
                        <label htmlFor="berat-badan" className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan Anak</label>
                        <input type="text" name="berat-badan" id="berat-badan" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Tinggi Badan" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Pola Makan Anak</label>
                        <button onClick={() => toggleDropdown("food")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                            {selectedFood}
                            <svg className={`w-2.5 h-2.5 ml-3 transform ${isFoodOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {isFoodOpen && (
                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                <ul className="py-2 text-gray-700 font-medium">
                                    {["Asi", "MPASI", "Makanan Padat"].map(option => (
                                        <li key={option}>
                                            <a href="#" onClick={() => handleSelect("food", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="alergi-makanan" className="block mb-2 text-sm font-medium text-gray-900">Alergi Makanan Anak</label>
                        <input type="text" name="alergi-makanan" id="alergi-makanan" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Alergi Makanan" required />
                    </div>
                    <div>
                        <label htmlFor="riwayat-kesehatan" className="block mb-2 text-sm font-medium text-gray-900">Riwayat Kesehatan  Anak</label>
                        <input type="text" name="riwayat-kesehatan" id="riwayat-kesehatan" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" placeholder="Riwayat Kesehatan" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-wine hover:bg-pinky focus:ring-4 focus:outline-none focus:ring-light-pinky font-medium rounded-xl text-md px-5 py-3 text-center">
                        Selanjutnya
                    </button>
                </form>
            </div>
        </div>
    );
}

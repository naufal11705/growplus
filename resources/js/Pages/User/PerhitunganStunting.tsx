import Layout from "@/Layouts/Layout";
import { ChangeEvent, useState } from "react";


interface ReferenceData {
    [key: number]: { median: number; sd: number };
}

const referenceData: { "Laki-Laki": ReferenceData; "Perempuan": ReferenceData } = {
    "Laki-Laki": {
        0: { median: 3.3, sd: 0.4 },
        1: { median: 4.5, sd: 0.5 },
        2: { median: 5.6, sd: 0.6 },
        3: { median: 6.4, sd: 0.7 },
        4: { median: 7.0, sd: 0.8 },
        5: { median: 7.5, sd: 0.8 },
        6: { median: 7.9, sd: 0.9 },
        7: { median: 8.3, sd: 0.9 },
        8: { median: 8.6, sd: 0.9 },
        9: { median: 8.9, sd: 1.0 },
        10: { median: 9.2, sd: 1.0 },
        11: { median: 9.4, sd: 1.0 },
        12: { median: 9.6, sd: 1.0 },
        24: { median: 12.2, sd: 1.2 },
        36: { median: 14.3, sd: 1.4 },
        48: { median: 16.3, sd: 1.6 },
        60: { median: 18.3, sd: 1.8 },
    },
    "Perempuan": {
        0: { median: 3.2, sd: 0.4 },
        1: { median: 4.2, sd: 0.5 },
        2: { median: 5.1, sd: 0.6 },
        3: { median: 5.8, sd: 0.7 },
        4: { median: 6.4, sd: 0.7 },
        5: { median: 6.9, sd: 0.8 },
        6: { median: 7.3, sd: 0.8 },
        7: { median: 7.7, sd: 0.9 },
        8: { median: 8.0, sd: 0.9 },
        9: { median: 8.3, sd: 0.9 },
        10: { median: 8.6, sd: 1.0 },
        11: { median: 8.9, sd: 1.0 },
        12: { median: 8.9, sd: 1.0 },
        24: { median: 11.5, sd: 1.2 },
        36: { median: 13.9, sd: 1.4 },
        48: { median: 16.1, sd: 1.6 },
        60: { median: 18.2, sd: 1.9 },
    },
};

export default function PerhitunganStunting() {
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("Pilih");
    const [weight, setWeight] = useState<number | string>("");
    const [result, setResult] = useState<string | null>(null);
    const [tanggalLahir, setTanggalLahir] = useState<string>("");
    const [usia, setUsia] = useState<number | "">("");
    const [resultStatus, setResultStatus] = useState<string>("");

    const toggleGenderDropdown = () => {
        setIsGenderOpen(!isGenderOpen);
    };

    const handleGenderSelect = (genderOption: string) => {
        setSelectedGender(genderOption);
        setIsGenderOpen(false);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setTanggalLahir(selectedDate);

        const birthDate = new Date(selectedDate);
        const today = new Date();
        const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
        setUsia(months >= 0 ? months : "");
        console.log("Usia dalam bulan:", months);
    };

    const calculateWeightStatus = () => {
        if (selectedGender === "Pilih" || weight === "" || usia === "") {
            setResult("Harap lengkapi semua data terlebih dahulu.");
            return;
        }

        const weightNum = Number(weight);
        const usiaNum = Number(usia);

        if (isNaN(weightNum) || isNaN(usiaNum) || weightNum <= 0 || usiaNum < 0) {
            setResult("Masukkan berat badan dan usia yang valid.");
            return;
        }

        const genderData = referenceData[selectedGender as "Laki-Laki" | "Perempuan"];

        let referenceAge: number;
        if (usiaNum <= 12) {
            referenceAge = Math.round(usiaNum);
        } else {
            const yearInMonths = Math.round(usiaNum / 12) * 12;
            referenceAge = Math.min(Math.max(12, yearInMonths), 60);
        }

        const { median, sd } = genderData[referenceAge] || { median: 0, sd: 0 };
        if (median === 0 || sd === 0) {
            setResult("Data referensi untuk usia ini tidak tersedia.");
            return;
        }

        const zScore = (weightNum - median) / sd;
        console.log("Z-Score:", zScore);

        let status: string;
        if (zScore < -3) {
            status = "Berat badan sangat kurang";
        } else if (zScore >= -3 && zScore < -2) {
            status = "Berat badan kurang";
        } else if (zScore >= -2 && zScore <= 1) {
            status = "Berat badan normal";
        } else {
            status = "Risiko berat badan lebih";
        }

        setResult(`Z-Score: ${zScore.toFixed(2)} SD | Status: ${status}`);
        setResultStatus(status);
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">Perhitungan Stunting</h2>
                        <div className="w-20 h-1 bg-wine/80 mx-auto mb-4"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Kalkulator ini membantu Anda menilai status pertumbuhan anak berdasarkan standar WHO
                        </p>
                    </div>

                    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 mb-8">
                        {/* Results Card */}
                        {result && (
                            <div
                                className={`mb-8 bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md animate-fadeIn order-2 lg:order-3 lg:col-span-2 ${resultStatus === "Berat badan normal"
                                    ? "border-green-200"
                                    : resultStatus === "Berat badan kurang"
                                        ? "border-yellow-200"
                                        : resultStatus === "Risiko berat badan lebih"
                                            ? "border-orange-200"
                                            : "border-red-200"
                                    }`}
                            >
                                <div
                                    className={`px-6 py-4 border-b ${resultStatus === "Berat badan normal"
                                        ? "bg-green-50 border-green-100"
                                        : resultStatus === "Berat badan kurang"
                                            ? "bg-yellow-50 border-yellow-100"
                                            : resultStatus === "Risiko berat badan lebih"
                                                ? "bg-orange-50 border-orange-100"
                                                : "bg-red-50 border-red-100"
                                        }`}
                                >
                                    <h3 className="text-lg font-medium text-gray-700 flex items-center">
                                        {resultStatus === "Berat badan normal" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2 text-green-500"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : resultStatus === "Berat badan kurang" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2 text-yellow-500"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : resultStatus === "Risiko berat badan lebih" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2 text-orange-500"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2 text-red-500"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                        Hasil Perhitungan
                                    </h3>
                                </div>

                                <div className="p-6">
                                    {result.includes("Harap lengkapi") || result.includes("Masukkan berat") ? (
                                        <div className="flex items-center text-yellow-600 bg-yellow-50 p-4 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm font-medium">{result}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm font-medium text-gray-500 mb-1">Z-Score:</div>
                                                    <div className="text-2xl font-semibold text-gray-700">
                                                        {result.split("Z-Score: ")[1].split(" SD")[0]} SD
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm font-medium text-gray-500 mb-1">Status:</div>
                                                    <div
                                                        className={`text-lg font-semibold px-3 py-1 rounded-full inline-block ${resultStatus === "Berat badan normal"
                                                            ? "text-green-700 bg-green-100"
                                                            : resultStatus === "Berat badan kurang"
                                                                ? "text-yellow-700 bg-yellow-100"
                                                                : resultStatus === "Berat badan sangat kurang"
                                                                    ? "text-red-700 bg-red-100"
                                                                    : "text-orange-700 bg-orange-100"
                                                            }`}
                                                    >
                                                        {resultStatus}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-wine">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Rekomendasi:</h4>
                                                <p className="text-sm text-gray-600">
                                                    {resultStatus === "Berat badan normal"
                                                        ? "Berat badan anak Anda normal. Tetap jaga pola makan seimbang dan lakukan pemeriksaan rutin."
                                                        : resultStatus === "Berat badan kurang"
                                                            ? "Berat badan anak Anda kurang. Konsultasikan dengan dokter atau ahli gizi untuk meningkatkan asupan nutrisi."
                                                            : resultStatus === "Berat badan sangat kurang"
                                                                ? "Berat badan anak Anda sangat kurang. Segera konsultasikan dengan dokter untuk penanganan intensif."
                                                                : resultStatus === "Risiko berat badan lebih"
                                                                    ? "Anak Anda berisiko kelebihan berat badan. Konsultasikan dengan dokter atau ahli gizi untuk pengaturan pola makan."
                                                                    : "Harap lengkapi data untuk mendapatkan rekomendasi."}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Input Card */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full order-1 lg:order-1">
                            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 mr-2 text-wine"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Input Data
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6">
                                    {/* Gender Selection */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                        <div className="relative mb-4">
                                            <button
                                                onClick={toggleGenderDropdown}
                                                className="text-gray-700 w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 flex justify-between items-center font-medium rounded-lg text-sm px-4 py-3 transition-colors duration-200"
                                                type="button"
                                            >
                                                <div className="flex items-center">
                                                    {selectedGender !== "Pilih" && (
                                                        <img
                                                            className="w-5 h-5 mr-2 rounded-full"
                                                            src={
                                                                selectedGender === "Laki-Laki"
                                                                    ? "https://cdn-icons-png.flaticon.com/512/3048/3048127.png"
                                                                    : "https://cdn-icons-png.flaticon.com/512/3749/3749780.png"
                                                            }
                                                            alt={selectedGender}
                                                        />
                                                    )}
                                                    {selectedGender}
                                                </div>
                                                <svg
                                                    className={`w-2.5 h-2.5 ml-3 transform transition-transform duration-200 ${isGenderOpen ? "rotate-180" : ""}`}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </button>

                                            {isGenderOpen && (
                                                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 animate-fadeIn">
                                                    <ul className="py-1 text-gray-700 font-medium">
                                                        {["Laki-Laki", "Perempuan"].map((option) => (
                                                            <li key={option}>
                                                                <button
                                                                    onClick={() => handleGenderSelect(option)}
                                                                    className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-left transition-colors duration-200"
                                                                >
                                                                    <img
                                                                        className="w-5 h-5 mr-2 rounded-full"
                                                                        src={
                                                                            option === "Laki-Laki"
                                                                                ? "https://cdn-icons-png.flaticon.com/512/3048/3048127.png"
                                                                                : "https://cdn-icons-png.flaticon.com/512/3749/3749780.png"
                                                                        }
                                                                        alt={option}
                                                                    />
                                                                    {option}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Birth Date Input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Tanggal lahir anak Anda</label>
                                        <input
                                            type="date"
                                            value={tanggalLahir}
                                            onChange={handleDateChange}
                                            className="text-gray-700 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm px-4 py-3 focus:ring-wine focus:border-wine"
                                        />

                                        {/* Age Display */}
                                        {usia !== "" && (
                                            <div className="mt-2 mb-5 text-sm text-gray-500">
                                                Usia: <span className="font-medium">{usia}</span> bulan
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Weight Input */}
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Berat saat ini</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="text-gray-700 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm px-4 py-3 focus:ring-wine focus:border-wine"
                                            placeholder="Masukkan berat badan anak (kg)"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                            kg
                                        </div>
                                    </div>
                                </div>

                                {/* Calculate Button */}
                                <div className="mt-8 w-full justify-center">
                                    <button
                                        type="button"
                                        onClick={calculateWeightStatus}
                                        className="px-6 py-3 w-full justify-center text-base font-medium text-center text-white bg-wine rounded-lg hover:bg-wine/80 focus:ring-4 focus:outline-none focus:ring-wine/30 transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 mr-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Hitung Stunting
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Information Card */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full order-3 lg:order-2">
                            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 mr-2 text-wine"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Informasi Stunting
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    <div className="bg-[#411a2d14] border-l-4 border-wine p-4 rounded-r-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Apa itu Stunting?</h4>
                                        <p className="text-sm text-gray-600">
                                            Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis. Kondisi ini diukur
                                            berdasarkan indeks tinggi badan menurut umur yang berada di bawah standar.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Faktor Risiko Stunting:</h4>
                                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                            <li>Kurangnya asupan gizi selama kehamilan dan masa pertumbuhan anak</li>
                                            <li>Infeksi berulang dan penyakit kronis</li>
                                            <li>Praktik pemberian makan yang tidak optimal</li>
                                            <li>Sanitasi dan kebersihan lingkungan yang buruk</li>
                                            <li>Faktor sosial ekonomi</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cara Mencegah Stunting:</h4>
                                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                            <li>Pemberian ASI eksklusif selama 6 bulan pertama</li>
                                            <li>Pemberian makanan pendamping ASI yang bergizi setelah usia 6 bulan</li>
                                            <li>Pemantauan pertumbuhan secara rutin</li>
                                            <li>Menjaga kebersihan dan sanitasi lingkungan</li>
                                            <li>Imunisasi lengkap sesuai jadwal</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-medium text-gray-700 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 mr-2 text-yellow-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Harap Dibaca
                            </h3>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Hasil yang diberikan oleh kalkulator stunting ini bersifat informatif dan tidak dimaksudkan sebagai
                                pengganti diagnosis medis atau nasihat dari tenaga kesehatan profesional. Perlu diingat bahwa perhitungan
                                stunting didasarkan pada standar pertumbuhan WHO, namun banyak faktor lain yang dapat memengaruhi status
                                gizi anak, seperti pola makan, riwayat kesehatan, kondisi lingkungan, dan faktor genetik. Oleh karena itu,
                                meskipun kalkulator ini dapat memberikan gambaran umum, sebaiknya Anda berkonsultasi dengan dokter atau
                                ahli gizi untuk evaluasi lebih lanjut dan rekomendasi yang sesuai.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

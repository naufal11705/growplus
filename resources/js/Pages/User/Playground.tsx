"use client";

import Layout from "@/Layouts/Anonymous";
import { usePlayground } from "@/Lib/usePlayground";
import { ChangeEvent, useState, type FormEvent } from "react";
import "../../../css/app.css";

interface PlaygroundProps {
    geminiApiKey: string;
}

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

export default function Playground({ geminiApiKey }: PlaygroundProps) {
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string>("Pilih");
    const [weight, setWeight] = useState<number | string>("");
    const [stuntingResult, setStuntingResult] = useState<string | null>(null);
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
            setStuntingResult("Harap lengkapi semua data terlebih dahulu.");
            return;
        }

        const weightNum = Number(weight);
        const usiaNum = Number(usia);

        if (isNaN(weightNum) || isNaN(usiaNum) || weightNum <= 0 || usiaNum < 0) {
            setStuntingResult("Masukkan berat badan dan usia yang valid.");
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
            setStuntingResult("Data referensi untuk usia ini tidak tersedia.");
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

        setStuntingResult(`Z-Score: ${zScore.toFixed(2)} SD | Status: ${status}`);
        setResultStatus(status);
    };

    // Define the Feature type explicitly
    type Feature = "stunting-risk" | "future-simulation" | "generate-name";

    // Update the useState type
    const [activeTab, setActiveTab] = useState<Feature>("stunting-risk");

    // Assuming usePlayground hook expects a Feature type for the second argument of sendPrompt
    interface PlaygroundResult {
        result: string | null;
        loading: boolean;
        error: string | null;
        sendPrompt: (prompt: string, feature: Feature) => void;
    }

    const { result, loading, error, sendPrompt } = usePlayground(geminiApiKey) as PlaygroundResult;

    // Rest of your state declarations remain unchanged
    const [stuntingForm, setStuntingForm] = useState({
        age: "",
        weight: "",
        height: "",
        diet: "",
        history: "",
    });

    const [futureForm, setFutureForm] = useState({
        age: "",
        diet: "",
        mealFrequency: "",
        proteinIntake: "",
        activityLevel: "",
    });

    const [nameForm, setNameForm] = useState({
        gender: "",
        letter: "",
        meaning: "",
        origin: "",
        style: "",
        syllables: "",
    });

    // Form change handlers remain unchanged
    const handleStuntingFormChange = (field: string, value: string) => {
        setStuntingForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFutureFormChange = (field: string, value: string) => {
        setFutureForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleNameFormChange = (field: string, value: string) => {
        setNameForm((prev) => ({ ...prev, [field]: value }));
    };

    // Submit handlers remain unchanged
    const handleSubmitStuntingRisk = (e: FormEvent) => {
        e.preventDefault();
        if (!geminiApiKey) {
            alert("API key is missing. Please contact support.");
            return;
        }
        const prompt = `
      Usia: ${stuntingForm.age} bulan
      Berat: ${stuntingForm.weight} kg
      Tinggi: ${stuntingForm.height} cm
      Pola Makan: ${stuntingForm.diet}
      Riwayat Kesehatan: ${stuntingForm.history || "Tidak ada"}
    `;
        sendPrompt(prompt, "stunting-risk");
    };

    const handleSubmitFutureSimulation = (e: FormEvent) => {
        e.preventDefault();
        if (!geminiApiKey) {
            alert("API key is missing. Please contact support.");
            return;
        }
        const prompt = `
      Usia Anak: ${futureForm.age} tahun
      Pola Makan: ${futureForm.diet}
      Frekuensi Makan: ${futureForm.mealFrequency}
      Asupan Protein: ${futureForm.proteinIntake}
      Tingkat Aktivitas: ${futureForm.activityLevel}
    `;
        sendPrompt(prompt, "future-simulation");
    };

    const handleSubmitGenerateName = (e: FormEvent) => {
        e.preventDefault();
        if (!geminiApiKey) {
            alert("API key is missing. Please contact support.");
            return;
        }
        const prompt = `
      Generate a list of baby names based on the following criteria:
      Gender: ${nameForm.gender || "Any"}
      Starting Letter: ${nameForm.letter || "Any"}
      Meaning: ${nameForm.meaning || "Any"}
      Origin: ${nameForm.origin || "Any"}
      Style: ${nameForm.style || "Any"}
      Syllables: ${nameForm.syllables || "Any"}
      Provide up to 10 names with their meanings and origins.
    `;
        sendPrompt(prompt, "generate-name");
    };

    // List of countries for the origin dropdown
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Brazzaville)",
        "Congo (Kinshasa)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];

    // List of meanings for the meaning dropdown
    const meanings = [
        "Cinta",
        "Kuat",
        "Bijaksana",
        "Berani",
        "Damai",
        "Harapan",
        "Kebahagiaan",
        "Kebebasan",
        "Keadilan",
        "Kebenaran",
        "Kemuliaan",
        "Kesetiaan",
        "Kecantikan",
        "Keberuntungan",
        "Kepemimpinan",
        "Kekuatan",
        "Kesejahteraan",
        "Kecerdasan",
        "Kelembutan",
        "Kepedulian",
        "Keabadian",
        "Kemenangan",
        "Keagungan",
        "Kesucian",
        "Keberanian",
        "Kedamaian",
        "Kegembiraan",
        "Keunikan",
        "Kehormatan",
        "Ketenangan",
        "Keanggunan",
        "Kepolosan",
        "Keseimbangan",
        "Keteguhan",
        "Kegigihan",
        "Kepekaan",
        "Kedalaman",
        "Keikhlasan",
        "Kejujuran",
        "Kemurnian",
        "Kemakmuran",
        "Kesederhanaan",
        "Ketabahan",
        "Keindahan",
        "Kepuasan",
        "Kerendahan hati",
        "Kewibawaan",
        "Keterbukaan",
        "Kehidupan",
        "Cahaya",
        "Bunga",
        "Langit",
        "Bintang",
        "Matahari",
        "Bulan",
        "Air",
        "Api",
        "Angin",
        "Bumi",
        "Hutan",
        "Laut",
        "Gunung",
        "Permen",
        "Emas",
        "Perak",
        "Permata",
    ];

    return (
        <Layout>
            <div className="container mx-auto py-10 px-4 mt-20">
                <h1 className="text-3xl font-bold text-center mb-2">Playground Kesehatan Anak</h1>
                <p className="text-center text-gray-600 mb-8">
                    Coba fitur-fitur AI untuk memantau, memprediksi pertumbuhan, atau menemukan nama anak Anda
                </p>

                {/* Tabs */}
                <div className="w-full max-w-4xl mx-auto mb-8">
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${activeTab === "stunting-risk"
                                ? "border-b-2 border-wine text-wine"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("stunting-risk")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                                <path d="M12 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                                <path d="M3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                                <path d="M21 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                            </svg>
                            <span>Cek Risiko Stunting</span>
                        </button>
                        <button
                            className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${activeTab === "future-simulation"
                                ? "border-b-2 border-wine text-wine"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("future-simulation")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                            <span>Simulasi Masa Depan</span>
                        </button>
                        <button
                            className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${activeTab === "generate-name"
                                ? "border-b-2 border-wine text-wine"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("generate-name")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>Generate Nama</span>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="w-full max-w-4xl mx-auto">
                    {/* Stunting Risk Tab
                    {/* Results Card */}
                    {stuntingResult && (
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
                                {stuntingResult.includes("Harap lengkapi") || stuntingResult.includes("Masukkan berat") ? (
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
                                                    {stuntingResult.split("Z-Score: ")[1].split(" SD")[0]} SD
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
                </div>

                {/* Future Simulation Tab */}
                <div className={activeTab === "future-simulation" ? "block" : "hidden"}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                                Simulasi Masa Depan Anak Anda
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Lihat proyeksi pertumbuhan anak Anda 2 tahun ke depan berdasarkan kondisi saat ini.
                            </p>
                        </div>
                        <form onSubmit={handleSubmitFutureSimulation} className="p-6">
                            <div className="grid gap-6">
                                <div>
                                    <label htmlFor="future-age" className="block text-sm font-medium text-gray-700 mb-1">
                                        Usia Anak (tahun)
                                    </label>
                                    <input
                                        id="future-age"
                                        type="text"
                                        placeholder="Contoh: 3"
                                        value={futureForm.age}
                                        onChange={(e) => handleFutureFormChange("age", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pola Makan Saat Ini
                                    </label>
                                    <select
                                        id="diet"
                                        value={futureForm.diet}
                                        onChange={(e) => handleFutureFormChange("diet", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih pola makan
                                        </option>
                                        <option value="Seimbang dan bervariasi">Seimbang dan bervariasi</option>
                                        <option value="Cukup bervariasi tapi kurang sayur">
                                            Cukup bervariasi tapi kurang sayur
                                        </option>
                                        <option value="Banyak karbohidrat, kurang protein">
                                            Banyak karbohidrat, kurang protein
                                        </option>
                                        <option value="Sering junk food dan makanan olahan">
                                            Sering junk food dan makanan olahan
                                        </option>
                                        <option value="Sangat pilih-pilih makanan">Sangat pilih-pilih makanan</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="meal-frequency" className="block text-sm font-medium text-gray-700 mb-1">
                                        Frekuensi Makan
                                    </label>
                                    <select
                                        id="meal-frequency"
                                        value={futureForm.mealFrequency}
                                        onChange={(e) => handleFutureFormChange("mealFrequency", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih frekuensi makan
                                        </option>
                                        <option value="3 kali makan utama + 2 snack teratur">
                                            3 kali makan utama + 2 snack teratur
                                        </option>
                                        <option value="3 kali makan utama, jarang snack">
                                            3 kali makan utama, jarang snack
                                        </option>
                                        <option value="2 kali makan utama + snack">2 kali makan utama + snack</option>
                                        <option value="Tidak teratur, sering skip makan">
                                            Tidak teratur, sering skip makan
                                        </option>
                                        <option value="Lebih banyak ngemil daripada makan utama">
                                            Lebih banyak ngemil daripada makan utama
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="protein-intake" className="block text-sm font-medium text-gray-700 mb-1">
                                        Asupan Protein
                                    </label>
                                    <select
                                        id="protein-intake"
                                        value={futureForm.proteinIntake}
                                        onChange={(e) => handleFutureFormChange("proteinIntake", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih asupan protein
                                        </option>
                                        <option value="Cukup (daging/ikan/telur/tahu/tempe setiap hari)">
                                            Cukup (daging/ikan/telur/tahu/tempe setiap hari)
                                        </option>
                                        <option value="Sedang (protein hewani 3-4x seminggu)">
                                            Sedang (protein hewani 3-4x seminggu)
                                        </option>
                                        <option value="Kurang (protein hewani 1-2x seminggu)">
                                            Kurang (protein hewani 1-2x seminggu)
                                        </option>
                                        <option value="Sangat kurang (jarang konsumsi protein)">
                                            Sangat kurang (jarang konsumsi protein)
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="activity-level" className="block text-sm font-medium text-gray-700 mb-1">
                                        Tingkat Aktivitas Fisik
                                    </label>
                                    <select
                                        id="activity-level"
                                        value={futureForm.activityLevel}
                                        onChange={(e) => handleFutureFormChange("activityLevel", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih tingkat aktivitas
                                        </option>
                                        <option value="Sangat aktif (bermain fisik >2 jam/hari)">
                                            Sangat aktif (bermain fisik {">"}2 jam/hari)
                                        </option>
                                        <option value="Aktif (bermain fisik 1-2 jam/hari)">
                                            Aktif (bermain fisik 1-2 jam/hari)
                                        </option>
                                        <option value="Cukup (bermain fisik 30-60 menit/hari)">
                                            Cukup (bermain fisik 30-60 menit/hari)
                                        </option>
                                        <option value="Kurang (bermain fisik <30 menit/hari)">
                                            Kurang (bermain fisik {"<"}30 menit/hari)
                                        </option>
                                        <option value="Tidak aktif (hampir tidak ada aktivitas fisik)">
                                            Tidak aktif (hampir tidak ada aktivitas fisik)
                                        </option>
                                    </select>
                                </div>

                                <div className="border-t pt-4">
                                    <button
                                        type="submit"
                                        disabled={
                                            loading ||
                                            !futureForm.age ||
                                            !futureForm.diet ||
                                            !futureForm.mealFrequency ||
                                            !futureForm.proteinIntake ||
                                            !futureForm.activityLevel
                                        }
                                        className="w-full md:w-auto px-4 py-2 bg-wine text-white font-medium rounded-md shadow-sm hover:bg-dark-wine focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                Lihat Proyeksi
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="ml-2 h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Generate Name Tab */}
                <div className={activeTab === "generate-name" ? "block" : "hidden"}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 4v16m8-8H4"></path>
                                </svg>
                                Generate Nama Bayi
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Temukan nama bayi yang sempurna dengan memilih preferensi Anda di bawah ini.
                            </p>
                        </div>
                        <form onSubmit={handleSubmitGenerateName} className="p-6">
                            <div className="grid gap-6">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        id="gender"
                                        value={nameForm.gender}
                                        onChange={(e) => handleNameFormChange("gender", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        <option value="Boy">Laki-laki</option>
                                        <option value="Girl">Perempuan</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-1">
                                        Huruf Awal
                                    </label>
                                    <select
                                        id="letter"
                                        value={nameForm.letter}
                                        onChange={(e) => handleNameFormChange("letter", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                                            <option key={letter} value={letter}>
                                                {letter}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-1">
                                        Makna Nama
                                    </label>
                                    <select
                                        id="meaning"
                                        value={nameForm.meaning}
                                        onChange={(e) => handleNameFormChange("meaning", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        {meanings.map((meaning) => (
                                            <option key={meaning} value={meaning}>
                                                {meaning}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                                        Asal Nama
                                    </label>
                                    <select
                                        id="origin"
                                        value={nameForm.origin}
                                        onChange={(e) => handleNameFormChange("origin", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                                        Gaya Nama
                                    </label>
                                    <select
                                        id="style"
                                        value={nameForm.style}
                                        onChange={(e) => handleNameFormChange("style", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        <option value="Classic">Klasik</option>
                                        <option value="Modern">Modern</option>
                                        <option value="Unique">Unik</option>
                                        <option value="Traditional">Tradisional</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="syllables" className="block text-sm font-medium text-gray-700 mb-1">
                                        Jumlah Suku Kata
                                    </label>
                                    <select
                                        id="syllables"
                                        value={nameForm.syllables}
                                        onChange={(e) => handleNameFormChange("syllables", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                                    >
                                        <option value="">Semua</option>
                                        <option value="1">1 Suku Kata</option>
                                        <option value="2">2 Suku Kata</option>
                                        <option value="3">3 Suku Kata</option>
                                        <option value="4+">4+ Suku Kata</option>
                                    </select>
                                </div>

                                <div className="border-t pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto px-4 py-2 bg-wine text-white font-medium rounded-md shadow-sm hover:bg-dark-wine focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                Cari Nama
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="ml-2 h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">
                                {activeTab === "stunting-risk"
                                    ? "Hasil Analisis Risiko Stunting"
                                    : activeTab === "future-simulation"
                                        ? "Proyeksi Pertumbuhan 2 Tahun Ke Depan"
                                        : "Hasil Pencarian Nama"}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {activeTab === "stunting-risk"
                                    ? "Berdasarkan data yang Anda berikan, berikut adalah analisis risiko stunting anak Anda"
                                    : activeTab === "future-simulation"
                                        ? "Berdasarkan pola makan dan aktivitas saat ini, berikut adalah proyeksi pertumbuhan anak Anda"
                                        : "Berikut adalah daftar nama berdasarkan preferensi yang Anda masukkan"}
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50">
                            <div className="whitespace-pre-line text-base">{result}</div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                            <p>
                                {activeTab === "generate-name"
                                    ? "Hasil ini adalah saran nama berdasarkan input Anda. Pastikan untuk memverifikasi makna dan asal nama."
                                    : "Hasil ini hanya perkiraan berdasarkan data yang diberikan. Untuk penilaian yang lebih akurat, konsultasikan dengan dokter anak atau ahli gizi."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            {/* </div> */}
        </Layout >
    );
}

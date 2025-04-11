"use client";

import { useState, type FormEvent } from "react";
import { usePlayground } from "@/Lib/usePlayground";
import Layout from "@/Layouts/Anonymous";
import "../../../css/app.css";

interface PlaygroundProps {
  geminiApiKey: string;
}

export default function Playground({ geminiApiKey }: PlaygroundProps) {
  const [activeTab, setActiveTab] = useState<"stunting-risk" | "future-simulation" | "generate-name">("stunting-risk");

  const { result, loading, error, sendPrompt } = usePlayground(geminiApiKey);

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

  const handleStuntingFormChange = (field: string, value: string) => {
    setStuntingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFutureFormChange = (field: string, value: string) => {
    setFutureForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameFormChange = (field: string, value: string) => {
    setNameForm((prev) => ({ ...prev, [field]: value }));
  };

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
    sendPrompt(prompt, "generate-name"); // Now valid with updated Feature type
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
              className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "stunting-risk"
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
              className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "future-simulation"
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
              className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${
                activeTab === "generate-name"
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
          {/* Stunting Risk Tab */}
          <div className={activeTab === "stunting-risk" ? "block" : "hidden"}>
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
                    <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                    <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                    <path d="M12 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                    <path d="M3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                    <path d="M21 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                  </svg>
                  Cek Risiko Stunting Anak Anda dalam 60 Detik!
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Isi 5 pertanyaan singkat untuk mendapatkan penilaian risiko stunting dan rekomendasi awal.
                </p>
              </div>
              <form onSubmit={handleSubmitStuntingRisk} className="p- Strength
6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Usia Anak (bulan)
                      </label>
                      <input
                        id="age"
                        type="text"
                        placeholder="Contoh: 24"
                        value={stuntingForm.age}
                        onChange={(e) => handleStuntingFormChange("age", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Berat Badan (kg)
                      </label>
                      <input
                        id="weight"
                        type="text"
                        placeholder="Contoh: 10.5"
                        value={stuntingForm.weight}
                        onChange={(e) => handleStuntingFormChange("weight", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                        Tinggi Badan (cm)
                      </label>
                      <input
                        id="height"
                        type="text"
                        placeholder="Contoh: 85"
                        value={stuntingForm.height}
                        onChange={(e) => handleStuntingFormChange("height", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                      Pola Makan Anak
                    </label>
                    <select
                      id="diet"
                      value={stuntingForm.diet}
                      onChange={(e) => handleStuntingFormChange("diet", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine"
                      required
                    >
                      <option value="" disabled>
                        Pilih pola makan
                      </option>
                      <option value="Seimbang (protein, karbohidrat, sayur, buah)">
                        Seimbang (protein, karbohidrat, sayur, buاہ)
                      </option>
                      <option value="Kurang protein">Kurang protein</option>
                      <option value="Kurang sayur dan buah">Kurang sayur dan buah</option>
                      <option value="Tidak teratur">Tidak teratur</option>
                      <option value="Banyak junk food">Banyak junk food</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="history" className="block text-sm font-medium text-gray-700 mb-1">
                      Riwayat Kesehatan (opsional)
                    </label>
                    <textarea
                      id="history"
                      placeholder="Contoh: Pernah dirawat karena diare, alergi susu, dll."
                      value={stuntingForm.history}
                      onChange={(e) => handleStuntingFormChange("history", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wine focus:border-wine h-24"
                    ></textarea>
                  </div>

                  <div className="border-t pt-4">
                    <button
                      type="submit"
                      disabled={
                        loading ||
                        !stuntingForm.age ||
                        !stuntingForm.weight ||
                        !stuntingForm.height ||
                        !stuntingForm.diet
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
                          Cek Risiko Sekarang
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
      </div>
    </Layout>
  );
}
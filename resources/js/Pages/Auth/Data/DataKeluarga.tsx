import { useState } from "react";

interface DataKeluargaProps {
    onNext: (data: any) => void;
}

export default function DataKeluarga({ onNext }: DataKeluargaProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        job: "Pilih",
        education: "Pilih",
        economy: "Pilih",
        area: "Pilih",
        childrenCount: "",
        healthAccess: "Pilih"
    });

    const [dropdowns, setDropdowns] = useState({
        job: false,
        education: false,
        economy: false,
        area: false,
        healthAccess: false
    });

    const dropdownOptions: Record<string, string[]> = {
        job: ["Tidak Bekerja", "PNS", "Wirausaha", "Buruh"],
        education: ["Tidak Sekolah", "SD/Sederajat", "SMP/Sederajat", "SMA/SMK", "Diploma", "Sarjana", "Pascasarjana"],
        economy: ["Kurang Mampu", "Menengah", "Mampu"],
        area: ["Perkotaan", "Pedesaan", "Daerah Terpencil"],
        healthAccess: ["Puskesmas", "Klinik", "RSUD", "RS Swasta"]
    };

    const toggleDropdown = (field: keyof typeof dropdowns) => {
        setDropdowns((prev) => ({
            job: false,
            education: false,
            economy: false,
            area: false,
            healthAccess: false,
            [field]: !prev[field],
        }));
    };


    const handleSelect = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        setDropdowns({ ...dropdowns, [field]: false });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every(value => value && value !== "Pilih");

        if (isFormValid) {
            onNext(formData);
        } else {
            alert("Harap isi semua bidang terlebih dahulu.");
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                    Isi Data Keluarga Anda ✍️
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5">
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                            <input
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Nama Lengkap"
                                required
                            />
                        </div>
                        {Object.keys(dropdowns).map((field) => (
                            <div key={field}>
                                <label className="block mb-2 text-sm font-bold text-gray-900">
                                    {
                                        field === "job" ? "Status Pekerjaan" :
                                            field === "education" ? "Tingkat Pendidikan" :
                                                field === "economy" ? "Kondisi Ekonomi" :
                                                    field === "area" ? "Area Tempat Tinggal" :
                                                        "Akses Layanan Kesehatan"
                                    }
                                </label>
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown(field as keyof typeof dropdowns)}
                                    className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5"
                                >
                                    {formData[field as keyof typeof formData]}
                                    <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns[field as keyof typeof dropdowns] ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                {dropdowns[field as keyof typeof dropdowns] && (
                                    <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                        <ul className="py-2 text-gray-700 font-medium">
                                            {dropdownOptions[field].map(option => (
                                                <li key={option}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelect(field, option)}
                                                        className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                                                    >
                                                        {option}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="childrenCount" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Anak</label>
                        <input
                            type="number"
                            id="childrenCount"
                            value={formData.childrenCount}
                            onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Masukkan jumlah anak"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-wine text-white font-medium rounded-xl w-full px-6 py-2.5 hover:bg-dark-wine"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

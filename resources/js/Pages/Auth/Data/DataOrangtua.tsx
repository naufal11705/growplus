import { useState } from "react";

interface DataOrangtuaProps {
    onNext: (data: any) => void;
    initialData?: any; 
}

interface FormData {
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    alamat: string;
    pekerjaan: string;
    penghasilan: string;
    sumber_penghasilan: string;
    jumlah_tanggungan: string;
    status_rumah: string;
    tanggungan_listrik: string;
    tanggungan_air: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
}

type ValidationErrors = Record<string, string>;

const initialFormData: FormData = {
    nama: "",
    nik: "",
    no_jkn: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    golongan_darah: "Pilih",
    alamat: "",
    pekerjaan: "",
    penghasilan: "Pilih",
    sumber_penghasilan: "Pilih",
    jumlah_tanggungan: "",
    status_rumah: "Pilih",
    tanggungan_listrik: "",
    tanggungan_air: "",
    kecamatan: "",
    kabupaten: "",  
    provinsi: "",
};

const dropdownOptions: Record<string, string[]> = {
    golongan_darah: ["AB", "A", "B", "O"],
    sumber_penghasilan: ["Gaji", "Freelance", "Usaha", "Pensiun", "Tidak Ada"],
    status_rumah: ["Milik Sendiri", "Milik Sendiri (Cicilan)", "Kontrak", "Tidak Ada"],
    penghasilan: ["500.000 - 1.000.000", "1.000.000 - 2.000.001", "2.000.001 - 3.000.000", "3.000.001 - 4.000.000", "4.000.001 - <5.000.000"],
};

export default function DataOrangtua({ onNext, initialData = {} }: DataOrangtuaProps) {
    const [formData, setFormData] = useState<FormData>(() => ({
        ...initialFormData,
        ...initialData,
    }));
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [dropdowns, setDropdowns] = useState({
        golongan_darah: false,
        sumber_penghasilan: false,
        status_rumah: false,
        penghasilan: false,
    });

    const toggleDropdown = (field: keyof typeof dropdowns) => {
        setDropdowns((prev) => ({
            golongan_darah: false,
            sumber_penghasilan: false,
            status_rumah: false,
            penghasilan: false,
            [field]: !prev[field],
        }));
    };

    const handleSelect = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setDropdowns((prev) => ({ ...prev, [field]: false }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateRequired = (value: string, fieldName: string): string => {
        return !value ? `${fieldName} harus diisi` : "";
    };

    const validateExactLength = (value: string, length: number, fieldName: string): string => {
        return value.length !== length ? `${fieldName} harus tepat ${length} karakter` : "";
    };

    const validateDropdown = (value: string, fieldName: string): string => {
        return value === "Pilih" ? `${fieldName} harus dipilih` : "";
    };

    const validateNonNegativeNumber = (value: string, fieldName: string): string => {
        if (value === "") return `${fieldName} harus diisi`;
        const numValue = parseInt(value);
        return numValue < 0 ? `${fieldName} tidak boleh negatif` : "";
    };

    const validationRules: Record<keyof FormData, (value: string) => string> = {
        nama: (value) => validateRequired(value, "Nama lengkap"),
        nik: (value) => validateRequired(value, "NIK") || validateExactLength(value, 16, "NIK"),
        no_jkn: (value) => validateRequired(value, "Nomor JKN") || validateExactLength(value, 13, "Nomor JKN"),
        tempat_lahir: (value) => validateRequired(value, "Tempat lahir"),
        tanggal_lahir: (value) => validateRequired(value, "Tanggal lahir"),
        golongan_darah: (value) => validateDropdown(value, "Golongan darah"),
        alamat: (value) => validateRequired(value, "Alamat"),
        pekerjaan: (value) => validateRequired(value, "Pekerjaan"),
        sumber_penghasilan: (value) => validateDropdown(value, "Sumber penghasilan"),
        penghasilan: (value) => validateDropdown(value, "Penghasilan gaji"),
        status_rumah: (value) => validateDropdown(value, "Status rumah"),
        jumlah_tanggungan: (value) => validateNonNegativeNumber(value, "Jumlah tanggungan"),
        tanggungan_listrik: (value) => validateNonNegativeNumber(value, "Tanggungan listrik"),
        tanggungan_air: (value) => validateNonNegativeNumber(value, "Tanggungan air"),
        kecamatan: (value) => validateRequired(value, "Kecamatan"),
        kabupaten: (value) => validateRequired(value, "Kabupaten"),
        provinsi: (value) => validateRequired(value, "Provinsi"), 
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        Object.entries(formData).forEach(([field, value]) => {
            const validateFn = validationRules[field as keyof FormData];
            const error = validateFn(value);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const submissionData = {
                ...formData,
                jumlah_tanggungan: parseInt(formData.jumlah_tanggungan) || 0,
                tanggungan_listrik: parseInt(formData.tanggungan_listrik) || 0,
                tanggungan_air: parseInt(formData.tanggungan_air) || 0,
            };
            onNext(submissionData);
        }
    };

    const getInputClassName = (field: string): string => {
        return errors[field]
            ? "bg-gray-50 border-2 border-red-500 text-gray-900 rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            : "bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5";
    };

    const handleInputChange = (field: keyof FormData, value: string, maxLength?: number) => {
        let sanitizedValue = value;

        if (["nik", "no_jkn", "penghasilan", "jumlah_tanggungan", "tanggungan_listrik", "tanggungan_air"].includes(field)) {
            sanitizedValue = value.replace(/[^0-9]/g, "");
            if (maxLength) {
                sanitizedValue = sanitizedValue.slice(0, maxLength);
            }
        } else if (maxLength) {
            sanitizedValue = value.slice(0, maxLength);
        }

        setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                    Isi Data Anda ✍️
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5">
                        {/* Nama Lengkap */}
                        <div>
                            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                            <input
                                type="text"
                                id="nama"
                                value={formData.nama}
                                onChange={(e) => handleInputChange("nama", e.target.value, 255)}
                                className={getInputClassName("nama")}
                                placeholder="Nama Lengkap"
                                maxLength={255}
                            />
                            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                        </div>

                        {/* NIK */}
                        <div>
                            <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                            <input
                                type="text"
                                id="nik"
                                value={formData.nik}
                                onChange={(e) => handleInputChange("nik", e.target.value, 16)}
                                className={getInputClassName("nik")}
                                placeholder="NIK (16 karakter)"
                                maxLength={16}
                            />
                            {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                        </div>

                        {/* Nomor JKN */}
                        <div>
                            <label htmlFor="no_jkn" className="block mb-2 text-sm font-medium text-gray-900">Nomor JKN</label>
                            <input
                                type="text"
                                id="no_jkn"
                                value={formData.no_jkn}
                                onChange={(e) => handleInputChange("no_jkn", e.target.value, 13)}
                                className={getInputClassName("no_jkn")}
                                placeholder="Nomor JKN (13 karakter)"
                                maxLength={13}
                            />
                            {errors.no_jkn && <p className="text-red-500 text-xs mt-1">{errors.no_jkn}</p>}
                        </div>

                        {/* Tempat Lahir */}
                        <div>
                            <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                            <input
                                type="text"
                                id="tempat_lahir"
                                value={formData.tempat_lahir}
                                onChange={(e) => handleInputChange("tempat_lahir", e.target.value, 255)}
                                className={getInputClassName("tempat_lahir")}
                                placeholder="Tempat Lahir"
                                maxLength={255}
                            />
                            {errors.tempat_lahir && <p className="text-red-500 text-xs mt-1">{errors.tempat_lahir}</p>}
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                            <input
                                type="date"
                                id="tanggal_lahir"
                                value={formData.tanggal_lahir}
                                onChange={(e) => handleInputChange("tanggal_lahir", e.target.value)}
                                className={getInputClassName("tanggal_lahir")}
                            />
                            {errors.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir}</p>}
                        </div>

                        {/* Golongan Darah */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("golongan_darah")}
                                className={`text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5 ${errors.golongan_darah ? "border-2 border-red-500" : ""}`}
                            >
                                {formData.golongan_darah}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.golongan_darah ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.golongan_darah && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.golongan_darah.map((option) => (
                                            <li key={option}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelect("golongan_darah", option);
                                                    }}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                                                >
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {errors.golongan_darah && <p className="text-red-500 text-xs mt-1">{errors.golongan_darah}</p>}
                        </div>

                        {/* Alamat */}
                        <div className="lg:col-span-2">
                            <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                            <textarea
                                id="alamat"
                                value={formData.alamat}
                                onChange={(e) => handleInputChange("alamat", e.target.value)}
                                className={getInputClassName("alamat")}
                                placeholder="Alamat Lengkap"
                                rows={3}
                            />
                            {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                        </div>
                        
                        {/* Kecamatan */}
                        <div>
                            <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900">Kecamatan</label>
                            <input
                                type="text"
                                id="kecamatan"
                                value={formData.kecamatan}
                                onChange={(e) => handleInputChange("kecamatan", e.target.value, 255)}
                                className={getInputClassName("kecamatan")}
                                placeholder="kecamatan"
                                maxLength={255}
                            />
                            {errors.kecamatan && <p className="text-red-500 text-xs mt-1">{errors.kecamatan}</p>}
                        </div>
                        
                        {/* Kabupaten */}
                        <div>
                            <label htmlFor="kabupaten" className="block mb-2 text-sm font-medium text-gray-900">Kabupaten</label>
                            <input
                                type="text"
                                id="kabupaten"
                                value={formData.kabupaten}
                                onChange={(e) => handleInputChange("kabupaten", e.target.value, 255)}
                                className={getInputClassName("kabupaten")}
                                placeholder="kabupaten"
                                maxLength={255}
                            />
                            {errors.kabupaten && <p className="text-red-500 text-xs mt-1">{errors.kabupaten}</p>}
                        </div>
                        
                        {/* Provinsi */}
                        <div>
                            <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-gray-900">Provinsi</label>
                            <input
                                type="text"
                                id="provinsi"
                                value={formData.provinsi}
                                onChange={(e) => handleInputChange("provinsi", e.target.value, 255)}
                                className={getInputClassName("provinsi")}
                                placeholder="provinsi"
                                maxLength={255}
                            />
                            {errors.provinsi && <p className="text-red-500 text-xs mt-1">{errors.provinsi}</p>}
                        </div>

                        {/* Pekerjaan */}
                        <div>
                            <label htmlFor="pekerjaan" className="block mb-2 text-sm font-medium text-gray-900">Pekerjaan</label>
                            <input
                                type="text"
                                id="pekerjaan"
                                value={formData.pekerjaan}
                                onChange={(e) => handleInputChange("pekerjaan", e.target.value, 255)}
                                className={getInputClassName("pekerjaan")}
                                placeholder="Pekerjaan"
                                maxLength={255}
                            />
                            {errors.pekerjaan && <p className="text-red-500 text-xs mt-1">{errors.pekerjaan}</p>}
                        </div>

                        {/* Penghasilan */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Penghasilan</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("penghasilan")}
                                className={`text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5 ${errors.penghasilan ? "border-2 border-red-500" : ""}`}
                            >
                                {formData.penghasilan}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.penghasilan ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.penghasilan && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.penghasilan.map((option) => (
                                            <li key={option}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelect("penghasilan", option);
                                                    }}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                                                >
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {errors.penghasilan && <p className="text-red-500 text-xs mt-1">{errors.penghasilan}</p>}
                        </div>

                        {/* Sumber Penghasilan */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("sumber_penghasilan")}
                                className={`text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5 ${errors.sumber_penghasilan ? "border-2 border-red-500" : ""}`}
                            >
                                {formData.sumber_penghasilan}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.sumber_penghasilan ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.sumber_penghasilan && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.sumber_penghasilan.map((option) => (
                                            <li key={option}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelect("sumber_penghasilan", option);
                                                    }}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                                                >
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {errors.sumber_penghasilan && <p className="text-red-500 text-xs mt-1">{errors.sumber_penghasilan}</p>}
                        </div>

                        {/* Jumlah Tanggungan */}
                        <div>
                            <label htmlFor="jumlah_tanggungan" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Tanggungan</label>
                            <input
                                type="text"
                                id="jumlah_tanggungan"
                                value={formData.jumlah_tanggungan}
                                onChange={(e) => handleInputChange("jumlah_tanggungan", e.target.value)}
                                className={getInputClassName("jumlah_tanggungan")}
                                placeholder="Jumlah orang yang ditanggung"
                            />
                            {errors.jumlah_tanggungan && <p className="text-red-500 text-xs mt-1">{errors.jumlah_tanggungan}</p>}
                        </div>

                        {/* Status Rumah */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Status Rumah</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("status_rumah")}
                                className={`text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5 ${errors.status_rumah ? "border-2 border-red-500" : ""}`}
                            >
                                {formData.status_rumah}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.status_rumah ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.status_rumah && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.status_rumah.map((option) => (
                                            <li key={option}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelect("status_rumah", option);
                                                    }}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-200"
                                                >
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {errors.status_rumah && <p className="text-red-500 text-xs mt-1">{errors.status_rumah}</p>}
                        </div>

                        {/* Tanggungan Listrik */}
                        <div>
                            <label htmlFor="tanggungan_listrik" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Listrik per Bulan</label>
                            <input
                                type="text"
                                id="tanggungan_listrik"
                                value={formData.tanggungan_listrik}
                                onChange={(e) => handleInputChange("tanggungan_listrik", e.target.value)}
                                className={getInputClassName("tanggungan_listrik")}
                                placeholder="Tagihan listrik dalam Rupiah"
                            />
                            {errors.tanggungan_listrik && <p className="text-red-500 text-xs mt-1">{errors.tanggungan_listrik}</p>}
                        </div>
                        {/* Tanggungan Air */}
                        <div>
                            <label htmlFor="tanggungan_air" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Air per Bulan</label>
                            <input
                                type="text"
                                id="tanggungan_air"
                                value={formData.tanggungan_air}
                                onChange={(e) => handleInputChange("tanggungan_air", e.target.value)}
                                className={getInputClassName("tanggungan_air")}
                                placeholder="Tagihan air dalam Rupiah"
                            />
                            {errors.tanggungan_air && <p className="text-red-500 text-xs mt-1">{errors.tanggungan_air}</p>}
                        </div>
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
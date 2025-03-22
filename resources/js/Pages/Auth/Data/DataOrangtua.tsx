import { useState } from "react";

interface DataOrangtuaProps {
    onNext: (data: any) => void;
}

export default function DataOrangtua({ onNext }: DataOrangtuaProps) {
    const [formData, setFormData] = useState({
        nama: "",
        nik: "",
        no_jkn: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        golongan_darah: "Pilih",
        alamat: "",
        pekerjaan: "",
        penghasilan: 0,
        sumber_penghasilan: "Pilih",
        jumlah_tanggungan: 0,
        status_rumah: "Pilih",
        tanggungan_listrik: 0,
        tanggungan_air: 0,
    });

    const [dropdowns, setDropdowns] = useState({
        golongan_darah: false,
        sumber_penghasilan: false,
        status_rumah: false,
    });

    const dropdownOptions: Record<string, string[]> = {
        golongan_darah: ["AB", "A", "B", "O"],
        sumber_penghasilan: ["Gaji", "Freelance", "Usaha", "Pensiun"],
        status_rumah: ["Milik Sendiri", "Sewa", "Kontrak", "Dinas"],
    };

    const toggleDropdown = (field: keyof typeof dropdowns) => {
        setDropdowns((prev) => ({
            golongan_darah: false,
            sumber_penghasilan: false,
            status_rumah: false,
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
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Nama Lengkap"
                                required
                                maxLength={255}
                            />
                        </div>

                        {/* NIK */}
                        <div>
                            <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                            <input
                                type="text"
                                id="nik"
                                value={formData.nik}
                                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="NIK (Min. 16 karakter)"
                                required
                                minLength={16}
                                maxLength={16}
                            />
                        </div>

                        {/* Nomor JKN */}
                        <div>
                            <label htmlFor="no_jkn" className="block mb-2 text-sm font-medium text-gray-900">Nomor JKN</label>
                            <input
                                type="text"
                                id="no_jkn"
                                value={formData.no_jkn}
                                onChange={(e) => setFormData({ ...formData, no_jkn: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Nomor JKN (Min. 13 karakter)"
                                required
                                minLength={13}
                                maxLength={13}
                            />
                        </div>

                        {/* Tempat Lahir */}
                        <div>
                            <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                            <input
                                type="text"
                                id="tempat_lahir"
                                value={formData.tempat_lahir}
                                onChange={(e) => setFormData({ ...formData, tempat_lahir: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Tempat Lahir"
                                required
                                maxLength={255}
                            />
                        </div>

                        {/* Tanggal Lahir */}
                        <div>
                            <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                            <input
                                type="date"
                                id="tanggal_lahir"
                                value={formData.tanggal_lahir}
                                onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                required
                            />
                        </div>

                        {/* Golongan Darah */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("golongan_darah")}
                                className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5"
                            >
                                {formData.golongan_darah || "Pilih Golongan Darah"}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.golongan_darah ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.golongan_darah && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.golongan_darah.map(option => (
                                            <li key={option}>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelect("golongan_darah", option);
                                                }} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Alamat */}
                        <div className="lg:col-span-2">
                            <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                            <textarea
                                id="alamat"
                                value={formData.alamat}
                                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Alamat Lengkap"
                                required
                                rows={3}
                            />
                        </div>

                        {/* Pekerjaan */}
                        <div>
                            <label htmlFor="pekerjaan" className="block mb-2 text-sm font-medium text-gray-900">Pekerjaan</label>
                            <input
                                type="text"
                                id="pekerjaan"
                                value={formData.pekerjaan}
                                onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Pekerjaan"
                                required
                                maxLength={255}
                            />
                        </div>

                        {/* Penghasilan */}
                        <div>
                            <label htmlFor="penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Penghasilan per Bulan</label>
                            <input
                                type="number"
                                id="penghasilan"
                                value={formData.penghasilan}
                                onChange={(e) => setFormData({ ...formData, penghasilan: parseInt(e.target.value) })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Penghasilan dalam Rupiah"
                                required
                                min={0}
                            />
                        </div>

                        {/* Sumber Penghasilan */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("sumber_penghasilan")}
                                className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5"
                            >
                                {formData.sumber_penghasilan || "Pilih Sumber Penghasilan"}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.sumber_penghasilan ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.sumber_penghasilan && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.sumber_penghasilan.map(option => (
                                            <li key={option}>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelect("sumber_penghasilan", option);
                                                }} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Jumlah Tanggungan */}
                        <div>
                            <label htmlFor="jumlah_tanggungan" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Tanggungan</label>
                            <input
                                type="number"
                                id="jumlah_tanggungan"
                                value={formData.jumlah_tanggungan}
                                onChange={(e) => setFormData({ ...formData, jumlah_tanggungan: parseInt(e.target.value) })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Jumlah orang yang ditanggung"
                                required
                                min={0}
                            />
                        </div>

                        {/* Status Rumah */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Status Rumah</label>
                            <button
                                type="button"
                                onClick={() => toggleDropdown("status_rumah")}
                                className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5"
                            >
                                {formData.status_rumah || "Pilih Golongan Darah"}
                                <svg className={`w-2.5 h-2.5 ml-3 transform ${dropdowns.status_rumah ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {dropdowns.status_rumah && (
                                <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                    <ul className="py-2 text-gray-700 font-medium">
                                        {dropdownOptions.status_rumah.map(option => (
                                            <li key={option}>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelect("status_rumah", option);
                                                }} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Tanggungan Listrik */}
                        <div>
                            <label htmlFor="tanggungan_listrik" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Listrik per Bulan</label>
                            <input
                                type="number"
                                id="tanggungan_listrik"
                                value={formData.tanggungan_listrik}
                                onChange={(e) => setFormData({ ...formData, tanggungan_listrik: parseInt(e.target.value) })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Tagihan listrik dalam Rupiah"
                                required
                                min={0}
                            />
                        </div>

                        {/* Tanggungan Air */}
                        <div>
                            <label htmlFor="tanggungan_air" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Air per Bulan</label>
                            <input
                                type="number"
                                id="tanggungan_air"
                                value={formData.tanggungan_air}
                                onChange={(e) => setFormData({ ...formData, tanggungan_air: parseInt(e.target.value) })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                placeholder="Tagihan air dalam Rupiah"
                                required
                                min={0}
                            />
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

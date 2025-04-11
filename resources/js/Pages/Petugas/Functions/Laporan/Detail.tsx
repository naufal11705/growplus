import { useState } from "react";
import Layout from "@/Layouts/Petugas";
import { DownloadIcon } from "lucide-react"

// Tipe data untuk Orangtua (mirip dengan types/orangtua.ts)
interface Anak {
    id: number;
    nama: string;
}

interface Orangtua {
    id: number;
    nama: string;
    anak: Anak[];
}

// Dummy data
const dummyOrangtuas: Orangtua[] = [
    {
        id: 1,
        nama: "Budi Santoso",
        anak: [
            { id: 1, nama: "Andi Santoso" },
            { id: 2, nama: "Bunga Santoso" },
        ],
    },
    {
        id: 2,
        nama: "Siti Aminah",
        anak: [
            { id: 3, nama: "Cindy Aminah" },
            { id: 4, nama: "Dedi Aminah" },
        ],
    },
];

export default function Laporan() {
    const [selectedAnak, setSelectedAnak] = useState("");
    const [formData, setFormData] = useState({
        nama_ortu: "",
        nik: "",
        no_telepon: "",
        jumlah_tanggungan: "",
        tantangan_fase: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAnakChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAnak(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logika untuk submit form (dummy, hanya console.log)
        console.log({
            ...formData,
            anak: selectedAnak,
        });
        // Reset form setelah submit (opsional)
        setFormData({
            nama_ortu: "",
            nik: "",
            no_telepon: "",
            jumlah_tanggungan: "",
            tantangan_fase: "",
        });
        setSelectedAnak("");
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h1 className="text-2xl font-bold mb-6">Form Laporan</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Detail Orang Tua */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Detail Orang Tua
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="nama_ortu"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Orang Tua
                                    </label>
                                    <input
                                        type="text"
                                        id="nama_ortu"
                                        name="nama_ortu"
                                        value={formData.nama_ortu}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="nik"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nik
                                    </label>
                                    <input
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        value={formData.nik}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="no_telepon"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No. Telepon
                                    </label>
                                    <input
                                        type="tel"
                                        id="no_telepon"
                                        name="no_telepon"
                                        value={formData.no_telepon}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="jumlah_tanggungan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Jumlah Tanggungan
                                    </label>
                                    <input
                                        type="tel"
                                        id="jumlah_tanggungan"
                                        name="jumlah_tanggungan"
                                        value={formData.jumlah_tanggungan}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 mt-4">
                                Pemilihan Anak
                            </h2>
                            <div>
                                <label
                                    htmlFor="anak"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Pilih Anak
                                </label>
                                <select
                                    id="anak"
                                    name="anak"
                                    value={selectedAnak}
                                    onChange={handleAnakChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Anak
                                    </option>
                                    {dummyOrangtuas.map((orangtua) =>
                                        orangtua.anak.map((a) => (
                                            <option key={a.id} value={a.id}>
                                                {a.nama}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <h2 className="text-xl font-semibold mb-4 mt-4">
                                Detail Tantangan Per Fase
                            </h2>
                            <div>
                                <label
                                    htmlFor="tantangan_fase"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {/* Deskripsi Tantangan */}
                                </label>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Tantangan</th>
                                                <th scope="col" className="px-6 py-3">Fase</th>
                                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                                <th scope="col" className="px-6 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Disini</th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Disini</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Disni</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">LOGIKA STATUS JUPUK O TEKAN FASE NDEK ADMIN, POKOK SING ONK TEKS "STATUS"</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-start gap-3">
                                                    <a href="/petugas/laporan/detail"
                                                        className="inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    >
                                                        <DownloadIcon className="w-3.5 h-3.5" />
                                                        <span>Export PDF</span>
                                                    </a>
                                                </div>
                                            </td>
                                        </tbody>
                                    </table>
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        {/* <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-wine border border-transparent rounded-md font-semibold text-white hover:bg-wine focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine"
                            >
                                Simpan
                            </button>
                        </div> */}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
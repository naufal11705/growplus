import { useEffect, useState } from "react";
import Layout from "@/Layouts/Petugas";
import { DownloadIcon } from "lucide-react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage, router } from "@inertiajs/react";
import { Orangtua } from "@/types/orangtua";
import { generateLaporanPDF } from "@/Lib/laporanPDF";

// Define the Laporan interface for table data
interface Laporan {
    tantangan: string;
    fase: string;
    tanggal: string;
    status: string;
}

interface PageProps extends InertiaPageProps {
    orangtua: Orangtua | null;
    laporan?: Laporan[];
    error?: string;
}

export default function DetailLaporan() {
    const { orangtua, laporan = [], error } = usePage<PageProps>().props;
    const [selectedAnak, setSelectedAnak] = useState<string>("");
    const [isTableLoading, setIsTableLoading] = useState(false);

    // Set default selected anak and fetch initial laporan
    useEffect(() => {
        if (orangtua?.anaks?.length && !selectedAnak) {
            const defaultAnak = orangtua.anaks[0].anak_id.toString();
            setSelectedAnak(defaultAnak);
            // Fetch laporan for default anak
            router.get(
                `/petugas/laporan/anak/${defaultAnak}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["laporan"],
                    onStart: () => setIsTableLoading(true),
                    onFinish: () => setIsTableLoading(false),
                }
            );
        }
    }, [orangtua]);

    const [formData, setFormData] = useState<Partial<Orangtua>>(
        orangtua ?? {
            nama: "",
            nik: "",
            no_jkn: "",
            tempat_lahir: "",
            anaks: [],
        }
    );

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
        const newAnakId = e.target.value;
        setSelectedAnak(newAnakId);
        if (newAnakId) {
            // Fetch laporan data for the selected anak
            router.get(
                `/petugas/laporan/anak/${newAnakId}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["laporan"],
                    onStart: () => setIsTableLoading(true),
                    onFinish: () => setIsTableLoading(false),
                }
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            ...formData,
            anak: selectedAnak,
        });
    };

    // Fungsi untuk menangani ekspor PDF
    const handleExportPDF = () => {
        if (selectedAnak && orangtua) {
            const anakName =
                orangtua.anaks?.find(
                    (anak) => anak.anak_id.toString() === selectedAnak
                )?.nama || "Unknown";
            generateLaporanPDF({
                orangtua,
                laporan,
                selectedAnakId: selectedAnak,
                anakName,
            });
        }
    };

    if (error) {
        return (
            <Layout>
                <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                    <div className="lg:p-8 p-4">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!orangtua) {
        return (
            <Layout>
                <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                    <div className="lg:p-8 p-4">
                        <div className="text-gray-500">
                            Data orangtua tidak tersedia.
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h1 className="text-2xl font-bold mb-6">Form Laporan</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                        name="nama"
                                        value={formData.nama ?? ""}
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
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        value={formData.nik ?? ""}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="no_jkn"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        No JKN
                                    </label>
                                    <input
                                        type="text"
                                        id="no_jkn"
                                        name="no_jkn"
                                        value={formData.no_jkn ?? ""}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-wine focus:ring-wine sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="tempat_lahir"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        value={formData.tempat_lahir ?? ""}
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
                                    disabled={isTableLoading}
                                >
                                    <option value="" disabled>
                                        Pilih Anak
                                    </option>
                                    {orangtua.anaks?.length > 0 ? (
                                        orangtua.anaks.map((anak) => (
                                            <option
                                                key={anak.anak_id}
                                                value={anak.anak_id}
                                            >
                                                {anak.nama}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            Tidak ada anak tersedia
                                        </option>
                                    )}
                                </select>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Tantangan
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fase
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tanggal
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isTableLoading ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : laporan.length > 0 ? (
                                        laporan.map((row, index) => (
                                            <tr key={index}>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {row.tantangan}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {row.fase}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {row.tanggal}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {row.status}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-start gap-3">
                                                        <button
                                                            onClick={handleExportPDF}
                                                            className="inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                        >
                                                            <DownloadIcon className="w-3.5 h-3.5" />
                                                            <span>Export PDF</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                Tidak ada laporan untuk anak ini.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

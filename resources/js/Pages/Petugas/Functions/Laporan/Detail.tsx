import { useEffect, useState } from "react";
import Layout from "@/Layouts/Petugas";
import { DownloadIcon } from "lucide-react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage, router } from "@inertiajs/react";
import { Orangtua, Anak } from "@/types/orangtua"; // Import Anak type

// Define the Laporan interface for table data
interface Laporan {
    id: string | number;
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
    const [anakOptions, setAnakOptions] = useState<Anak[]>([]); // State to hold anak options

    // Debug laporan and orangtua props
    useEffect(() => {
        console.log("Laporan data:", laporan);
        console.log("Orangtua data:", orangtua);
        console.log("Selected anak:", selectedAnak);
    }, [laporan, orangtua, selectedAnak]);

    // Populate anak options when orangtua data is available
    useEffect(() => {
        if (orangtua?.anaks) {
            setAnakOptions(orangtua.anaks);
            // Set default selected anak if available and not already set
            if (orangtua.anaks.length > 0 && !selectedAnak) {
                setSelectedAnak(orangtua.anaks[0].anak_id.toString());
            }
        } else {
            setAnakOptions([]); // Ensure anakOptions is empty if no orangtua or anaks
            setSelectedAnak(""); // Reset selected anak
        }
    }, [orangtua]);

    // Fetch laporan whenever the selectedAnak changes
    useEffect(() => {
        if (selectedAnak) {
            fetchLaporan(selectedAnak);
        }
    }, [selectedAnak]);

    // Fetch laporan for a given anak_id
    const fetchLaporan = (anakId: string) => {
        setIsTableLoading(true);
        router.get(
            `/petugas/laporan/anak/${anakId}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ["laporan"], // Only update the 'laporan' prop
                onSuccess: () => setIsTableLoading(false),
                onError: (errors) => {
                    console.error("Failed to fetch laporan:", errors);
                    setIsTableLoading(false);
                },
            }
        );
    };

    const handleAnakChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAnakId = e.target.value;
        setSelectedAnak(newAnakId);
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
                    <h1 className="text-2xl font-bold mb-6">Detail Laporan</h1>
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
                                    value={orangtua.nama ?? ""}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100"
                                    readOnly
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
                                    value={orangtua.nik ?? ""}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100"
                                    readOnly
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
                                    value={orangtua.no_jkn ?? ""}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100"
                                    readOnly
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
                                    value={orangtua.tempat_lahir ?? ""}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100"
                                    readOnly
                                />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-4 mt-6">
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
                            >
                                <option value="" disabled>
                                    Pilih Anak
                                </option>
                                {anakOptions.length > 0 ? ( // Use anakOptions here
                                    anakOptions.map((anak) => (
                                        <option
                                            key={anak.anak_id}
                                            value={anak.anak_id.toString()}
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
                        <h2 className="text-xl font-semibold mb-4 mt-6">
                            Laporan
                        </h2>
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
                                    laporan.map((row) => (
                                        <tr key={row.id}>
                                            <td className="px-6 py-4">
                                                {row.tantangan}
                                            </td>
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
                                                <a
                                                    href={`/petugas/laporan/export/${selectedAnak}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    <DownloadIcon className="w-3.5 h-3.5" />
                                                    <span>Export PDF</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            {selectedAnak
                                                ? "Tidak ada laporan untuk anak ini."
                                                : "Pilih anak untuk melihat laporan."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
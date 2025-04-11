import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Petugas";
import FilterDropdown from "@/Components/Widget/Filter/FilterPuskesmas";
import { Pencil, Trash2 } from "lucide-react"

interface Imunisasi {
    imunisasi_id: number;
    nama: string;
    jenis: string;
    usia_minimum: number;
    usia_maksimum: number;
    puskesmas_id: number;
}

interface PageProps extends InertiaPageProps {
    imunisasi: Imunisasi[];
}

export default function Imunisasi() {
    const { imunisasi } = usePage<PageProps>().props;
    const [filteredImunisasi, setFilteredImunisasi] = useState<Imunisasi[]>([]);

    useEffect(() => setFilteredImunisasi(imunisasi), [imunisasi]);

    const handleFilterChange = (puskesmasId: string) => {
        setFilteredImunisasi(puskesmasId ? imunisasi.filter((item) => item.puskesmas_id.toString().includes(puskesmasId)) : imunisasi);
    };

    const handleDelete = (id: number) => router.delete(`/petugas/imunisasi/${id}`, {
        onSuccess: () => router.reload({ only: ["imunisasi"] }),
        onError: () => alert("Gagal menghapus data."),
    });

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <div className="flex justify-between items-center mb-5">
                        <a href="/petugas/imunisasi/tambah"><button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">Tambah Imunisasi</button></a>
                        <FilterDropdown onFilterChange={handleFilterChange} />
                    </div>
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Usia Minimum
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Usia Maksimum
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Puskesmas ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredImunisasi.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-4">Tidak ada data yang ditemukan.</td></tr>
                                ) : (
                                    filteredImunisasi.map((item) => (
                                        <tr key={item.imunisasi_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.imunisasi_id}</th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nama}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.jenis}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.usia_minimum}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.usia_maksimum}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.puskesmas_id}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-start gap-3">
                                                    <a
                                                        href={`/petugas/imunisasi/${item.imunisasi_id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        <span>Edit</span>
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(item.imunisasi_id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

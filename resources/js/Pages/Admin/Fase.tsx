import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Admin";
import FilterDropdown from "@/Components/Widget/Filter/FilterFase";
import { Pencil, Trash2 } from "lucide-react"


interface Fase {
    fase_id: number;
    judul: string;
    deskripsi: string;
    benefits: string;
    banner: string;
    progress: number;
    status: string | number;
}

interface PageProps extends InertiaPageProps {
    fase: Fase[];
}

export default function Fase() {
    const { fase } = usePage<PageProps>().props;
    const [filteredFase, setFilteredFase] = useState<Fase[]>([]);

    useEffect(() => setFilteredFase(fase), [fase]);

    const handleFilterChange = ({ faseId, status }: { faseId: string; status: string }) => {
        let filtered = fase;
        if (faseId) filtered = filtered.filter((item) => item.fase_id.toString().toLowerCase().includes(faseId.toLowerCase()));
        if (status) filtered = filtered.filter((item) => (status === "Aktif" ? Number(item.status) === 1 : Number(item.status) === 0));
        setFilteredFase(filtered);
    };

    const handleDelete = (id: number) => router.delete(`/admin/fase/${id}`, {
        onSuccess: () => router.reload({ only: ["fase"] }),
        onError: () => alert("Gagal menghapus data."),
    });

    const trimText = (text: string): string => !text ? "" : (text.match(/[^\.!\?]+[\.!\?]+/g) || [text]).length <= 1 ? text : text.match(/[^\.!\?]+[\.!\?]+/g)!.slice(0, 1).join("") + "...";
    const convertStatus = (status: string | number): string => (Number(status) === 1 ? "Aktif" : "Tidak Aktif");
    const getStatusClass = (status: string | number): string => (Number(status) === 1 ? "bg-green-100 text-green-800 px-2 py-1 rounded-md" : "bg-red-100 text-red-800 px-2 py-1 rounded-md");

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <div className="flex justify-between items-center mb-5">
                        <a href="/admin/fase/create"><button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">Tambah Fase</button></a>
                        <FilterDropdown onFilterChange={handleFilterChange} />
                    </div>
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Judul</th>
                                    <th scope="col" className="px-6 py-3">Deskripsi</th>
                                    <th scope="col" className="px-6 py-3">Benefits</th>
                                    <th scope="col" className="px-6 py-3">Banner</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFase.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4">Tidak ada data yang ditemukan.</td>
                                    </tr>
                                    ) : (
                                    filteredFase.map((item) => (
                                        <tr key={item.fase_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.fase_id}</th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.judul}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{trimText(item.deskripsi)}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{trimText(item.benefits)}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><img src={`${window.location.origin}/storage/${item.banner}`} alt="Fase Banner" className="w-16 h-16 object-cover rounded-md" /></td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><span className={getStatusClass(item.status)}>{convertStatus(item.status)}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <a
                                                        href={`/admin/fase/${item.fase_id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        <span>Edit</span>
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(item.fase_id)}
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
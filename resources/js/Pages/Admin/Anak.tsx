import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";
import { Pencil, Trash2 } from "lucide-react"

interface Anak {
    anak_id: number;
    orangtua_id: number;
    nama: string;
    nik: number;
    no_jkn: number;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    berat_badan: number;
    tinggi_badan: number;
}

interface PageProps extends InertiaPageProps {
    anak: Anak[];
}

export default function Anak(){
        const { anak } = usePage<PageProps>().props;
    
        const handleDelete = (id: number) => {
            router.delete(`/admin/anak/${id}`, {
                onSuccess: () => router.reload({ only: ["anak"] }),
                onError: () => alert("Gagal menghapus data."),
            });
        };
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/anak/create">
                        <button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Tambah Data Anak
                        </button>
                    </a>
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
                                        NIK
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        No. JKN
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tempat Lahir
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal Lahir
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gol. Darah
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Berat Badan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tinggi Badan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {anak.map((item) => (
                                    <tr key={item.anak_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.anak_id}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nama}</td>   
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nik}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_jkn}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tempat_lahir}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tanggal_lahir}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.golongan_darah}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.berat_badan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tinggi_badan}</td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-start gap-3">
                                                <a
                                                href={`/admin/anak/${item.anak_id}/edit`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </a>
                                                <button
                                                onClick={() => handleDelete(item.anak_id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </td>  
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

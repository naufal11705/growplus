import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";
import { Pencil, Trash2 } from "lucide-react"

interface OrangTua {
    orangtua_id: number;
    pengguna_id: number;
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    alamat: string;
    pekerjaan: string;
    penghasilan: number;
    sumber_penghasilan: string;
    jumlah_tanggungan: number;
    status_rumah: string;
    tanggungan_listrik: number;
    tanggungan_air: number;
}

interface PageProps extends InertiaPageProps {
    orangtua: OrangTua[];
}

export default function OrangTua(){
        const { orangtua } = usePage<PageProps>().props;
    
        const handleDelete = (id: number) => {
            router.delete(`/admin/orangtua/${id}`, {
                onSuccess: () => router.reload({ only: ["orangtua"] }),
                onError: () => alert("Gagal menghapus data."),
            });
        };
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/orangtua/create">
                        <button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Tambah Data Orang Tua
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
                                        Alamat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Pekerjaan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Penghasilan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sumber Penghasilan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Jumlah Tanggungan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status Rumah
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggungan Listrik
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggungan Air
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orangtua.map((item) => (
                                    <tr key={item.orangtua_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.orangtua_id}
                                        </th>   
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nama}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nik}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_jkn}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tempat_lahir}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tanggal_lahir}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.golongan_darah}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.alamat}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.pekerjaan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.penghasilan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.sumber_penghasilan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.jumlah_tanggungan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.status_rumah}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tanggungan_listrik}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.tanggungan_air}</td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-start gap-3">
                                                <a
                                                href={`/admin/orangtua/${item.orangtua_id}/edit`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </a>
                                                <button
                                                onClick={() => handleDelete(item.orangtua_id)}
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

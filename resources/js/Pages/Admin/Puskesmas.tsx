import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";

interface Puskesmas {
    puskesmas_id: number;
    nama: string;
    alamat: string;
    kecamatan: string;
    kota: string;
    kontak: string;
}

interface PageProps extends InertiaPageProps {
    puskesmas: Puskesmas[];
}

export default function Puskesmas() {
    const { puskesmas } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        router.delete(`/admin/puskesmas/${id}`, {
            onSuccess: () => router.reload({ only: ["puskesmas"] }),
            onError: () => alert("Gagal menghapus data."),
        });
    };
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/puskesmas/create">
                        <button
                            type="button"
                            className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine"
                        >
                            Tambah Puskesmas
                        </button>
                    </a>
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Alamat</th>
                                    <th scope="col" className="px-6 py-3">Kecamatan</th>
                                    <th scope="col" className="px-6 py-3">Kota</th>
                                    <th scope="col" className="px-6 py-3">Kontak</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {puskesmas.map((item) => (
                                    <tr key={item.puskesmas_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.puskesmas_id}
                                        </th>
                                        <td className="px-6 py-4">{item.nama}</td>
                                        <td className="px-6 py-4">{item.alamat}</td>
                                        <td className="px-6 py-4">{item.kecamatan}</td>
                                        <td className="px-6 py-4">{item.kota}</td>
                                        <td className="px-6 py-4">{item.kontak}</td>
                                        <td className="px-6 py-4 text-right flex gap-2">
                                            <a href={`/admin/puskesmas/${item.puskesmas_id}/edit`} className="font-medium text-wine hover:underline">
                                                Edit
                                            </a>
                                            │
                                            <button
                                                onClick={() => handleDelete(item.puskesmas_id)} className="font-medium text-red-500 hover:underline">
                                                Delete
                                            </button>
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

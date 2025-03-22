import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";

interface Faskes {
    faskes_id: number,
    orangtua_id: number,
    puskesmas_id: number,
    no_reg_kohort_ibu: number,
    no_reg_kohort_anak: number,
}

interface PageProps extends InertiaPageProps {
    faskes: Faskes[];
}

export default function Faskes(){
    const { faskes } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        router.delete(`/admin/faskes/${id}`, {
            onSuccess: () => router.reload({ only: ["faskes"] }),
            onError: () => alert("Gagal menghapus data."),
        });
    };

    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/faskes/create">
                        <button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Tambah Faskes
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
                                        Orang Tua ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Puskesmas ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kohort Ibu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kohort Anak
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {faskes.map((item) => (
                                    <tr key={item.faskes_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.faskes_id}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.orangtua_id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.puskesmas_id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_reg_kohort_ibu}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_reg_kohort_anak}</td>
                                        <td className="px-6 py-4 text-right flex gap-2">
                                            <a href={`/admin/faskes/${item.faskes_id}/edit`} className="font-medium text-wine hover:underline">
                                                Edit
                                            </a>
                                            │
                                            <button
                                                onClick={() => handleDelete(item.faskes_id)} className="font-medium text-red-500 hover:underline">
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

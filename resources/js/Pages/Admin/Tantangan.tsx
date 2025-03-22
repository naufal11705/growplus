import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";

interface Tantangan {
    tantangan_id: number;
    activity: string;
    point: number;
    fase_id: number;
    status: string | number;
}

interface PageProps extends InertiaPageProps {
    tantangan: Tantangan[];
}

export default function Tantangan() {
    const { tantangan } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        router.delete(`/admin/tantangan/${id}`, {
            onSuccess: () => router.reload({ only: ["tantangan"] }),
            onError: () => alert("Gagal menghapus data."),
        });
    };

    // Fungsi untuk mengkonversi status
    const convertStatus = (status: string | number): string => {
        const statusNum = Number(status);
        return statusNum === 1 ? "Aktif" : "Tidak Aktif";
    };

    // Fungsi untuk menentukan className berdasarkan status
    const getStatusClass = (status: string | number): string => {
        const statusNum = Number(status);
        return statusNum === 1
            ? "bg-green-100 text-green-800 px-2 py-1 rounded-md"
            : "bg-red-100 text-red-800 px-2 py-1 rounded-md";
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/tantangan/create">
                        <button
                            type="button"
                            className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine"
                        >
                            Tambah Tantangan
                        </button>
                    </a>
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Aktivitas</th>
                                    <th scope="col" className="px-6 py-3">Poin</th>
                                    <th scope="col" className="px-6 py-3">Fase ID</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tantangan.map((item) => (
                                    <tr
                                        key={item.tantangan_id}
                                        className="bg-white border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {item.tantangan_id}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.activity}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.point}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.fase_id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <span className={getStatusClass(item.status)}>
                                                {convertStatus(item.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <a
                                                href={`/admin/tantangan/${item.tantangan_id}/edit`}
                                                className="font-medium text-wine hover:underline"
                                            >
                                                Edit
                                            </a>
                                            │
                                            <button
                                                onClick={() => handleDelete(item.tantangan_id)}
                                                className="font-medium text-red-500 hover:underline"
                                            >
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

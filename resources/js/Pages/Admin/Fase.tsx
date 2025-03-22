import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";

interface Fase {
    fase_id: number;
    title: string;
    description: string;
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

    const handleDelete = (id: number) => {
        router.delete(`/admin/fase/${id}`, {
            onSuccess: () => router.reload({ only: ["fase"] }),
            onError: () => alert("Gagal menghapus data."),
        });
    };

    const trimText = (text: string): string => {
        if (!text) return "";
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
        if (sentences.length <= 1) {
            return text;
        }
        return sentences.slice(0, 1).join('') + '...';
    };

    const convertStatus = (status: string | number): string => {
        const statusNum = Number(status);
        return statusNum === 1 ? "Aktif" : "Tidak Aktif";
    };

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
                    <a href="/admin/fase/create">
                        <button
                            type="button"
                            className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine"
                        >
                            Tambah Fase
                        </button>
                    </a>
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Judul</th>
                                    <th scope="col" className="px-6 py-3">Deskripsi</th>
                                    <th scope="col" className="px-6 py-3">Benefits</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fase.map((item) => (
                                    <tr
                                        key={item.fase_id}
                                        className="bg-white border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {item.fase_id}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {trimText(item.description)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {trimText(item.benefits)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <span className={getStatusClass(item.status)}>
                                                {convertStatus(item.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <a
                                                href={`/admin/fase/${item.fase_id}/edit`}
                                                className="font-medium text-wine hover:underline"
                                            >
                                                Edit
                                            </a>
                                            │
                                            <button
                                                onClick={() => handleDelete(item.fase_id)}
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

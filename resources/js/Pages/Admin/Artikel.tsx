import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/Admin";
import { Pencil, Trash2 } from "lucide-react"

interface Artikel {
    artikel_id: number;
    title: string;
    author: string
    content: string;
}

interface PageProps extends InertiaPageProps {
    articles: Artikel[]
}

export default function Artikel() {
    const { articles } = usePage<PageProps>().props;

    const handleDelete = (id: number) => {
        router.delete(`/admin/artikel/${id}`, {
            onSuccess: () => router.reload({ only: ["artikel"] }),
            onError: () => alert("Gagal menghapus data."),
        });
    };
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    {/* Tombol Tambah Artikel dan Filter Dropdown */}
                    <div className="flex justify-between items-center mb-5">
                        <a href="/admin/artikel/create">
                            <button
                                type="button"
                                className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine"
                            >
                                Tambah Artikel
                            </button>
                        </a>
                    </div>
                    <div className="relative overflow-x-auto border rounded-xl">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Judul
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Penulis
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Konten
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((item) => (
                                    <tr key={item.artikel_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.artikel_id}
                                        </th>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.title}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.author}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.content}</td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <a
                                                    href={`/admin/artikel/${item.artikel_id}/edit`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    <span>Edit</span>
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(item.artikel_id)}
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
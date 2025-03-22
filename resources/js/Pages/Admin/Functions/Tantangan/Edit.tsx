import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

interface Fase {
    fase_id: number;
    title: string;
}

import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface PageProps extends InertiaPageProps {
    fase: Fase[];
}

export default function Tantangan() {
    const { fase } = usePage<PageProps>().props;
    const [selectedFase, setSelectedFase] = useState("");

    const csrf_token = useCsrfToken();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("_token", csrf_token);

        router.post('/admin/tantangan', formData);
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Tantangan</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                            {/* Nama Tantangan */}
                            <div className="">
                                <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900">Judul Tantangan</label>
                                <input type="text" name="activity" id="activity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis judul tantangan di sini..." required />
                            </div>

                            {/* Fase */}

                            <div>
                                <label htmlFor="fase_id" className="block mb-2 text-sm font-medium text-gray-900">Fase</label>
                                <select
                                    id="fase_id"
                                    name="fase_id"
                                    value={selectedFase}
                                    onChange={(e) => setSelectedFase(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Fase</option>
                                    {fase?.map((item: Fase) => (
                                        <option key={item.fase_id} value={item.fase_id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Poin Tantangan */}
                            <div>
                                <label htmlFor="point" className="block mb-2 text-sm font-medium text-gray-900">Poin</label>
                                <input type="number" name="point" id="point" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan jumlah poin" required min="1" />
                            </div>

                            {/* Status Tantangan */}
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="status" name="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Tantangan
                            </button>
                            <a href="/admin/tantangan">
                                <button type="button" className="px-5 py-3 text-sm font-medium text-center text-gray-900 bg-white rounded-xl hover:bg-gray-100 border border-gray-200">
                                    Kembali
                                </button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

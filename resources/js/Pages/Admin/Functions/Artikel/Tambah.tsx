import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

interface Fase {
    fase_id: number;
    judul: string;
}

import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface PageProps extends InertiaPageProps {
    fase: Fase[];
}

export default function Artikel(){
    const { fase } = usePage<PageProps>().props;
    const [selectedFase, setSelectedFase] = useState("");

        const csrf_token = useCsrfToken();
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            const formData = new FormData(e.currentTarget);
            formData.append("_token", csrf_token);
    
            router.post('/admin/artikel', formData);
        };

    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Buat Artikel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Judul Artikel</label>
                            <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis judul disini..." required />
                        </div>
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
                                        {item.judul}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Deskripsis</label>
                            <textarea name="content" id="content" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis Deksripsi Disini...">
                            </textarea>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Buat Artikel
                        </button>
                        <a href="/admin/artikel">
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
import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

type ArtikelType = {
    title?: string;
    fase_id?: string;
    content?: string;
    id?: number;
};

type FaseType = {
    fase_id: string;
    title: string;
};

type PageProps = {
    auth: any;
    fase: FaseType[];
    artikel?: ArtikelType;
};

export default function Artikel() {
    const { fase = [], artikel = {} as ArtikelType } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [formData, setFormData] = useState<ArtikelType>({
        title: artikel?.title || "",
        fase_id: artikel?.fase_id || (fase.length > 0 ? fase[0].fase_id : ""),
        content: artikel?.content || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                data.append(key, value.toString()); // Konversi ke string untuk menghindari error
            }
        });
    
        data.append("_token", csrf_token);
        router.post(artikel?.id ? `/admin/artikel/${artikel.id}` : "/admin/artikel", data);
    };    

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">{artikel ? "Edit Artikel" : "Buat Artikel"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Judul Artikel</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    placeholder="Tulis judul disini..." 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="fase_id" className="block mb-2 text-sm font-medium text-gray-900">Fase</label>
                                <select 
                                    id="fase_id" 
                                    name="fase_id" 
                                    value={formData.fase_id} 
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    {fase.map((item: FaseType) => (
                                        <option key={item.fase_id} value={item.fase_id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                                <textarea 
                                    name="content" 
                                    id="content" 
                                    rows={8} 
                                    value={formData.content} 
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" 
                                    placeholder="Tulis Deksripsi Disini..." 
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                {artikel ? "Update Artikel" : "Buat Artikel"}
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

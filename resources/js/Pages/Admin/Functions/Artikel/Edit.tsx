import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

type ArtikelType = {
    artikel_id?: number;
    title?: string;
    author?: string;
    content?: string;
    slug?: string;
    id?: number;
};

type PageProps = {
    auth: any;
    artikel?: ArtikelType;
};

export default function Artikel() {
    const { artikel = {} as ArtikelType } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const slugify = (text: string) => 
        text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-');

    const [formData, setFormData] = useState<ArtikelType>({
        title: artikel?.title || "",
        author: artikel?.author || "",
        content: artikel?.content || "",
        slug: artikel?.slug || "",
    });

    useEffect(() => {
        setFormData((prev) => ({ ...prev, slug: slugify(prev.title || "") }));
    }, [formData.title]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                data.append(key, value.toString());
            }
        });
    
        data.append("_token", csrf_token);
        router.put(`/admin/artikel/${artikel.artikel_id}`, {
            _token: csrf_token,
            title: formData.title,
            author: formData.author,
            content: formData.content,
            slug: formData.slug,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Berhasil update artikel");
            },
            onError: (errors) => {
                console.error("Terjadi error:", errors);
            }
        });
        
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">{artikel.id ? "Edit Artikel" : "Buat Artikel"}</h2>
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
                                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Penulis</label>
                                <input 
                                    type="text" 
                                    name="author" 
                                    id="author" 
                                    value={formData.author} 
                                    onChange={handleChange} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    placeholder="Tulis author disini..." 
                                    required 
                                />
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

                        {/* Input hidden untuk slug */}
                        <input type="hidden" name="slug" value={formData.slug} />

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Artikel
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

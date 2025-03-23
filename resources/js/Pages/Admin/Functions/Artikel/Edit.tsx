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
    banner?: string;
    id?: number;
};

type PageProps = {
    auth: any;
    artikel?: ArtikelType;
};

export default function Artikel() {
    const { artikel = {} as ArtikelType } = usePage<PageProps>().props;
    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(artikel.banner || null);
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

    // Update preview jika artikel sudah memiliki banner sebelumnya
    useEffect(() => {
        if (artikel.banner) {
            setPreview(`${window.location.origin}/storage/${artikel.banner}`);
        }
    }, [artikel.banner]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setBanner(file);

            // Membuat URL object sementara untuk preview
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
    
        // Menambahkan data artikel ke FormData
        data.append("_token", csrf_token);
        data.append("_method", "PUT");
        data.append("title", formData.title || "");
        data.append("author", formData.author || "");
        data.append("content", formData.content || "");
        data.append("slug", formData.slug || "");
    
        // Jika ada banner baru, tambahkan ke FormData
        if (banner) {
            data.append("banner", banner);
        }
    
        // Kirim data dengan router.post agar FormData dapat diterima
        router.post(`/admin/artikel/${artikel.artikel_id}`, data, {
            forceFormData: true, // Memastikan FormData dikirim sebagai multipart/form-data
            onSuccess: () => console.log("✅ Artikel berhasil diperbarui!"),
            onError: (errors) => console.error("❌ Terjadi kesalahan:", errors),
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

                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Banner Saat Ini</label>
                                <img src={`${preview}`} alt="Banner" className="w-full max-w-xs rounded-lg" />
                            </div>

                            {/* Input File untuk Banner */}
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Banner</label>
                                <input 
                                    onChange={handleFileChange} 
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" 
                                    name="banner" 
                                    id="banner" 
                                    type="file" 
                                    accept="image/*"
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

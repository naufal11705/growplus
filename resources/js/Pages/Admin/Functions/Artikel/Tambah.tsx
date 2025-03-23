import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

export default function Artikel(){
    const csrf_token = useCsrfToken();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    const slugify = (text: string) => {
        return text
            ? text.toLowerCase().trim().replace(/[\s\W-]+/g, '-')
            : '';
    };

    useEffect(() => {
        setSlug(slugify(title));
    }, [title]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (csrf_token) {
            formData.append("_token", csrf_token);
        }
        formData.append("slug", slug);

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
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                placeholder="Tulis judul disini..." 
                                required 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Penulis</label>
                            <input type="text" name="author" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis author disini..." required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                            <textarea name="content" id="content" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis Deksripsi Disini...">
                            </textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Banner</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" name="banner" id="banner" type="file" />
                        </div>
                    </div>
                    <input type="hidden" name="slug" value={slug} />
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
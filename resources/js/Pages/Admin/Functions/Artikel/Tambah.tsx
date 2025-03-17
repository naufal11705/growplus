import Layout from "@/Layouts/Admin";
export default function Artikel(){
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Buat Artikel</h2>
                <form action="#">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="">
                            <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900">Judul Artikel</label>
                            <input type="text" name="judul" id="judul" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis judul disini..." required />
                        </div>
                        <div>
                            <label htmlFor="fase" className="block mb-2 text-sm font-medium text-gray-900">Fase</label>
                            <select id="fase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="fase-1">Fase 1</option>
                                <option value="fase-2">Fase 2</option>
                                <option value="fase-3">Fase 3</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Deskripsis</label>
                            <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis Deksripsi Disini...">
                            </textarea>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button type="button" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
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
import Layout from "@/Layouts/Admin";

export default function Puskesmas() {
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Tambah Data Puskesmas</h2>
                    <form action="#" method="POST">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                            {/* Nama Puskesmas */}
                            <div className="sm:col-span-2">
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Puskesmas</label>
                                <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis nama puskesmas di sini..." required />
                            </div>

                            {/* Alamat */}
                            <div className="sm:col-span-2">
                                <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                                <textarea id="alamat" name="alamat" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis alamat puskesmas..." required></textarea>
                            </div>

                            {/* Kecamatan */}
                            <div>
                                <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900">Kecamatan</label>
                                <input type="text" name="kecamatan" id="kecamatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan kecamatan" required />
                            </div>

                            {/* Kota */}
                            <div>
                                <label htmlFor="kota" className="block mb-2 text-sm font-medium text-gray-900">Kota</label>
                                <input type="text" name="kota" id="kota" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan kota" required />
                            </div>

                            {/* Kontak */}
                            <div className="sm:col-span-2">
                                <label htmlFor="kontak" className="block mb-2 text-sm font-medium text-gray-900">Kontak</label>
                                <input type="number" name="kontak" id="kontak" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nomor telepon atau kontak puskesmas" required />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Tambah Puskesmas
                            </button>
                            <a href="/admin/puskesmas">
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

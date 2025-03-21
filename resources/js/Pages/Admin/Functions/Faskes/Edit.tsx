import Layout from "@/Layouts/Admin";

export default function Faskes() {
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Fasilitas Kesehatan</h2>
                    <form action="#" method="POST">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            
                            {/* Orang Tua */}
                            <div>
                                <label htmlFor="orangtua_id" className="block mb-2 text-sm font-medium text-gray-900">Orang Tua</label>
                                <select id="orangtua_id" name="orangtua_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required>
                                    <option value="">Pilih Orang Tua</option>
                                    {/* Data orang tua diambil dari database */}
                                </select>
                            </div>
                            
                            {/* Puskesmas */}
                            <div>
                                <label htmlFor="puskesmas_id" className="block mb-2 text-sm font-medium text-gray-900">Puskesmas</label>
                                <select id="puskesmas_id" name="puskesmas_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required>
                                    <option value="">Pilih Puskesmas</option>
                                    {/* Data puskesmas diambil dari database */}
                                </select>
                            </div>

                            {/* Nomor Registrasi Kohort Ibu */}
                            <div className="sm:col-span-2">
                                <label htmlFor="no_reg_kohort_ibu" className="block mb-2 text-sm font-medium text-gray-900">Nomor Registrasi Kohort Ibu</label>
                                <input type="text" name="no_reg_kohort_ibu" id="no_reg_kohort_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nomor registrasi kohort ibu..." required />
                            </div>

                            {/* Nomor Registrasi Kohort Anak */}
                            <div className="sm:col-span-2">
                                <label htmlFor="no_reg_kohort_anak" className="block mb-2 text-sm font-medium text-gray-900">Nomor Registrasi Kohort Anak</label>
                                <input type="text" name="no_reg_kohort_anak" id="no_reg_kohort_anak" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nomor registrasi kohort anak..." required />
                            </div>

                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Faskes
                            </button>
                            <a href="/admin/faskes">
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

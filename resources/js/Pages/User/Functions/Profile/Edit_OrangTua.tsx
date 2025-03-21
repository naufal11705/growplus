import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";

export default function ProfileEdit() {
    const csrf_token = useCsrfToken();

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Orang Tua</h2>
                    <form>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            {/* NIK */}
                            <div>
                                <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                                <input type="text" name="nik" id="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan NIK" required />
                            </div>
                            
                            {/* No JKN */}
                            <div>
                                <label htmlFor="no_jkn" className="block mb-2 text-sm font-medium text-gray-900">No JKN</label>
                                <input type="text" name="no_jkn" id="no_jkn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan No JKN" required />
                            </div>
                            
                            {/* Tempat Lahir */}
                            <div>
                                <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                                <input type="text" name="tempat_lahir" id="tempat_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan Tempat Lahir" required />
                            </div>
                            
                            {/* Tanggal Lahir */}
                            <div>
                                <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input type="date" name="tanggal_lahir" id="tanggal_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                            </div>
                            
                            {/* Golongan Darah */}
                            <div>
                                <label htmlFor="golongan_darah" className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                                <input type="text" name="golongan_darah" id="golongan_darah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan Golongan Darah" required />
                            </div>
                            
                            {/* Alamat */}
                            <div className="sm:col-span-2">
                                <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                                <textarea id="alamat" name="alamat" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Masukkan alamat lengkap..." required></textarea>
                            </div>
                            
                            {/* Pekerjaan */}
                            <div>
                                <label htmlFor="pekerjaan" className="block mb-2 text-sm font-medium text-gray-900">Pekerjaan</label>
                                <input type="text" name="pekerjaan" id="pekerjaan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan Pekerjaan" required />
                            </div>
                            
                            {/* Penghasilan */}
                            <div>
                                <label htmlFor="penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Penghasilan</label>
                                <input type="number" name="penghasilan" id="penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Masukkan Penghasilan" required />
                            </div>
                            
                            {/* Sumber Penghasilan */}
                            <div>
                                <label htmlFor="sumber_penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                                <input type="text" name="sumber_penghasilan" id="sumber_penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Sumber Penghasilan" required />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Profil
                            </button>
                            <a href="/admin/orangtua">
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
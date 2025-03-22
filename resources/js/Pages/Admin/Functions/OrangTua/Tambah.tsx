import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

interface OrangTua {
    orangtua_id: number;
    pengguna_id: number;
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    alamat: string;
    pekerjaan: string;
    penghasilan: number;
    sumber_penghasilan: string;
    jumlah_tanggungan: number;
    status_rumah: string;
    tanggungan_listrik: number;
    tanggungan_air: number;
}

interface Pengguna {
    pengguna_id: number;
    nama: string;
}

import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface PageProps extends InertiaPageProps {
    orangtua: OrangTua[];
    pengguna: Pengguna[];
}

export default function OrangTua() {
    const { pengguna } = usePage<PageProps>().props;
    const [selectedPengguna, setSelectedPengguna] = useState("");
    const csrf_token = useCsrfToken();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("_token", csrf_token);

        router.post('/admin/orangtua', formData);
    };
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Buat Data Orang Tua</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div>
                                <label htmlFor="pengguna_id" className="block mb-2 text-sm font-medium text-gray-900">Pengguna</label>
                                <select
                                    id="pengguna_id"
                                    name="pengguna_id"
                                    value={selectedPengguna}
                                    onChange={(e) => setSelectedPengguna(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Pengguna</option>
                                    {pengguna?.map((item: Pengguna) => (
                                        <option key={item.pengguna_id} value={item.pengguna_id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                                <input type="text" name="nik" id="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="no_jkn" className="block mb-2 text-sm font-medium text-gray-900">Nomor JKN</label>
                                <input type="text" name="no_jkn" id="no_jkn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                                <input type="text" name="tempat_lahir" id="tempat_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input type="date" name="tanggal_lahir" id="tanggal_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label htmlFor="golongan_darah" className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                                <input type="text" name="golongan_darah" id="golongan_darah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                                <textarea name="alamat" id="alamat" rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required></textarea>
                            </div>
                            
                            <div>
                                <label htmlFor="pekerjaan" className="block mb-2 text-sm font-medium text-gray-900">Pekerjaan</label>
                                <input type="text" name="pekerjaan" id="pekerjaan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Penghasilan</label>
                                <input type="number" name="penghasilan" id="penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="sumber_penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                                <input type="text" name="sumber_penghasilan" id="sumber_penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="jumlah_tanggungan" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Tanggungan</label>
                                <input type="number" name="jumlah_tanggungan" id="jumlah_tanggungan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="status_rumah" className="block mb-2 text-sm font-medium text-gray-900">Status Rumah</label>
                                <select name="status_rumah" id="status_rumah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
                                    <option value="sendiri">Sendiri</option>
                                    <option value="sewa">Sewa</option>
                                    <option value="kontrak">Kontrak</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="tanggungan_listrik" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Listrik</label>
                                <input type="number" name="tanggungan_listrik" id="tanggungan_listrik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div className="sm:col-span-2">
                                <label htmlFor="tanggungan_air" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Air</label>
                                <input type="number" name="tanggungan_air" id="tanggungan_air" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Buat Data Orang Tua
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

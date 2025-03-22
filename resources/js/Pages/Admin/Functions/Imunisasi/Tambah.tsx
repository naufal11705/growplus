import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import Layout from "@/Layouts/Admin";

interface Puskesmas {
    puskesmas_id: number;
    nama: string;
}

import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface PageProps extends InertiaPageProps {
    puskesmas: Puskesmas[];
}

export default function Imunisasi() {
    const { puskesmas } = usePage<PageProps>().props;
    const [selectedPuskesmas, setSelectedPuskesmas] = useState("");

    const csrf_token = useCsrfToken();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("_token", csrf_token);

        router.post('/admin/imunisasi', formData);
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Tambah Data Imunisasi</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                            {/* Nama Vaksin */}
                            <div className="sm:col-span-2">
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Vaksin</label>
                                <input type="text" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nama vaksin..." required />
                            </div>

                            {/* Jenis Vaksin */}
                            <div>
                                <label htmlFor="jenis" className="block mb-2 text-sm font-medium text-gray-900">Jenis Vaksin</label>
                                <input type="text" name="jenis" id="jenis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan jenis vaksin..." required />
                            </div>

                            {/* Puskesmas */}
                            <div>
                                <label htmlFor="puskesmas_id" className="block mb-2 text-sm font-medium text-gray-900">Puskesmas</label>
                                <select
                                    id="puskesmas_id"
                                    name="puskesmas_id"
                                    value={selectedPuskesmas}
                                    onChange={(e) => setSelectedPuskesmas(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Puskesmas</option>
                                    {puskesmas?.map((item: Puskesmas) => (
                                        <option key={item.puskesmas_id} value={item.puskesmas_id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Usia Minimum */}
                            <div>
                                <label htmlFor="usia_minimum" className="block mb-2 text-sm font-medium text-gray-900">Usia Minimum (bulan)</label>
                                <input type="number" name="usia_minimum" id="usia_minimum" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Usia minimum dalam bulan" required min="0" />
                            </div>

                            {/* Usia Maksimum */}
                            <div>
                                <label htmlFor="usia_maksimum" className="block mb-2 text-sm font-medium text-gray-900">Usia Maksimum (bulan)</label>
                                <input type="number" name="usia_maksimum" id="usia_maksimum" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Usia maksimum dalam bulan" required min="0" />
                            </div>

                            {/* Tanggal Imunisasi */}
                            <div className="sm:col-span-2">
                                <label htmlFor="tanggal" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Imunisasi</label>
                                <input type="date" name="tanggal" id="tanggal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>

                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Tambah Imunisasi
                            </button>
                            <a href="/admin/imunisasi">
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

import Layout from "@/Layouts/Layout";
import { usePage } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { useState } from "react";
import OrangTua from "./Edit";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface Anak {
    id: number;
}

interface OrangTua {
    orangtua_id: number;
    nama: string;
}

interface PageProps extends InertiaPageProps {
    orangtua: OrangTua[];
}

export default function Anak() {
    const { orangtua } = usePage<PageProps>().props;
    const [selectedOrangTua, setSelectedOrangTua] = useState("");
    const csrf_token = useCsrfToken();
    const [anakList, setAnakList] = useState<Anak[]>([{ id: 1 }]);

    const tambahDataAnak = () => {
        const newId = Math.max(...anakList.map(item => item.id)) + 1;
        setAnakList([...anakList, { id: newId }]);
    }

    const hapusDataAnak = (idToRemove: number) => {
        if (anakList.length > 1 && idToRemove !== 1) {
            setAnakList(anakList.filter(item => item.id !== idToRemove));
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("_token", csrf_token);
        formData.append("orangtua_id", orangtua[0].orangtua_id.toString());
    
        anakList.forEach((item, index) => {
            formData.append(`children[${index}][nama]`, e.currentTarget[`nama_${item.id}`].value);
            formData.append(`children[${index}][nik]`, e.currentTarget[`nik_${item.id}`].value);
            formData.append(`children[${index}][no_jkn]`, e.currentTarget[`no_jkn_${item.id}`].value);
            formData.append(`children[${index}][tempat_lahir]`, e.currentTarget[`tempat_lahir_${item.id}`].value);
            formData.append(`children[${index}][tanggal_lahir]`, e.currentTarget[`tanggal_lahir_${item.id}`].value);
            formData.append(`children[${index}][golongan_darah]`, e.currentTarget[`golongan_darah_${item.id}`].value);
            formData.append(`children[${index}][berat_badan]`, e.currentTarget[`berat_badan_${item.id}`].value);
            formData.append(`children[${index}][tinggi_badan]`, e.currentTarget[`tinggi_badan_${item.id}`].value);
        });
    
        router.post('/profil/anak', formData);
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Buat Data Anak</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            {/* <div className="sm:col-span-2">
                                <label htmlFor="orangtua_id" className="block mb-2 text-sm font-medium text-gray-900">Orang Tua</label>
                                <select
                                    id="orangtua_id"
                                    name="orangtua_id"
                                    value={selectedOrangTua}
                                    onChange={(e) => setSelectedOrangTua(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Orang Tua</option>
                                    {orangtua?.map((item: OrangTua) => (
                                        <option key={item.orangtua_id} value={item.orangtua_id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>

                            </div> */}
                            {anakList.map((item, index) => (
                                <div key={item.id} className="sm:col-span-3 relative">
                                    <hr className="h-px my-2 bg-gray-200 border-0 sm:col-span-2" />
                                    <div className="flex justify-between items-center mt-5">
                                        <h1 className="text-xl font-bold sm:col-span-2">Data Anak {index + 1}</h1>
                                        {item.id !== 1 && (
                                            <button type="button" onClick={() => hapusDataAnak(item.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`nama_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                        <input type="text" name={`nama_${item.id}`} id={`nama_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`nik_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                                        <input type="text" onInput={(e) => {const target = e.target as HTMLInputElement; target.value = target.value.replace(/\D/g, '');}} inputMode="numeric" pattern="\d*" maxLength={16} name={`nik_${item.id}`} id={`nik_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`no_jkn_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Nomor JKN</label>
                                        <input type="text" onInput={(e) => {const target = e.target as HTMLInputElement; target.value = target.value.replace(/\D/g, '');}} inputMode="numeric" pattern="\d*" maxLength={13} name={`no_jkn_${item.id}`} id={`no_jkn_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`tempat_lahir_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                                        <input type="text" name={`tempat_lahir_${item.id}`} id={`tempat_lahir_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`tanggal_lahir_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                        <input type="date" name={`tanggal_lahir_${item.id}`} id={`tanggal_lahir_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`golongan_darah_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                                        <input type="text" name={`golongan_darah_${item.id}`} id={`golongan_darah_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`berat_badan_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Berat Badan (kg)</label>
                                        <input type="number" name={`berat_badan_${item.id}`} id={`berat_badan_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor={`tinggi_badan_${item.id}`} className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan (cm)</label>
                                        <input type="number" name={`tinggi_badan_${item.id}`} id={`tinggi_badan_${item.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Buat Data Anak
                            </button>
                            <button onClick={tambahDataAnak} type="button" className="px-5 py-3 text-sm font-medium text-center text-black bg-white rounded-xl hover:bg-gray-100 border">
                                Tambah Data Anak
                            </button>
                            <a href="/profil">
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
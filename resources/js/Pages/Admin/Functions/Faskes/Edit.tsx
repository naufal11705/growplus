import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

interface Faskes {
    faskes_id: number,
    orangtua_id: number,
    puskesmas_id: number,
    no_reg_kohort_ibu: number,
    no_reg_kohort_anak: number,
}

interface Puskesmas {
    puskesmas_id: number;
    nama: string;
}

interface Orangtua {
    orangtua_id: number;
    nik: string;
}

interface PageProps extends InertiaPageProps {
    faskes: Faskes;
    puskesmas: Puskesmas[];
    orangtua: Orangtua[];
}

export default function Faskes() {
    const { faskes, orangtua, puskesmas } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [selectedPuskesmas, setSelectedPuskesmas] = useState<string>(
        faskes.puskesmas_id ? faskes.puskesmas_id.toString() : ""
    );

    const [selectedOrangtua, setSelectedOrangtua] = useState<string>(
        faskes.orangtua_id ? faskes.orangtua_id.toString() : ""
    );

    const [formData, setFormData] = useState<Faskes>({ ...faskes });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        router.put(`/admin/faskes/${formData.faskes_id}`, {
            _token: csrf_token,
            orangtua_id: formData.orangtua_id,
            puskesmas_id: formData.puskesmas_id,
            no_reg_kohort_ibu: formData.no_reg_kohort_ibu,
            no_reg_kohort_anak: formData.no_reg_kohort_anak,
        });
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Fasilitas Kesehatan</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            
                            {/* Orang Tua */}
                            <div>
                                <label htmlFor="orangtua_id" className="block mb-2 text-sm font-medium text-gray-900">Orang Tua</label>
                                <select 
                                    id="orangtua_id" 
                                    name="orangtua_id" 
                                    value={selectedOrangtua} 
                                    onChange={(e) => setSelectedOrangtua(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Orqangtua</option>
                                    {orangtua?.map((item: Orangtua) => (
                                        <option key={item.orangtua_id} value={item.orangtua_id}>
                                            {item.nik}
                                        </option>
                                    ))}
                                </select>
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

                            {/* Nomor Registrasi Kohort Ibu */}
                            <div className="sm:col-span-2">
                                <label htmlFor="no_reg_kohort_ibu" className="block mb-2 text-sm font-medium text-gray-900">Nomor Registrasi Kohort Ibu</label>
                                <input value={formData.no_reg_kohort_ibu} onChange={handleChange} type="text" name="no_reg_kohort_ibu" id="no_reg_kohort_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nomor registrasi kohort ibu..." required />
                            </div>

                            {/* Nomor Registrasi Kohort Anak */}
                            <div className="sm:col-span-2">
                                <label htmlFor="no_reg_kohort_anak" className="block mb-2 text-sm font-medium text-gray-900">Nomor Registrasi Kohort Anak</label>
                                <input value={formData.no_reg_kohort_anak} onChange={handleChange} type="text" name="no_reg_kohort_anak" id="no_reg_kohort_anak" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan nomor registrasi kohort anak..." required />
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

import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

interface Tantangan {
    tantangan_id: number;
    activity: string;
    fase_id: number;
    point: number;
    status: string;
}

interface Fase {
    fase_id: number;
    title: string;
}

interface PageProps extends InertiaPageProps {
    fase: Fase[];
    tantangan: Tantangan;
}

export default function Tantangan() {
    const { tantangan, fase } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [selectedStatus, setSelectedStatus] = useState<string>(tantangan.status);

    // State untuk form
    const [selectedFase, setSelectedFase] = useState<string>(
        tantangan.fase_id ? tantangan.fase_id.toString() : ""
    );
    const [formData, setFormData] = useState<Tantangan>({ ...tantangan });

    console.log("Data yang dikirim:", {
        _token: csrf_token,
        fase_id: selectedFase,
        activity: formData.activity,
        point: formData.point,
        status: selectedStatus,
    });

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Data yang dikirim:", {
            _token: csrf_token,
            fase_id: selectedFase,
            activity: formData.activity,
            point: formData.point,
            status: selectedStatus,
        });

        router.put(`/admin/tantangan/${formData.tantangan_id}`, {
            _token: csrf_token,
            activity: formData.activity,
            fase_id: selectedFase,
            point: formData.point,
            status: selectedStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Berhasil update tantangan");
            },
            onError: (errors) => {
                console.error("Terjadi error:", errors);
            }
        });

    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Tantangan</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                            {/* Nama Tantangan */}
                            <div className="">
                                <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900">Judul Tantangan</label>
                                <input value={formData.activity} onChange={handleChange} type="text" name="activity" id="activity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis judul tantangan di sini..." required />
                            </div>

                            {/* Fase */}

                            <div>
                                <label htmlFor="fase_id" className="block mb-2 text-sm font-medium text-gray-900">Fase</label>
                                <select
                                    id="fase_id"
                                    name="fase_id"
                                    value={selectedFase}
                                    onChange={(e) => setSelectedFase(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Pilih Fase</option>
                                    {fase?.map((item: Fase) => (
                                        <option key={item.fase_id} value={item.fase_id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Poin Tantangan */}
                            <div>
                                <label htmlFor="point" className="block mb-2 text-sm font-medium text-gray-900">Poin</label>
                                <input value={formData.point} onChange={handleChange} type="number" name="point" id="point" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan jumlah poin" required min="1" />
                            </div>

                            {/* Status Tantangan */}
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} id="status" name="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Tantangan
                            </button>
                            <a href="/admin/tantangan">
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

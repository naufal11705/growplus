import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminAlert from "@/Components/Widget/Alert/AdminAlert"; 

interface Fase {
    fase_id: number;
    judul: string;
    deskripsi: string;
    benefits: string;
    banner: string;
    progress: number;
    status: string;
}

interface PageProps extends InertiaPageProps {
    fase: Fase;
}

export default function Fase() {
    const { fase } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [selectedStatus, setSelectedStatus] = useState<string>(fase.status);
    const [formData, setFormData] = useState<Fase>({ ...fase });
    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(fase.banner);

    // State untuk alert
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning'; message: string; visible: boolean }>({
        type: 'success',
        message: '',
        visible: false,
    });

    // Fungsi untuk menampilkan alert
    const setSuccess = (message: string) => setAlert({ type: 'success', message, visible: true });
    const setError = (message: string) => setAlert({ type: 'error', message, visible: true });
    const setWarning = (message: string) => setAlert({ type: 'warning', message, visible: true });

    // Fungsi untuk menutup alert
    const closeAlert = () => setAlert({ ...alert, visible: false });

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setBanner(e.target.files[0]);
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(imageUrl);
        }
    };

    // Handle submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_token', csrf_token);
        data.append('_method', 'PUT');
        data.append('judul', formData.judul);
        data.append('deskripsi', formData.deskripsi);
        data.append('benefits', formData.benefits);
        data.append('progress', formData.progress.toString());
        data.append('status', selectedStatus);

        if (banner) {
            data.append('banner', banner);
        }

        try {
            await router.post(`/admin/fase/${formData.fase_id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    setSuccess("Fase berhasil diperbarui!");
                },
                onError: (errors) => {
                    setError("Gagal memperbarui fase. Periksa kembali data yang diinput.");
                    console.error("❌ Terjadi kesalahan saat update:", errors);
                },
            });
        } catch (error) {
            setError("Terjadi kesalahan tidak terduga. Coba lagi nanti.");
            console.error("❌ Kesalahan tidak terduga:", error);
        }
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Fase</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900">Judul Fase</label>
                                <input value={formData.judul} onChange={handleChange} type="text" name="judul" id="judul" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tulis judul di sini..." required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                                <textarea value={formData.deskripsi} onChange={handleChange} id="deskripsi" name="deskripsi" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis deskripsi di sini..." required></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="benefits" className="block mb-2 text-sm font-medium text-gray-900">Manfaat</label>
                                <textarea value={formData.benefits} onChange={handleChange} id="benefits" name="benefits" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Tulis manfaat fase di sini..." required></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Banner Saat Ini</label>
                                <img src={`${window.location.origin}/storage/${formData.banner}`} alt="Banner" className="w-full max-w-xs rounded-lg" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Banner</label>
                                <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" name="banner" id="banner" type="file" />
                            </div>
                            <div>
                                <label htmlFor="progress" className="block mb-2 text-sm font-medium text-gray-900">Progress (%)</label>
                                <input value={formData.progress} onChange={handleChange} type="number" name="progress" id="progress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0-100" required min="0" max="100" />
                            </div>
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
                                Update Fase
                            </button>
                            <a href="/admin/fase">
                                <button type="button" className="px-5 py-3 text-sm font-medium text-center text-gray-900 bg-white rounded-xl hover:bg-gray-100 border border-gray-200">
                                    Kembali
                                </button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Tampilkan AdminAlert jika visible true */}
            {alert.visible && (
                <AdminAlert type={alert.type} message={alert.message} onClose={closeAlert} />
            )}
        </Layout>
    );
}
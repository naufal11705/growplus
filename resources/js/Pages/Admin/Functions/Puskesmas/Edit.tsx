import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminAlert from "@/Components/Widget/Alert/AdminAlert"; 


interface Puskesmas {
    puskesmas_id: number;
    nama: string;
    alamat: string;
    kecamatan: string;
    kota: string;
    kontak: number;
}

interface PageProps extends InertiaPageProps {
    puskesmas: Puskesmas;
}

export default function Puskesmas() {
    const { puskesmas } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    // State untuk form
    const [formData, setFormData] = useState<Puskesmas>({ ...puskesmas });

    // State untuk alert
    const [alert, setAlert] = useState<{ type: "success" | "error" | "warning"; message: string; visible: boolean }>({
        type: "success",
        message: "",
        visible: false,
    });

    // Fungsi untuk menampilkan alert
    const setSuccess = (message: string) => setAlert({ type: "success", message, visible: true });
    const setError = (message: string) => setAlert({ type: "error", message, visible: true });
    const setWarning = (message: string) => setAlert({ type: "warning", message, visible: true });

    // Fungsi untuk menutup alert
    const closeAlert = () => setAlert({ ...alert, visible: false });

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

        router.put(
            `/admin/puskesmas/${formData.puskesmas_id}`,
            {
                _token: csrf_token,
                nama: formData.nama,
                alamat: formData.alamat,
                kecamatan: formData.kecamatan,
                kota: formData.kota,
                kontak: formData.kontak,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess("Data puskesmas berhasil diperbarui!");
                },
                onError: (errors) => {
                    setError("Gagal memperbarui data puskesmas. Periksa kembali data yang diinput.");
                    console.error("Terjadi error:", errors);
                },
            }
        );
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Puskesmas</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            {/* Nama Puskesmas */}
                            <div className="sm:col-span-2">
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Puskesmas</label>
                                <input
                                    value={formData.nama}
                                    onChange={handleChange}
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Tulis nama puskesmas di sini..."
                                    required
                                />
                            </div>

                            {/* Alamat */}
                            <div className="sm:col-span-2">
                                <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                                <textarea
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    id="alamat"
                                    name="alamat"
                                    rows={3}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Tulis alamat puskesmas..."
                                    required
                                ></textarea>
                            </div>

                            {/* Kecamatan */}
                            <div>
                                <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900">Kecamatan</label>
                                <input
                                    value={formData.kecamatan}
                                    onChange={handleChange}
                                    type="text"
                                    name="kecamatan"
                                    id="kecamatan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan kecamatan"
                                    required
                                />
                            </div>

                            {/* Kota */}
                            <div>
                                <label htmlFor="kota" className="block mb-2 text-sm font-medium text-gray-900">Kota</label>
                                <input
                                    value={formData.kota}
                                    onChange={handleChange}
                                    type="text"
                                    name="kota"
                                    id="kota"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan kota"
                                    required
                                />
                            </div>

                            {/* Kontak */}
                            <div className="sm:col-span-2">
                                <label htmlFor="kontak" className="block mb-2 text-sm font-medium text-gray-900">Kontak</label>
                                <input
                                    value={formData.kontak}
                                    onChange={handleChange}
                                    type="number"
                                    name="kontak"
                                    id="kontak"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan nomor telepon atau kontak puskesmas"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Puskesmas
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

            {/* Tampilkan AdminAlert jika visible true */}
            {alert.visible && (
                <AdminAlert type={alert.type} message={alert.message} onClose={closeAlert} />
            )}
        </Layout>
    );
}
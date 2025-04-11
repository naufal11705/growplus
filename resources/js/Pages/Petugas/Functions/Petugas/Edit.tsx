import Layout from "@/Layouts/Petugas";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminAlert from "@/Components/Widget/Alert/AdminAlert"; 


interface Imunisasi {
    imunisasi_id: number;
    nama: string;
    jenis: string;
    usia_minimum: number;
    usia_maksimum: number;
    puskesmas_id: number;
    tanggal: string;
}

interface Puskesmas {
    puskesmas_id: number;
    nama: string;
}

interface PageProps extends InertiaPageProps {
    imunisasi: Imunisasi;
    puskesmas: Puskesmas[];
}

export default function Imunisasi() {
    const { imunisasi, puskesmas } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    // State untuk form
    const [selectedPuskesmas, setSelectedPuskesmas] = useState<string>(
        imunisasi.puskesmas_id ? imunisasi.puskesmas_id.toString() : ""
    );
    const [formData, setFormData] = useState<Imunisasi>({ ...imunisasi });

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "puskesmas_id") {
            setSelectedPuskesmas(value);
        }
    };

    // Handle submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.put(
            `/petugas/imunisasi/${formData.imunisasi_id}`,
            {
                _token: csrf_token,
                nama: formData.nama,
                jenis: formData.jenis,
                usia_minimum: formData.usia_minimum,
                usia_maksimum: formData.usia_maksimum,
                puskesmas_id: selectedPuskesmas,
                tanggal: formData.tanggal,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess("Data imunisasi berhasil diperbarui!");
                },
                onError: (errors) => {
                    setError("Gagal memperbarui data imunisasi. Periksa kembali data yang diinput.");
                    console.error("Terjadi error:", errors);
                },
            }
        );
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Imunisasi</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            {/* Nama Vaksin */}
                            <div className="sm:col-span-2">
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Vaksin</label>
                                <input
                                    value={formData.nama}
                                    onChange={handleChange}
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan nama vaksin..."
                                    required
                                />
                            </div>

                            {/* Jenis Vaksin */}
                            <div>
                                <label htmlFor="jenis" className="block mb-2 text-sm font-medium text-gray-900">Jenis Vaksin</label>
                                <input
                                    value={formData.jenis}
                                    onChange={handleChange}
                                    type="text"
                                    name="jenis"
                                    id="jenis"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Masukkan jenis vaksin..."
                                    required
                                />
                            </div>

                            {/* Puskesmas */}
                            <div>
                                <label htmlFor="puskesmas_id" className="block mb-2 text-sm font-medium text-gray-900">Puskesmas</label>
                                <select
                                    id="puskesmas_id"
                                    name="puskesmas_id"
                                    value={selectedPuskesmas}
                                    onChange={handleChange}
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
                                <input
                                    value={formData.usia_minimum}
                                    onChange={handleChange}
                                    type="number"
                                    name="usia_minimum"
                                    id="usia_minimum"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Usia minimum dalam bulan"
                                    required
                                    min="0"
                                />
                            </div>

                            {/* Usia Maksimum */}
                            <div>
                                <label htmlFor="usia_maksimum" className="block mb-2 text-sm font-medium text-gray-900">Usia Maksimum (bulan)</label>
                                <input
                                    value={formData.usia_maksimum}
                                    onChange={handleChange}
                                    type="number"
                                    name="usia_maksimum"
                                    id="usia_maksimum"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Usia maksimum dalam bulan"
                                    required
                                    min="0"
                                />
                            </div>

                            {/* Tanggal Imunisasi */}
                            <div className="sm:col-span-2">
                                <label htmlFor="tanggal" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Imunisasi</label>
                                <input
                                    value={formData.tanggal}
                                    onChange={handleChange}
                                    type="date"
                                    name="tanggal"
                                    id="tanggal"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Imunisasi
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

            {/* Tampilkan AdminAlert jika visible true */}
            {alert.visible && (
                <AdminAlert type={alert.type} message={alert.message} onClose={closeAlert} />
            )}
        </Layout>
    );
}
import Layout from "@/Layouts/Layout";
import useCsrfToken from "@/Utils/csrfToken";
import { router, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { useState, useEffect } from "react";
import AdminAlert from "@/Components/Widget/Alert/AdminAlert";

interface Anak {
    anak_id: number;
    orangtua_id: number;
    nama: string;
    nik: number;
    no_jkn: number;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    berat_badan: number;
    tinggi_badan: number;
}

interface OrangTua {
    orangtua_id: number;
    nama: string;
}

interface PageProps extends InertiaPageProps {
    orangtua: OrangTua[];
    anak: Anak;
    flash?: { success?: string; error?: string };
}

export default function Anak() {
    const { anak, orangtua, flash } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [selectedOrangTua, setSelectedOrangTua] = useState<string>(
        anak.orangtua_id ? anak.orangtua_id.toString() : ""
    );
    const [formData, setFormData] = useState<Anak>({ ...anak });

    // State untuk alert
    const [alert, setAlert] = useState<{
        type: "success" | "error" | "warning" | "confirm";
        message: string;
        visible: boolean;
    }>({
        type: "success",
        message: "",
        visible: false,
    });

    const [pendingUpdate, setPendingUpdate] = useState<boolean>(false);

    // Consume flash message dari controller
    useEffect(() => {
        if (flash?.success) {
            setAlert({ type: "success", message: flash.success, visible: true });
        } else if (flash?.error) {
            setAlert({ type: "error", message: flash.error, visible: true });
        }
    }, [flash]);

    const closeAlert = () => setAlert({ ...alert, visible: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "orangtua_id") setSelectedOrangTua(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData)
        setAlert({
            type: "confirm",
            message: "Update Perubahan?",
            visible: true,
        });
        setPendingUpdate(true);
    };

    const confirmUpdate = () => {
        if (pendingUpdate) {
            router.put(
                `/profil/anak/${formData.anak_id}`,
                {
                    _token: csrf_token,
                    orangtua_id: selectedOrangTua,
                    nama: formData.nama,
                    nik: formData.nik,
                    no_jkn: formData.no_jkn,
                    tempat_lahir: formData.tempat_lahir,
                    tanggal_lahir: formData.tanggal_lahir,
                    golongan_darah: formData.golongan_darah,
                    berat_badan: formData.berat_badan,
                    tinggi_badan: formData.tinggi_badan,
                },
                {
                    preserveScroll: true,
                    onError: (errors) => {
                        setAlert({
                            type: "error",
                            message: "Gagal memperbarui data anak. Periksa kembali data yang diinput.",
                            visible: true,
                        });
                        console.error("Terjadi error:", errors);
                    },
                }
            );
        }
        setPendingUpdate(false);
        closeAlert();
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Anak</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            {/* <div className="sm:col-span-2">
                                <label htmlFor="orangtua_id" className="block mb-2 text-sm font-medium text-gray-900">Orang Tua</label>
                                <select
                                    id="orangtua_id"
                                    name="orangtua_id"
                                    value={selectedOrangTua}
                                    onChange={handleChange}
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
                            <div className="mt-5">
                                <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                                <input
                                    value={formData.nama}
                                    onChange={handleChange}
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                                <input
                                    value={formData.nik}
                                    onChange={handleChange}
                                    type="text"
                                    name="nik"
                                    id="nik"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="no_jkn" className="block mb-2 text-sm font-medium text-gray-900">Nomor JKN</label>
                                <input
                                    value={formData.no_jkn}
                                    onChange={handleChange}
                                    type="text"
                                    name="no_jkn"
                                    id="no_jkn"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="tempat_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                                <input
                                    value={formData.tempat_lahir}
                                    onChange={handleChange}
                                    type="text"
                                    name="tempat_lahir"
                                    id="tempat_lahir"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <input
                                    value={formData.tanggal_lahir}
                                    onChange={handleChange}
                                    type="date"
                                    name="tanggal_lahir"
                                    id="tanggal_lahir"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="golongan_darah" className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                                <input
                                    value={formData.golongan_darah}
                                    onChange={handleChange}
                                    type="text"
                                    name="golongan_darah"
                                    id="golongan_darah"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="berat_badan" className="block mb-2 text-sm font-medium text-gray-900">Berat Badan (kg)</label>
                                <input
                                    value={formData.berat_badan}
                                    onChange={handleChange}
                                    type="number"
                                    name="berat_badan"
                                    id="berat_badan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="tinggi_badan" className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan (cm)</label>
                                <input
                                    value={formData.tinggi_badan}
                                    onChange={handleChange}
                                    type="number"
                                    name="tinggi_badan"
                                    id="tinggi_badan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Data Anak
                            </button>
                            <a href="/admin/anak">
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
                <AdminAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={closeAlert}
                    onConfirm={alert.type === 'confirm' ? confirmUpdate : undefined}
                />
            )}
        </Layout>
    );
}
import Layout from "@/Layouts/Admin";
import useCsrfToken from "@/Utils/csrfToken";
import { router } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminAlert from "@/Components/Widget/Alert/AdminAlert"; 


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

interface PageProps extends InertiaPageProps {
    orangtua: OrangTua;
    pengguna: Pengguna[];
}

export default function OrangTua() {
    const { orangtua, pengguna } = usePage<PageProps>().props;
    const csrf_token = useCsrfToken();

    const [selectedPengguna, setSelectedPengguna] = useState<string>(
        orangtua.pengguna_id ? orangtua.pengguna_id.toString() : ""
    );
    const [selectedStatusRumah, setSelectedStatusRumah] = useState<string>(orangtua.status_rumah);
    const [formData, setFormData] = useState<OrangTua>({ ...orangtua });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "pengguna_id") {
            setSelectedPengguna(value);
        } else if (name === "status_rumah") {
            setSelectedStatusRumah(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.put(
            `/admin/orangtua/${formData.orangtua_id}`,
            {
                _token: csrf_token,
                pengguna_id: selectedPengguna,
                nama: formData.nama,
                nik: formData.nik,
                no_jkn: formData.no_jkn,
                tempat_lahir: formData.tempat_lahir,
                tanggal_lahir: formData.tanggal_lahir,
                golongan_darah: formData.golongan_darah,
                alamat: formData.alamat,
                pekerjaan: formData.pekerjaan,
                penghasilan: formData.penghasilan,
                sumber_penghasilan: formData.sumber_penghasilan,
                jumlah_tanggungan: formData.jumlah_tanggungan,
                status_rumah: selectedStatusRumah,
                tanggungan_listrik: formData.tanggungan_listrik,
                tanggungan_air: formData.tanggungan_air,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess("Data orang tua berhasil diperbarui!");
                },
                onError: (errors) => {
                    setError("Gagal memperbarui data orang tua. Periksa kembali data yang diinput.");
                    console.error("Terjadi error:", errors);
                },
            }
        );
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Update Data Orang Tua</h2> {/* Judul diperbaiki dari "Buat" ke "Update" */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div>
                                <label htmlFor="pengguna_id" className="block mb-2 text-sm font-medium text-gray-900">Pengguna</label>
                                <select
                                    id="pengguna_id"
                                    name="pengguna_id"
                                    value={selectedPengguna}
                                    onChange={handleChange}
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
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
                            <div className="sm:col-span-2">
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
                            <div className="sm:col-span-2">
                                <label htmlFor="alamat" className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                                <textarea
                                    value={formData.alamat}
                                    onChange={handleChange}
                                    name="alamat"
                                    id="alamat"
                                    rows={3}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="pekerjaan" className="block mb-2 text-sm font-medium text-gray-900">Pekerjaan</label>
                                <input
                                    value={formData.pekerjaan}
                                    onChange={handleChange}
                                    type="text"
                                    name="pekerjaan"
                                    id="pekerjaan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Penghasilan</label>
                                <input
                                    value={formData.penghasilan}
                                    onChange={handleChange}
                                    type="number"
                                    name="penghasilan"
                                    id="penghasilan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="sumber_penghasilan" className="block mb-2 text-sm font-medium text-gray-900">Sumber Penghasilan</label>
                                <input
                                    value={formData.sumber_penghasilan}
                                    onChange={handleChange}
                                    type="text"
                                    name="sumber_penghasilan"
                                    id="sumber_penghasilan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jumlah_tanggungan" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Tanggungan</label>
                                <input
                                    value={formData.jumlah_tanggungan}
                                    onChange={handleChange}
                                    type="number"
                                    name="jumlah_tanggungan"
                                    id="jumlah_tanggungan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="status_rumah" className="block mb-2 text-sm font-medium text-gray-900">Status Rumah</label>
                                <select
                                    value={selectedStatusRumah}
                                    onChange={handleChange}
                                    id="status_rumah"
                                    name="status_rumah"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                >
                                    <option value="sendiri">Sendiri</option>
                                    <option value="sewa">Sewa</option>
                                    <option value="kontrak">Kontrak</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tanggungan_listrik" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Listrik</label>
                                <input
                                    value={formData.tanggungan_listrik}
                                    onChange={handleChange}
                                    type="number"
                                    name="tanggungan_listrik"
                                    id="tanggungan_listrik"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="tanggungan_air" className="block mb-2 text-sm font-medium text-gray-900">Tanggungan Air</label>
                                <input
                                    value={formData.tanggungan_air}
                                    onChange={handleChange}
                                    type="number"
                                    name="tanggungan_air"
                                    id="tanggungan_air"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                                Update Data Orang Tua
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

            {/* Tampilkan AdminAlert jika visible true */}
            {alert.visible && (
                <AdminAlert type={alert.type} message={alert.message} onClose={closeAlert} />
            )}
        </Layout>
    );
}
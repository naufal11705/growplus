import AdminAlert from "@/Components/Widget/Alert/AdminAlert";
import Layout from "@/Layouts/Layout";
import useCsrfToken from "@/Utils/csrfToken";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

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
    jenis_kelamin: string;
    sudah_lahir: number;
    tanggal_terakhir_menstruasi: Date;
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

interface ReferenceData {
    [key: number]: { median: number; sd: number };
}

const referenceData: { "Laki-Laki": ReferenceData; "Perempuan": ReferenceData } = {
    "Laki-Laki": {
        0: { median: 3.3, sd: 0.4 },
        1: { median: 4.5, sd: 0.5 },
        2: { median: 5.6, sd: 0.6 },
        3: { median: 6.4, sd: 0.7 },
        4: { median: 7.0, sd: 0.8 },
        5: { median: 7.5, sd: 0.8 },
        6: { median: 7.9, sd: 0.9 },
        7: { median: 8.3, sd: 0.9 },
        8: { median: 8.6, sd: 0.9 },
        9: { median: 8.9, sd: 1.0 },
        10: { median: 9.2, sd: 1.0 },
        11: { median: 9.4, sd: 1.0 },
        12: { median: 9.6, sd: 1.0 },
        24: { median: 12.2, sd: 1.2 },
        36: { median: 14.3, sd: 1.4 },
        48: { median: 16.3, sd: 1.6 },
        60: { median: 18.3, sd: 1.8 },
    },
    "Perempuan": {
        0: { median: 3.2, sd: 0.4 },
        1: { median: 4.2, sd: 0.5 },
        2: { median: 5.1, sd: 0.6 },
        3: { median: 5.8, sd: 0.7 },
        4: { median: 6.4, sd: 0.7 },
        5: { median: 6.9, sd: 0.8 },
        6: { median: 7.3, sd: 0.8 },
        7: { median: 7.7, sd: 0.9 },
        8: { median: 8.0, sd: 0.9 },
        9: { median: 8.3, sd: 0.9 },
        10: { median: 8.6, sd: 1.0 },
        11: { median: 8.9, sd: 1.0 },
        12: { median: 8.9, sd: 1.0 },
        24: { median: 11.5, sd: 1.2 },
        36: { median: 13.9, sd: 1.4 },
        48: { median: 16.1, sd: 1.6 },
        60: { median: 18.2, sd: 1.9 },
    },
};

export default function Anak() {
    const { anak, orangtua, flash } = usePage<PageProps>().props;
    const [formData, setFormData] = useState<Anak>({ ...anak });
    const [weight, setWeight] = useState<number | string>(formData.berat_badan || ""); const [result, setResult] = useState<string | null>(null);
    const [usia, setUsia] = useState<number | "">("");
    const [resultStatus, setResultStatus] = useState<string>("");
    const csrf_token = useCsrfToken();

    const calculateAge = () => {
        const tanggal_lahir = new Date(formData.tanggal_lahir);
        const today = new Date();
        const months = (today.getFullYear() - tanggal_lahir.getFullYear()) * 12 + (today.getMonth() - tanggal_lahir.getMonth());

        setUsia(months >= 0 ? months : "");
        console.log("Usia dalam bulan:", months);
        return months >= 0 ? months : 0;
    }

    const calculateWeightStatus = () => {
        const weightNum = Number(weight);
        const usiaNum = Number(calculateAge());

        console.log("Usia:", usiaNum);
        const genderData = referenceData[Number(formData.jenis_kelamin) === 1 ? "Laki-Laki" : "Perempuan"];

        let referenceAge: number;
        if (usiaNum <= 12) {
            referenceAge = Math.round(usiaNum);
        } else {
            const yearInMonths = Math.round(usiaNum / 12) * 12;
            referenceAge = Math.min(Math.max(12, yearInMonths), 60);
        }

        const { median, sd } = genderData[referenceAge] || { median: 0, sd: 0 };
        if (median === 0 || sd === 0) {
            setResult("Data referensi untuk usia ini tidak tersedia.");
            return;
        }

        const zScore = (weightNum - median) / sd;
        console.log("Berat:", weightNum);
        console.log("Median:", median);
        console.log("SD:", sd);
        console.log("Z-Score:", zScore);

        let status: string;
        if (zScore < -3) {
            status = "Berat badan sangat kurang";
        } else if (zScore >= -3 && zScore < -2) {
            status = "Berat badan kurang";
        } else if (zScore >= -2 && zScore <= 1) {
            status = "Berat badan normal";
        } else {
            status = "Risiko berat badan lebih";
        }

        setResult(`${status}`);
        setResultStatus(status);
        console.log("Status berat badan:", status);
    };

    const [selectedOrangTua, setSelectedOrangTua] = useState<string>(
        anak.orangtua_id ? anak.orangtua_id.toString() : ""
    );
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
                    jenis_kelamin: formData.jenis_kelamin,
                    sudah_lahir: 1,
                    tanggal_terakhir_menstruasi: formData.tanggal_terakhir_menstruasi,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setAlert({
                            type: "success",
                            message: "Data berhasil diperbarui!",
                            visible: true,
                        });
                        console.log("Data successfully updated");
                    },
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
                                    value={weight}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const newWeight = value === "" ? "" : Number(value);
                                        setWeight(newWeight);
                                        setFormData((prev) => ({
                                            ...prev,
                                        }));
                                    }}
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
                            <div className="mt-5">
                                <label htmlFor="jenis_kelamin" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                <input
                                    value={Number(formData.jenis_kelamin) === 1 ? "Laki-Laki" : "Perempuan"}
                                    onChange={handleChange}
                                    type="text"
                                    name="jenis_kelamin"
                                    id="jenis_kelamin"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={calculateWeightStatus} type="submit" className="px-5 py-3 text-sm font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
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
                    message={`Update Perubahan? Status berat badan: ${result}`}
                    onClose={closeAlert}
                    onConfirm={alert.type === 'confirm' ? confirmUpdate : undefined}
                />
            )}
        </Layout>
    );
}

import Stepper from "@/Components/Widget/Stepper";
import { useState } from "react";
import Layout from "@/Layouts/Auth";
import DataAnak from "./Data/DataAnak";
import DataOrangtua from "./Data/DataOrangtua";
import { router } from "@inertiajs/react";

export default function RegisterStep() {
    const [step, setStep] = useState(1);
    const [dataOrangtua, setDataOrangtua] = useState<any>({});
    const [dataAnak, setDataAnak] = useState<any[]>([]);

    const handleNextKeluarga = (data: any) => {
        setDataOrangtua(data);
        setStep(2);
    };

    const handleNextAnak = (childrenData: any) => {
        setDataAnak(childrenData);
        setStep(3);
    };

    const handleBackToOrangtua = () => {
        setStep(1); // Kembali ke form orang tua
    };

    const handleBackToAnak = () => {
        setStep(2); // Kembali ke form anak
    };

    const handleFinalSubmit = async () => {
        const finalData = {
            orangtua: dataOrangtua,
            anak: dataAnak,
        };

        router.post("/register-step", finalData, {
            onSuccess: () => console.log("Success!"),
            onError: (errors) => console.log("Error:", errors),
        });
    };

    const renderOrangtuaCard = () => {
        const data = dataOrangtua as any;
        return (
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Orang Tua</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Nama Lengkap</p>
                        <p className="text-gray-900">{data.nama || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">NIK</p>
                        <p className="text-gray-900">{data.nik || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">No. JKN</p>
                        <p className="text-gray-900">{data.no_jkn || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tempat Lahir</p>
                        <p className="text-gray-900">{data.tempat_lahir || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tanggal Lahir</p>
                        <p className="text-gray-900">{data.tanggal_lahir || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Golongan Darah</p>
                        <p className="text-gray-900">{data.golongan_darah || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-600">Alamat</p>
                        <p className="text-gray-900">{data.alamat || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Pekerjaan</p>
                        <p className="text-gray-900">{data.pekerjaan || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Penghasilan</p>
                        <p className="text-gray-900">{data.penghasilan ? `Rp ${data.penghasilan.toLocaleString()}` : "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Sumber Penghasilan</p>
                        <p className="text-gray-900">{data.sumber_penghasilan || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Jumlah Tanggungan</p>
                        <p className="text-gray-900">{data.jumlah_tanggungan || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Status Rumah</p>
                        <p className="text-gray-900">{data.status_rumah || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tanggungan Listrik</p>
                        <p className="text-gray-900">{data.tanggungan_listrik ? `Rp ${data.tanggungan_listrik.toLocaleString()}` : "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tanggungan Air</p>
                        <p className="text-gray-900">{data.tanggungan_air ? `Rp ${data.tanggungan_air.toLocaleString()}` : "-"}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderAnakCards = () => {
        return dataAnak.map((data: any, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Anak {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Nama Lengkap</p>
                        <p className="text-gray-900">{data.nama || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">NIK</p>
                        <p className="text-gray-900">{data.nik || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">No. JKN</p>
                        <p className="text-gray-900">{data.no_jkn || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tempat Lahir</p>
                        <p className="text-gray-900">{data.tempat_lahir || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tanggal Lahir</p>
                        <p className="text-gray-900">{data.tanggal_lahir || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Golongan Darah</p>
                        <p className="text-gray-900">{data.golongan_darah || "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Berat Badan</p>
                        <p className="text-gray-900">{data.berat_badan ? `${data.berat_badan} kg` : "-"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Tinggi Badan</p>
                        <p className="text-gray-900">{data.tinggi_badan ? `${data.tinggi_badan} cm` : "-"}</p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen max-w-3xl">
                <Stepper currentStep={step} />
                {step === 1 && <DataOrangtua onNext={handleNextKeluarga} initialData={dataOrangtua} />}
                {step === 2 && (
                    <DataAnak
                        onNext={handleNextAnak}
                        onBack={handleBackToOrangtua}
                        initialData={dataAnak}
                    />
                )}
                {step === 3 && (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Konfirmasi Data</h2>
                        <p className="text-center text-gray-900 font-semibold mb-6 text-2xl">✅ Semua data telah terisi</p>
                        {renderOrangtuaCard()}
                        {renderAnakCards()}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleBackToAnak}
                                className="bg-gray-200 text-gray-900 font-medium rounded-xl px-6 py-2.5 hover:bg-gray-300"
                            >
                                Kembali ke Form Anak
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                className="bg-wine text-white font-medium rounded-xl px-6 py-2.5 hover:bg-dark-wine"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
}
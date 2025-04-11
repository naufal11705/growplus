import Stepper from "@/Components/Widget/Stepper";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Auth";
import DataAnak from "./Data/DataAnak";
import DataOrangtua from "./Data/DataOrangtua";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function RegisterStep() {
    const [step, setStep] = useState(1);
    const [dataOrangtua, setDataOrangtua] = useState<any>({});
    const [dataAnak, setDataAnak] = useState<any[]>([]);
    const [tingkatEkonomi, setTingkatEkonomi] = useState<number | null>(null);

    useEffect(() => {
        if (dataOrangtua && Object.keys(dataOrangtua).length > 0) {
            const { penghasilan, jumlah_tanggungan, status_rumah, tanggungan_listrik, tanggungan_air } = dataOrangtua;

            let normalisasiPenghasilan = 0;
            switch (penghasilan) {
                case '500.000 - 1.000.000':
                    normalisasiPenghasilan = 20;
                    break;
                case '1.000.001 - 2.000.000':
                    normalisasiPenghasilan = 40;
                    break;
                case '2.000.001 - 3.000.000':
                    normalisasiPenghasilan = 60;
                    break;
                case '3.000.001 - 4.000.000':
                    normalisasiPenghasilan = 80;
                    break;
                case '4.000.001 - <5.000.000':
                    normalisasiPenghasilan = 100;
                    break;
                default:
                    normalisasiPenghasilan = 0;
            }

            let normalisasiTanggungan = 100 - ((jumlah_tanggungan / 5) * 100);
            normalisasiTanggungan = Math.max(0, Math.min(100, normalisasiTanggungan));

            let normalisasiStatusRumah = 0;
            switch (status_rumah) {
                case 'Milik Sendiri':
                    normalisasiStatusRumah = 100;
                    break;
                case 'Milik Sendiri (Cicilan)':
                    normalisasiStatusRumah = 75;
                    break;
                case 'Kontrak':
                    normalisasiStatusRumah = 50;
                    break;
                default:
                    normalisasiStatusRumah = 0;
            }

            const normalisasiTagihanListrik = Math.min(100, (tanggungan_listrik / 2000000) * 100);
            const normalisasiTagihanAir = Math.min(100, (tanggungan_air / 2000000) * 100);

            const bobotPenghasilan = 0.50;
            const bobotTanggungan = 0.20;
            const bobotStatusRumah = 0.20;
            const bobotTagihanListrik = 0.05;
            const bobotTagihanAir = 0.05;

            const skorTotal = (normalisasiPenghasilan * bobotPenghasilan) +
                (normalisasiTanggungan * bobotTanggungan) +
                (normalisasiStatusRumah * bobotStatusRumah) +
                (normalisasiTagihanListrik * bobotTagihanListrik) +
                (normalisasiTagihanAir * bobotTagihanAir);

            let ekonomi = null;
            if (skorTotal >= 0 && skorTotal <= 33) {
                ekonomi = 3;
            } else if (skorTotal >= 34 && skorTotal <= 66) {
                ekonomi = 2;
            } else if (skorTotal >= 67 && skorTotal <= 100) {
                ekonomi = 1;
            }
            setTingkatEkonomi(ekonomi);
        } else {
            setTingkatEkonomi(null);
        }
    }, [dataOrangtua]);

    const handleNextKeluarga = (data: any) => {
        setDataOrangtua(data);
        setStep(2);
    };

    const handleNextAnak = (childrenData: any) => {
        setDataAnak(childrenData);
        setStep(3);
    };

    const handleBackToOrangtua = () => {
        setStep(1);
    };

    const handleBackToAnak = () => {
        setStep(2);
    };

    const handleSkipAnak = () => {
        setStep(3);
    }

    const handleFinalSubmit = async () => {
        const finalData = {
            orangtua: {
                ...dataOrangtua,
                status_ekonomi: tingkatEkonomi, // Tambahkan tingkat ekonomi ke data orang tua
            },
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-wine text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-2">P</span>
                    Data Orang Tua
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderDataField("Nama Lengkap", data.nama)}
                    {renderDataField("NIK", data.nik)}
                    {renderDataField("No. JKN", data.no_jkn)}
                    {renderDataField("Tempat Lahir", data.tempat_lahir)}
                    {renderDataField("Tanggal Lahir", data.tanggal_lahir)}
                    {renderDataField("Golongan Darah", data.golongan_darah)}
                    {renderDataField("Alamat", data.alamat)}
                    {renderDataField("Kecamatan", data.kecamatan)}
                    {renderDataField("Kabupaten", data.kabupaten)}
                    {renderDataField("Provinsi", data.provinsi)}
                    {renderDataField("Pekerjaan", data.pekerjaan)}
                    {renderDataField("Penghasilan", data.penghasilan ? `Rp ${data.penghasilan.toLocaleString()}` : "-")}
                    {renderDataField("Sumber Penghasilan", data.sumber_penghasilan)}
                    {renderDataField("Jumlah Tanggungan", data.jumlah_tanggungan)}
                    {renderDataField("Status Rumah", data.status_rumah)}
                    {renderDataField("Tanggungan Listrik", data.tanggungan_listrik ? `Rp ${data.tanggungan_listrik.toLocaleString()}` : "-")}
                    {renderDataField("Tanggungan Air", data.tanggungan_air ? `Rp ${data.tanggungan_air.toLocaleString()}` : "-")}
                    {renderDataField("Tingkat Ekonomi", tingkatEkonomi)}
                </div>
            </motion.div>
        );
    };

    const renderAnakCards = () => {
        return dataAnak.map((data: any, index: number) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-wine text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-2">A{index + 1}</span>
                    Data Anak {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderDataField("Nama Lengkap", data.nama)}
                    {renderDataField("NIK", data.nik)}
                    {renderDataField("No. JKN", data.no_jkn)}
                    {renderDataField("Tempat Lahir", data.tempat_lahir)}
                    {renderDataField("Tanggal Lahir", data.tanggal_lahir)}
                    {renderDataField("Golongan Darah", data.golongan_darah)}
                    {renderDataField("Berat Badan", data.berat_badan ? `${data.berat_badan} kg` : "-")}
                    {renderDataField("Tinggi Badan", data.tinggi_badan ? `${data.tinggi_badan} cm` : "-")}
                </div>
            </motion.div>
        ));
    };

    const renderDataField = (label: string, value: any, fullWidth = false) => (
        <div className={fullWidth ? "md:col-span-2" : ""}>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-gray-900 font-medium mt-1 truncate">{value || "-"}</p>
        </div>
    );

    const getStepAlignment = () => {
        if (step === 1) return "items-start";
        if (step === 2) return "items-center";
        return "items-end";
    };

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center mx-auto min-h-screen p-5">
                <div className={`w-full max-w-4xl ${getStepAlignment()}`}>
                    <Stepper currentStep={step} />

                    <motion.div
                        key={`step-${step}`}
                        initial={{ opacity: 0, x: step === 1 ? -20 : step === 3 ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-white"
                    >
                        {step === 1 && <DataOrangtua onNext={handleNextKeluarga} initialData={dataOrangtua} />}

                        {step === 2 && (
                            <DataAnak
                                onNext={handleNextAnak}
                                onBack={handleBackToOrangtua}
                                onSkip={handleSkipAnak}
                                initialData={dataAnak}
                            />
                        )}

                        {step === 3 && (
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Konfirmasi Data</h2>

                                <div className="flex items-center justify-center mb-8">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </span>
                                </div>

                                <p className="text-center text-gray-700 font-medium mb-8">
                                    Semua data telah terisi dengan lengkap. Silahkan periksa kembali data Anda sebelum menyimpan.
                                </p>

                                {renderOrangtuaCard()}
                                {renderAnakCards()}

                                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 mb-8">
                                    <button
                                        onClick={handleBackToAnak}
                                        className="order-2 sm:order-1 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl px-6 py-3 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                        Kembali ke Form Anak
                                    </button>

                                    <button
                                        onClick={handleFinalSubmit}
                                        className="order-1 sm:order-2 bg-wine text-white font-medium rounded-xl px-6 py-3 hover:bg-dark-wine transition-colors duration-300 flex items-center justify-center"
                                    >
                                        Simpan Data
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}

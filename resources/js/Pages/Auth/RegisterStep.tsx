import Stepper from "@/Components/Widget/Stepper";
import { useState } from "react";
import Layout from "../../Layouts/Auth";
import DataAnak from "./Data/DataAnak";
import DataKeluarga from "./Data/DataKeluarga";

export default function RegisterStep() {
    const [currentStep, setCurrentStep] = useState(1);
    const [jumlahAnak, setJumlahAnak] = useState(0);
    const [keluargaLengkap, setKeluargaLengkap] = useState(false);

    const handleNextStep = (dataKeluarga: { jumlahAnak: number }) => {
        setJumlahAnak(dataKeluarga.jumlahAnak);
        setKeluargaLengkap(true);
        setCurrentStep(2);
    };

    const handleFinish = () => {
        alert("Registrasi selesai!");
        setCurrentStep(3);
    };

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen max-w-3xl">
                <Stepper currentStep={currentStep} />
                {currentStep === 1 && (
                    <DataKeluarga onNext={handleNextStep} />
                )}
                {currentStep === 2 && (
                    <DataAnak onNext={handleNextStep} />
                )}
                {currentStep === 3 && (
                    <div className="text-center text-wine font-semibold">
                        ✅ Semua data telah terisi, pendaftaran selesai!
                    </div>
                )}
            </section>
        </Layout>
    );
}

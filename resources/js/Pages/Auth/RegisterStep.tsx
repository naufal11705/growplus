import Stepper from "@/Components/Widget/Stepper";
import { useState } from "react";
import Layout from "@/Layouts/Auth";
import DataAnak from "./Data/DataAnak";
import DataOrangtua from "./Data/DataOrangtua";
import { router } from "@inertiajs/react";

export default function RegisterStep() {
    const [step, setStep] = useState(1);
    const [dataOrangtua, setDataOrangtua] = useState({});
    const [dataAnak, setDataAnak] = useState([]);

    const handleNextKeluarga = (data: any) => {
        setDataOrangtua(data);
        setStep(2); // Move to next step
    };

    const handleNextAnak = (childrenData: any) => {
        setDataAnak(childrenData);
        setStep(3); // Move to final step
    };

    const handleFinalSubmit = async () => {
        const finalData = {
            orangtua: dataOrangtua,
            anak: dataAnak,
        };

        router.post('/register-step', finalData, {
            onSuccess: () => console.log("Success!"),
            onError: (errors) => console.log("Error:", errors),
        });
    }

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen max-w-3xl">
                <Stepper currentStep={step} />
                {step === 1 && (
                    <DataOrangtua onNext={handleNextKeluarga} />
                )}
                {step === 2 && (
                    <DataAnak onNext={handleNextAnak} />
                )}
                {step === 3 && (

                    <div>
                        <h2>Konfirmasi Data</h2>
                        <p className="text-center text-wine font-semibold">✅ Semua data telah terisi</p>
                        <pre>{JSON.stringify({ orangtua: dataOrangtua, anak: dataAnak }, null, 2)}</pre>
                        <button onClick={handleFinalSubmit} className="bg-green-500 text-white p-2 rounded">
                            Simpan Data
                        </button>
                    </div>
                )}
            </section>
        </Layout>
    );
}

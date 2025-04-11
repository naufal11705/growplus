import TantanganCards from "@/Components/Widget/Tantangan_Card";
import Tabs from "@/Components/Widget/Tabs/ChallengeTabs";
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";
import { Anak } from "@/types/anak";
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

interface FaseCardsProps {
    fases: Fase[];
    anak: Anak[];
    selectedAnak: number | null; // From controller
}

const Forum: React.FC<FaseCardsProps> = ({ fases, anak, selectedAnak }) => {
    // Calculate unlocked phases
    const unlockedFaseIds: number[] = [];
    for (let i = 0; i < fases.length; i++) {
        const fase = fases[i];
        unlockedFaseIds.push(fase.fase_id);
        // Assuming is_anak_required implies anak must exist
        if (fase.progress < 100 || (fase.is_anak_required && anak.length === 0)) break;
    }

    const unlockedFases = fases.filter(fase =>
        fase.progress > 0 || unlockedFaseIds.includes(fase.fase_id)
    );

    const lockedFases = fases.filter(fase =>
        !unlockedFaseIds.includes(fase.fase_id) && fase.progress === 0
    );

    // Initialize selectedAnakId with selectedAnak from controller, fallback to first anak or empty string
    const [selectedAnakId, setSelectedAnakId] = useState<string>(
        selectedAnak ? selectedAnak.toString() : anak[0]?.anak_id?.toString() || ""
    );

    // Update selectedAnakId if anak or selectedAnak changes
    useEffect(() => {
        if (selectedAnak) {
            setSelectedAnakId(selectedAnak.toString());
        } else if (anak.length > 0) {
            setSelectedAnakId(anak[0].anak_id.toString());
        } else {
            setSelectedAnakId("");
        }
    }, [anak, selectedAnak]);

    // Handle dropdown change and navigate to tantangan/{id}
    const handleAnakChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const anakId = e.target.value;
        setSelectedAnakId(anakId);
        if (anakId) {
            router.get(`/tantangan/${anakId}`);
        }
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-12 md:mt-20">
                <div className="lg:p-8 p-4">
                    <div className="md:grid mb-8">
                        <h2 className="text-4xl font-bold text-gray-900">Challenge Dimulai! Yuk, Cegah Stunting!</h2>
                        <p className="text-md text-gray-400 font-medium">
                            Kerjakan challenge di bawah ini untuk tumbuh kembang anak yang optimal.
                        </p>
                        {/* Pilih Anak */}
                        <div className="mt-5">
                            <label htmlFor="anak_id" className="block mb-2 text-sm font-medium text-gray-900">
                                Pilih Anak
                            </label>
                            <select
                                id="anak_id"
                                name="anak_id"
                                value={selectedAnakId}
                                onChange={handleAnakChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                required
                            >
                                {anak && anak.length > 0 ? (
                                    anak.map((child) => (
                                        <option key={child.anak_id} value={child.anak_id}>
                                            {child.nama}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Tidak ada anak tersedia
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>

                    {/* TantanganCards: kirim selectedAnakId */}
                    {unlockedFases.length > 0 && (
                        <TantanganCards
                            fases={unlockedFases}
                            unlockedFaseIds={unlockedFaseIds}
                            anakId={selectedAnakId}
                        />
                    )}

                    {lockedFases.length > 0 && (
                        <>
                            <hr className="h-px my-8 bg-gray-200 border-0" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">Challenge Selanjutnya</h2>
                            <TantanganCards
                                fases={lockedFases}
                                unlockedFaseIds={unlockedFaseIds}
                                anakId={selectedAnakId}
                            />
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Forum;
import TantanganCards from "@/Components/Widget/Tantangan_Card";
import Tabs from  "@/Components/Widget/Tabs/ChallengeTabs"
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";
import React from "react";

interface FaseCardsProps {
    fases: Fase[];
    hasAnak: boolean;
}

const Forum: React.FC<FaseCardsProps> = ({ fases, hasAnak }) => {
    // Hitung fase yang sudah di-unlock
    const unlockedFaseIds: number[] = [];
    for (let i = 0; i < fases.length; i++) {
        const fase = fases[i];
        unlockedFaseIds.push(fase.fase_id);
        if (fase.progress < 100 || (fase.is_anak_required != true && hasAnak != true)) break;
    }

    const unlockedFases = fases.filter(fase =>
        fase.progress > 0 || unlockedFaseIds.includes(fase.fase_id)
    );

    const lockedFases = fases.filter(fase =>
        !unlockedFaseIds.includes(fase.fase_id) && fase.progress === 0
    );

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-12 md:mt-20">
                <div className="lg:p-8 p-4">
                    <div className="md:grid mb-8">
                        <h2 className="text-4xl font-bold text-gray-900">Challenge Dimulai! Yuk, Cegah Stunting!</h2>
                        <p className="text-md text-gray-400 font-medium">
                            Kerjakan challenge di bawah ini untuk tumbuh kembang anak yang optimal.
                        </p>
                    </div>

                    {/* <Tabs /> */}

                    {/* Tantangan yang unlocked */}
                    {unlockedFases.length > 0 && (
                        <TantanganCards fases={unlockedFases} unlockedFaseIds={unlockedFaseIds} />
                    )}

                    {/* Divider */}
                    {lockedFases.length > 0 && (
                        <>
                            <hr className="h-px my-8 bg-gray-200 border-0" />
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">Challenge Selanjutnya</h2>
                            <TantanganCards fases={lockedFases} unlockedFaseIds={unlockedFaseIds} />
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Forum;

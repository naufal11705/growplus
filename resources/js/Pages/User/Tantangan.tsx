import TantanganCards from "@/Components/Widget/Tantangan_Card";
import Tabs from "@/Components/Widget/Tabs/ChallengeTabs"
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";
import { Anak } from "@/types/anak";
import React, { useState, useEffect } from "react";

interface FaseCardsProps {
    fases: Fase[];
    hasAnak: boolean;
    anak: Anak[];
}

const Forum: React.FC<FaseCardsProps> = ({ fases, hasAnak, anak }) => {
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

    const [selectedAnakId, setSelectedAnakId] = useState(anak[0]?.anak_id || "");

    useEffect(() => {
        if (anak.length > 0) {
          setSelectedAnakId(anak[0].anak_id);
        }
      }, [anak]);      

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
                            <label htmlFor="orangtua_id" className="block mb-2 text-sm font-medium text-gray-900">
                                Pilih Anak
                            </label>
                            <select
                                id="orangtua_id"
                                name="orangtua_id"
                                value={selectedAnakId}
                                onChange={(e) => setSelectedAnakId(Number(e.target.value))}
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
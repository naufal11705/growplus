import Tabs from "@/Components/Widget/Tabs/ChallengeTabs";
import TantanganCards from "@/Components/Widget/Tantangan_Card";
import Layout from "@/Layouts/Layout";
import { Challenge } from "@/types/challenge";
import React from "react";

interface TantanganCardsProps {
    challenges: Challenge[];
}

const Forum: React.FC<TantanganCardsProps> = ({ challenges }) => {
    const challengesActive = challenges.filter(challenge => challenge.status === 1);
    const challengesNonActive = challenges.filter(challenge => challenge.status === 0);
    console.log(challengesActive);
    console.log(challengesNonActive);

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
                    <Tabs />
                    {challengesActive.length > 0 && (
                        <TantanganCards challenges={challengesActive} />
                    )}
                    <hr className="h-px my-8 bg-gray-200 border-0" />
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Challenge Selanjutnya</h2>
                    {challengesNonActive.length > 0 && (
                        <TantanganCards challenges={challengesNonActive} />
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Forum;

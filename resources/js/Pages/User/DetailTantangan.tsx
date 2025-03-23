import RightSide from "@/Components/Widget/RightSide";
import DetailChallengeTabs from "@/Components/Widget/Tabs/DetailChallengeTabs";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";

interface TantanganCardsProps {
    fase: Fase;
}

export default function DetailTantangan({ fase }: TantanganCardsProps) {
    const [activeTab, setActiveTab] = useState("Deskripsi");

    // State untuk tracking tantangan yang dicentang
    const [checkedTantangans, setCheckedtantangans] = useState<boolean[]>(Array(fase.tantangans.length).fill(false));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Hitung progress berdasarkan jumlah tugas yang dicentang
        const totalTantangans = checkedTantangans.length;
        const completedTantangans = checkedTantangans.filter(tantangan => tantangan).length;
        const newProgress = Math.round((completedTantangans / totalTantangans) * 100);
        setProgress(newProgress);
    }, [checkedTantangans]);

    const handleCheckboxChange = (index: number) => {
        const updatedTantangans = [...checkedTantangans];
        updatedTantangans[index] = !updatedTantangans[index];
        setCheckedtantangans(updatedTantangans);
    };

    return (
        <Layout>
            <div key={fase.fase_id} className="lg:p-8 w-full">
                <div className="lg:p-8 p-4 w-full">
                    <div className="rounded-xl lg:pl-8 sm:ml-64 md:h-72 relative">
                        <img src={fase.banner} className="lg:mt-5 mt-3 w-full h-36 rounded-xl pb-0 md:p-0 md:h-full object-cover" alt={fase.judul} />
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl lg:left-8"></div>
                        <h2 className="lg:text-4xl text-xl font-extrabold text-white absolute bottom-14 lg:left-14 left-4">{fase.judul}</h2>
                        <p className="lg:text-lg absolute text-xs text-white font-medium mt-2 bottom-6 lg:left-14 left-4">
                            {fase.subjudul}
                        </p>
                    </div>
                    <div className="p-1 sm:ml-64">
                        <div className="grid mt-5 lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-3 lg:justify-between">
                            <div className="w-full lg:col-span-2 lg:px-7 px-0" id="card1">
                                <DetailChallengeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                                {activeTab === "Deskripsi" && (
                                    <div id="deskripsiSection">
                                        <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-1">Deskripsi Tantangan</h2>
                                        <h2 className="lg:text-lg text-md font-bold text-gray-500 mt-2">{fase.deskripsi}</h2>
                                        <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-5">Benefit</h2>
                                        <ul className="mt-2">
                                            {fase.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-center mt-2 overflow-hidden list-none gap-2 font-semibold">
                                                    <svg className="w-6 h-6 text-pinky" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === "Tugas" && (
                                    <div id="tugasSection">
                                        <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-1">Tugas yang harus diselesaikan:</h2>
                                        <div key={fase.fase_id} className="mt-5">
                                            <h3 className="text-lg font-semibold text-gray-800">{fase.judul}</h3>
                                            {fase.tantangans.map((tantangan, index) => (
                                                <label key={index} className="flex items-center gap-2 mt-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-pinky bg-gray-100 border-gray-300 rounded-md"
                                                        checked={checkedTantangans[index]}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                    <span className={`text-sm font-medium text-gray-900 ${checkedTantangans[index] ? 'line-through text-gray-500' : ''}`}>
                                                        {tantangan}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* Progress bar */}
                                        <div className="mt-4">
                                            <h2 className="text-lg font-semibold text-gray-900">Progress Tantangan</h2>
                                            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                                <div
                                                    className="bg-pinky h-4 rounded-full transition-all duration-300"
                                                    style={{ width: `${fase.progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-gray-600 text-sm mt-1">{fase.progress}% selesai</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <RightSide fase={fase} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

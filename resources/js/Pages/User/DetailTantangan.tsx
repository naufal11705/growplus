import RightSide from "@/Components/Widget/RightSide";
import DetailChallengeTabs from "@/Components/Widget/Tabs/DetailChallengeTabs";
import { useState, useEffect } from "react";
import { challenges } from "@/Data/ChallengeCard";
import Layout from "@/Layouts/Layout";
import { Challenge } from "@/types/challenge";

interface TantanganCardsProps {
    challenges?: Challenge[];
}

export default function DetailTantanga({ challenges: propChallenges }: TantanganCardsProps) {
    const [activeTab, setActiveTab] = useState("Deskripsi");
    const dataTantangan = (propChallenges ?? challenges).filter(challenge => challenge.id === 1);

    // State untuk tracking task yang dicentang
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>(Array(dataTantangan[0].tasks.length).fill(false));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Hitung progress berdasarkan jumlah tugas yang dicentang
        const totalTasks = checkedTasks.length;
        const completedTasks = checkedTasks.filter(task => task).length;
        const newProgress = Math.round((completedTasks / totalTasks) * 100);
        setProgress(newProgress);
    }, [checkedTasks]);

    const handleCheckboxChange = (index: number) => {
        const updatedTasks = [...checkedTasks];
        updatedTasks[index] = !updatedTasks[index];
        setCheckedTasks(updatedTasks);
    };

    return (
        <Layout>
            {dataTantangan.map((challenge) => (
                <div key={challenge.id} className="lg:p-8 w-full">
                    <div className="lg:p-8 p-4 w-full">
                        <div className="rounded-xl lg:pl-8 sm:ml-64 md:h-72 relative">
                            <img src={challenge.image} className="lg:mt-5 mt-3 w-full h-36 rounded-xl pb-0 md:p-0 md:h-full object-cover" alt={challenge.title} />
                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl lg:left-8"></div>
                            <h2 className="lg:text-4xl text-xl font-extrabold text-white absolute bottom-14 lg:left-14 left-4">{challenge.title}</h2>
                            <p className="lg:text-lg absolute text-xs text-white font-medium mt-2 bottom-6 lg:left-14 left-4">
                                {challenge.subtitle}
                            </p>
                        </div>
                        <div className="p-1 sm:ml-64">
                            <div className="grid mt-5 lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-3 lg:justify-between">
                                <div className="w-full lg:col-span-2 lg:px-7 px-0" id="card1">
                                    <DetailChallengeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                                    {activeTab === "Deskripsi" && (
                                        <div id="deskripsiSection">
                                            <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-1">Deskripsi Tantangan</h2>
                                            <h2 className="lg:text-lg text-md font-bold text-gray-500 mt-2">{challenge.deskripsi}</h2>
                                            <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-5">Benefit</h2>
                                            <ul className="mt-2">
                                                {challenge.benefit.map((benefits, index) => (
                                                    <li key={index} className="flex items-center mt-2 overflow-hidden list-none gap-2 font-semibold">
                                                        <svg className="w-6 h-6 text-pinky" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        {benefits}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {activeTab === "Tugas" && (
                                        <div id="tugasSection">
                                            <h2 className="lg:text-3xl text-xl font-bold text-gray-900 mt-1">Tugas yang harus diselesaikan:</h2>
                                            {dataTantangan.map((challenge) => (
                                                <div key={challenge.id} className="mt-5">
                                                    <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
                                                    {challenge.tasks.map((task, index) => (
                                                        <label key={index} className="flex items-center gap-2 mt-2 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                className="w-5 h-5 text-pinky bg-gray-100 border-gray-300 rounded-md" 
                                                                checked={checkedTasks[index]} 
                                                                onChange={() => handleCheckboxChange(index)} 
                                                            />
                                                            <span className={`text-sm font-medium text-gray-900 ${checkedTasks[index] ? 'line-through text-gray-500' : ''}`}>
                                                                {task}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ))}
                                            {/* Progress bar */}
                                            {/* <div className="mt-4">
                                                <h2 className="text-lg font-semibold text-gray-900">* Contoh Logika Progrees gus *</h2>
                                                <h2 className="text-lg font-semibold text-gray-900">Progress Tantangan</h2>
                                                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                                    <div
                                                        className="bg-pinky h-4 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1">{progress}% selesai</p>
                                            </div> */}
                                        </div>
                                    )}
                                </div>
                                <RightSide />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
}

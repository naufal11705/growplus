import { Dispatch, SetStateAction } from "react";

interface DetailChallengeTabsProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function DetailChallengeTabs({ activeTab, setActiveTab }: DetailChallengeTabsProps) {
    const categories: string[] = ["Deskripsi", "Tugas"];

    return (
        <div className="flex bg-gray-100 p-1 rounded-lg space-x-2 lg:mb-8 mb-4 w-full">
            {categories.map((category) => (
                <button 
                    key={category} 
                    onClick={() => setActiveTab(category)} 
                    className={`px-4 py-2 rounded-lg text-sm lg:text-lg font-semibold transition-all duration-300 ${activeTab === category ? "bg-white text-black" : "text-gray-600 hover:text-black"}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

import { useState } from "react";
import { challenges } from "@/Data/ChallengeCard";
import { Challenge } from "@/types/challenge";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface TantanganCardsProps {
    challenges?: Challenge[];
}
export default function BottomBar({ challenges: propChallenges }: TantanganCardsProps) {
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
    const dataTantangan = (propChallenges ?? challenges).filter((challenge) => challenge.id === 1);
    const { width, height } = useWindowSize();
    const handleComplete = (challengeId: number) => {
        setCompleted((prev) => ({ ...prev, [challengeId]: true }));
        setTimeout(() => {
            setCompleted((prev) => ({ ...prev, [challengeId]: false }));
        }, 10000);
    };  
    return(
        <>
            {dataTantangan.map((challenge: Challenge) => (
                <div key={challenge.id}>        
                    {completed[challenge.id] && <Confetti width={width} height={height} />}
                    <div className="fixed lg:hidden block bottom-16 py-2 left-0 z-50 grid w-full h-24 grid-cols-1 px-5 bg-white border-t border-gray-200">                        
                        <div className="flex flex-col items-left justify-left">
                            <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
                            <div className="mt-2">
                                <p className="text-gray-600 text-sm justify-between flex">
                                    Progress <span className="font-semibold text-black">{challenge.progress ?? 0}%</span>
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div className="bg-pinky h-2.5 rounded-full" style={{ width: `${challenge.progress ?? 0}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`fixed lg:hidden block bottom-0 left-0 z-50 grid w-full h-16 grid-cols-1 px-5 border-t border-gray-200 ${challenge.progress === 0 ? "bg-white" : challenge.progress === 100 ? "bg-white" : "bg-white border border-gray-200"}`}>
                        <div className="flex items-center justify-left">
                            <button onClick={challenge.progress === 100 ? () => handleComplete(challenge.id) : undefined} className={`w-full font-medium text-sm py-3 rounded-lg ${challenge.progress === 0 ? "bg-gray-800 text-white hover:bg-gray-900" : challenge.progress === 100 ? "bg-wine text-white" : "bg-white border border-gray-200 text-gray-400 cursor-not-allowed"}`}>
                                {challenge.progress === 0 ? "Mulai Challenge" : challenge.progress === 100 ? (completed ? "Challenge Selesai" : "Mark Challenge as Completed") : "Challenge Sedang Berjalan"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
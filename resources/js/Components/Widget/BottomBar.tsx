import { useState } from "react";
import { fases as defaultFases } from "@/Data/FaseCard";
import { Fase } from "@/types/fase";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface FaseCardsProps {
    fase?: Fase[];
}

export default function BottomBar({ fase: propFases }: FaseCardsProps) {
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
    const dataFase = (propFases ?? defaultFases).filter((fase) => fase.fase_id === 1);
    const { width, height } = useWindowSize();
    const handleComplete = (faseId: number) => {
        setCompleted((prev) => ({ ...prev, [faseId]: true }));
        setTimeout(() => {
            setCompleted((prev) => ({ ...prev, [faseId]: false }));
        }, 10000);
    };
    return (
        <>
            {dataFase.map((fase: Fase) => (
                <div key={fase.fase_id}>
                    {completed[fase.fase_id] && <Confetti width={width} height={height} />}
                    <div className="fixed lg:hidden block bottom-16 py-2 left-0 z-50 grid w-full h-24 grid-cols-1 px-5 bg-white border-t border-gray-200">
                        <div className="flex flex-col items-left justify-left">
                            <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
                            <div className="mt-2">
                                <p className="text-gray-600 text-sm justify-between flex">
                                    Progress <span className="font-semibold text-black">{fase.progress ?? 0}%</span>
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div className="bg-pinky h-2.5 rounded-full" style={{ width: `${fase.progress ?? 0}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`fixed lg:hidden block bottom-0 left-0 z-50 grid w-full h-16 grid-cols-1 px-5 border-t border-gray-200 ${fase.progress === 0 ? "bg-white" : fase.progress === 100 ? "bg-white" : "bg-white border border-gray-200"}`}>
                        <div className="flex items-center justify-left">
                            <button onClick={fase.progress === 100 ? () => handleComplete(fase.fase_id) : undefined} className={`w-full font-medium text-sm py-3 rounded-lg ${fase.progress === 0 ? "bg-gray-800 text-white hover:bg-gray-900" : fase.progress === 100 ? "bg-wine text-white" : "bg-white border border-gray-200 text-gray-400 cursor-not-allowed"}`}>
                                {fase.progress === 0 ? "Mulai fase" : fase.progress === 100 ? (completed ? "Challenge Selesai" : "Mark Challenge as Completed") : "Challenge Sedang Berjalan"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

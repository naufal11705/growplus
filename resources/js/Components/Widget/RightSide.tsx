import { challenges } from "../../Data/ChallengeCard";
import { Challenge } from "../../types/challenge";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import BottomBar from "./BottomBar";

interface TantanganCardsProps {
    challenges?: Challenge[];
}
type FAQItem = {
    question: string;
    answer: string;
};

export default function RightSide({ challenges: propChallenges }: TantanganCardsProps ) {
    const dataTantangan = (propChallenges ?? challenges).filter((challenge) => challenge.id === 1);
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
    const { width, height } = useWindowSize();
    const faqs: FAQItem[] = [
        {
            question: "Lorem ipsum",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et odio sed est pellentesque scelerisque. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
        },
        {
            question: "Lorem ipsum",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et odio sed est pellentesque scelerisque. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
        },
        {
            question: "Lorem ipsum",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et odio sed est pellentesque scelerisque. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const handleComplete = (challengeId: number) => {
        setCompleted((prev) => ({ ...prev, [challengeId]: true }));
        setTimeout(() => {
            setCompleted((prev) => ({ ...prev, [challengeId]: false }));
        }, 10000);
    };        

    return (
        <>
            {dataTantangan.map((challenge: Challenge) => (
                <div key={challenge.id} id="card2" className="justify-end space-y-4 mb-36">
                    {/* Challenge Card */}
                    <div className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-md lg:block hidden">
                        {/* <div className="flex items-center justify-end mb-3">
                            <LoveButton />
                        </div> */}
                        {completed[challenge.id] && <Confetti width={width} height={height} />}
                        <button
                                onClick={challenge.progress === 100 ? () => handleComplete(challenge.id) : undefined}
                                className={`w-full font-medium text-sm py-2 rounded-lg ${
                                challenge.progress === 0
                                    ? "bg-gray-800 text-white hover:bg-gray-900"
                                    : challenge.progress === 100
                                    ? "bg-wine text-white"
                                    : "bg-white border border-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {challenge.progress === 0
                                ? "Mulai Challenge"
                                : challenge.progress === 100
                                ? completed
                                    ? "Challenge Selesai"
                                    : "Mark Challenge as Completed"
                                : "Challenge Sedang Berjalan"}
                        </button>
                        <div className="border-t border-gray-200 mt-3 pt-3 text-sm text-gray-700">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v10M12 5v14M16 9v6" />
                                    </svg>
                                    Available until
                                </div>
                                <span className="font-medium">March 7, 2025</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5v14" />
                                    </svg>
                                    Participants
                                </div>
                                <span className="font-medium">248</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8M8 11h8m-8 4h4" />
                                    </svg>
                                    Completions
                                </div>
                                <span className="font-medium">156</span>
                            </div>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-md lg:block hidden">
                        <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
                        <div className="mt-2">
                            <p className="text-gray-600 text-sm justify-between flex">
                                Progress <span className="font-semibold text-black">{challenge.progress ?? 0}%</span>
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-pinky h-2.5 rounded-full" style={{ width: `${challenge.progress ?? 0}%` }}></div>
                            </div>
                            <div className="flex flex-row mt-3">
                                <div className="text-wine bg-[#FBD3E3] font-semibold rounded-full text-sm px-3 py-1 me-2 mb-2">
                                    +10 Point
                                </div>
                                <div className="text-wine bg-[#FBD3E3] font-semibold rounded-full text-sm px-3 py-1 me-2 mb-2">
                                    +10 Point
                                </div>
                                <div className="text-wine bg-[#FBD3E3] font-semibold rounded-full text-sm px-3 py-1 me-2 mb-2">
                                    +10 Point
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Baca Ini Dulu ya Moms</h2>
                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-dashed border-pink-400 hover:bg-gray-50 rounded-lg p-4 shadow-md cursor-pointer"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold text-gray-800">{faq.question}</p>
                                        <svg className={`w-5 h-5 text-gray-800 transition-transform duration-300 ${openIndex === index ? 'rotate-90' : '-rotate-45'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </div>
                                    {openIndex === index && (
                                        <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <BottomBar/>
                </div>
            ))}
        </>
    );
}

import { fases as defaultFases } from "@/Data/FaseCard";
import { Fase } from "@/types/fase";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import BottomBar from "./BottomBar";

interface TantanganCardsProps {
    fase?: Fase[];
}
type FAQItem = {
    question: string;
    answer?: string;
    list?: string[];
};

export default function RightSide({ fase: propFases }: TantanganCardsProps) {
    const dataFase = (propFases ?? defaultFases).filter((fase) => fase.fase_id === 1);
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
    const { width, height } = useWindowSize();
    const faqs: FAQItem[] = [
        // {
        //     question: "Apa yang akan ibu alami?",
        //     answer: "Selama masa kehamilan 9 bulan, Ibu akan naik berat badannya sebanyak 5 - 18 kg sesuai dengan status gizi ibu sebelum hamil."
        // },
        {
            question: "⚠️ Tanda Bahaya ⚠️",
            list: [
                "Demam Tinggi",
                "Nyeri perut hebat",
                "Mual dan muntah hebat",
                "Perdarahan",
                "Sakit saat kencing atau keluar keputihan atau gatal di daerah kemaluan",
            ]
        },
        {
            question: "Apakah ada layanan kesehatan yang gratis selama kehamilan?",
            list: [
                "Pemeriksaan kehamilan oleh dokter, bidan dan tenaga kesehatan",
                "Pemeriksaan status gizi",
                "Pemeriksaan laboratorium",
                "Pemeriksaan kondisi bayi",
                "USG 2 kali",
                "Pemberian tablet tambah darah(TTD) / multivitamin bagi ibu hamil",
                "Pemeriksaan tekanan darah",
                "Skrining kesehatan jiwa",
                "Imunisasi Tetanus",
                "Kelas ibu hamil"
            ]
        },
        {
            question: "Apa hal-hal yang tidak boleh dilakukan selama kehamilan?",
            list: [
                "Minum obat tanpa resep dokter",
                "Merokok atau terpapar asap rokok",
                "Stress berlebihan"
            ]
        },
        // {
        //     question: "Bagaimana jika saya melewatkan satu tantangan?",
        //     answer: "Tidak masalah! Anda bisa melanjutkan ke tantangan berikutnya atau mengulang yang terlewat kapan saja sesuai kenyamanan Anda."
        // },
        // {
        //     question: "Apakah diperlukan peralatan khusus untuk mengikuti challenge ini?",
        //     answer: "Sebagian besar tantangan tidak memerlukan peralatan khusus. Namun, beberapa tantangan seperti yoga atau olahraga ringan mungkin memerlukan matras atau dumbbell ringan."
        // },
        // {
        //     question: "Apakah challenge ini termasuk pola makan sehat?",
        //     answer: "Ya! Beberapa tantangan mencakup rekomendasi makanan sehat untuk ibu hamil agar mendapatkan nutrisi yang cukup untuk mendukung perkembangan bayi."
        // }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const handleComplete = (faseId: number) => {
        setCompleted((prev) => ({ ...prev, [faseId]: true }));
        setTimeout(() => {
            setCompleted((prev) => ({ ...prev, [faseId]: false }));
        }, 10000);
    };

    return (
        <>
            {dataFase.map((fase: Fase) => (
                <div key={fase.fase_id} id="card2" className="justify-end space-y-4 mb-36">
                    <div className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-md lg:block hidden">
                        {/* <div className="flex items-center justify-end mb-3">
                            <LoveButton />
                        </div> */}
                        {completed[fase.fase_id] && <Confetti width={width} height={height} />}
                        <button
                            onClick={fase.progress === 100 ? () => handleComplete(fase.fase_id) : undefined}
                            className={`w-full font-medium text-sm py-2 rounded-lg ${fase.progress === 0
                                ? "bg-wine text-white hover:bg-dark-wine"
                                : fase.progress === 100
                                    ? "bg-wine text-white"
                                    : "bg-white border border-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {fase.progress === 0
                                ? "Mulai Challenge"
                                : fase.progress === 100
                                    ? completed[fase.fase_id]
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
                        <h3 className="text-lg font-semibold text-gray-800">Progress Anda</h3>
                        <div className="mt-2">
                            <p className="text-gray-600 text-sm justify-between flex">
                                Progress <span className="font-semibold text-black">{fase.progress ?? 0}%</span>
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-pinky h-2.5 rounded-full" style={{ width: `${fase.progress ?? 0}%` }}></div>
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
                                        <div className="mt-2">
                                            {faq.answer && (
                                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                                            )}
                                            {faq.list && (
                                                <ul className="list-disc px-4 text-gray-600">
                                                    {faq.list.map((item, i) => (
                                                        <li key={i} className="text-sm">{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <BottomBar fase={dataFase} />
                </div>
            ))}
        </>
    );
}

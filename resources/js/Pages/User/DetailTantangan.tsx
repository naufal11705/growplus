import RightSide from "@/Components/Widget/RightSide";
import DetailChallengeTabs from "@/Components/Widget/Tabs/DetailChallengeTabs";
import ImageUploadModal from "@/Components/Widget/ModalChallenges";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import { motion } from "framer-motion";

interface DetailTantanganProps {
    fase: Fase;
    tantangansDone: { anak_id: number; tantangan_id: number }[];
    anak_id: number;
}

export default function DetailTantangan({ fase, tantangansDone, anak_id }: DetailTantanganProps) {
    const csrf_token = useCsrfToken();
    const [activeTab, setActiveTab] = useState("Deskripsi");
    const [checkedTantangans, setCheckedTantangans] = useState<boolean[]>([]);
    const [processing, setProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
    const [selectedTantanganIndex, setSelectedTantanganIndex] = useState<number | null>(null); // Index tantangan yang dipilih
    const [selectedTantanganId, setSelectedTantanganId] = useState<number | null>(null); // ID tantangan yang dipilih

    useEffect(() => {
        if (fase.tantangans && fase.tantangans.length > 0) {
            const initialCheckedState = fase.tantangans.map((tantangan) =>
                tantangansDone.some((done) => done.tantangan_id === tantangan.tantangan_id)
            );
            setCheckedTantangans(initialCheckedState);
        }
    }, [fase, tantangansDone, anak_id]);

    const handleCheckboxClick = (index: number, tantanganId: number) => {
        // Jika checkbox sudah checked atau sedang processing, jangan lakukan apa-apa
        if (checkedTantangans[index] || processing) return;

        // Buka modal dan simpan index serta ID tantangan yang dipilih
        setSelectedTantanganIndex(index);
        setSelectedTantanganId(tantanganId);
        setIsModalOpen(true);
    };

    const handleImageUpload = (file: File) => {
        if (selectedTantanganIndex === null || selectedTantanganId === null) return;

        setProcessing(true);

        const formData = new FormData();
        formData.append("anak_id", anak_id.toString());
        formData.append("tantangan_id", selectedTantanganId.toString());
        formData.append("image", file);

        const requestConfig = {
            headers: {
                "X-CSRF-TOKEN": csrf_token,
                // Tidak perlu set Content-Type karena FormData akan otomatis menanganinya
            },
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Tandai checkbox setelah upload berhasil
                const updatedTantangans = [...checkedTantangans];
                updatedTantangans[selectedTantanganIndex] = true;
                setCheckedTantangans(updatedTantangans);
                setProcessing(false);
                setIsModalOpen(false);
                setSelectedTantanganIndex(null);
                setSelectedTantanganId(null);
            },
            onError: (errors: any) => {
                console.error("Error uploading image:", errors);
                setProcessing(false);
                setIsModalOpen(false);
                setSelectedTantanganIndex(null);
                setSelectedTantanganId(null);
            },
            onFinish: () => setProcessing(false),
        };

        // Kirim POST request dengan FormData
        router.post("/anak-tantangan/upload", formData, requestConfig);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTantanganIndex(null);
        setSelectedTantanganId(null);
    };

    return (
        <Layout>
            <div key={fase.fase_id} className="w-full lg:p-8">
                <div className="w-full p-4 lg:p-8">
                    <div className="relative rounded-xl sm:ml-64 md:h-72 lg:pl-8">
                        <img
                            src={fase.banner}
                            className="mt-3 w-full h-36 md:h-full object-cover rounded-xl pb-0 md:p-0 lg:mt-5"
                            alt={fase.judul}
                        />
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl lg:left-8"></div>
                        <h2 className="absolute bottom-14 left-4 lg:left-14 text-xl lg:text-4xl font-extrabold text-white">
                            {fase.judul}
                        </h2>
                        <p className="absolute bottom-6 left-4 lg:left-14 text-xs lg:text-lg text-white font-medium mt-2">
                            {fase.subjudul}
                        </p>
                    </div>
                    <div className="p-1 sm:ml-64">
                        <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-3 lg:justify-between">
                            <div className="w-full lg:col-span-2 px-0 lg:px-7" id="card1">
                                <DetailChallengeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                                {activeTab === "Deskripsi" && (
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                                    >
                                        <div id="deskripsiSection">
                                            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                                Deskripsi Tantangan
                                            </h2>
                                            <p className="text-md lg:text-lg text-gray-600 leading-relaxed mb-8">
                                                {fase.deskripsi}
                                            </p>
                                            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">Benefit</h2>
                                            <ul className="space-y-3">
                                                {fase.benefits.map((benefit, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        className="flex items-start gap-3 font-medium text-gray-700"
                                                    >
                                                        <span className="flex-shrink-0 h-6 w-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                                                            <svg
                                                                className="w-4 h-4 text-pink-600"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="m5 12 4.7 4.5 9.3-9"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span>{benefit}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                                {(activeTab === "Tugas" || activeTab === "Makanan Challenges") && (
                                    <div id="tugasSection">
                                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mt-1">
                                            {activeTab === "Tugas"
                                                ? "Tugas yang harus diselesaikan:"
                                                : "Tugas Makanan yang harus diselesaikan:"}
                                        </h2>
                                        <div key={fase.fase_id} className="mt-5">
                                            <h3 className="text-lg font-semibold text-gray-800">{fase.judul}</h3>
                                            {fase.tantangans.map((tantangan, index) => (
                                                <label
                                                    key={tantangan.tantangan_id}
                                                    className="flex items-center gap-2 mt-2 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 text-pinky bg-gray-100 border-gray-300 rounded-md"
                                                        checked={checkedTantangans[index] || false}
                                                        onChange={() => handleCheckboxClick(index, tantangan.tantangan_id)}
                                                        disabled={checkedTantangans[index] || processing}
                                                    />
                                                    <span
                                                        className={`text-sm font-medium text-gray-900 ${
                                                            checkedTantangans[index] ? "line-through text-gray-500" : ""
                                                        }`}
                                                    >
                                                        {tantangan.activity}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <RightSide fase={fase} />
                        </div>
                    </div>
                </div>
            </div>
            <ImageUploadModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onUpload={handleImageUpload}
                title="Upload Bukti Tantangan"
            />
        </Layout>
    );
}
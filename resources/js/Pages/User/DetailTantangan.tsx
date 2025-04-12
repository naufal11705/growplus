import RightSide from "@/Components/Widget/RightSide";
import DetailChallengeTabs from "@/Components/Widget/Tabs/DetailChallengeTabs";
import ImageUploadModal from "@/Components/Widget/ModalChallenges";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";
import { Catatan } from "@/types/catatan";
import { router } from "@inertiajs/react";
import useCsrfToken from "@/Utils/csrfToken";
import { motion } from "framer-motion";

interface DetailTantanganProps {
    fase: Fase;
    tantangansDone: { anak_id: number; tantangan_id: number }[];
    anak_id: number;
    catatan: Catatan[];
}

export default function DetailTantangan({ fase, tantangansDone, anak_id, catatan }: DetailTantanganProps) {
    const csrf_token = useCsrfToken();
    const [activeTab, setActiveTab] = useState("Deskripsi");
    const [checkedTantangans, setCheckedTantangans] = useState<boolean[]>([]);
    const [processing, setProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTantanganIndex, setSelectedTantanganIndex] = useState<number | null>(null);
    const [selectedTantanganId, setSelectedTantanganId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [note, setNote] = useState(""); // New state for note input
    const [noteError, setNoteError] = useState<string | null>(null);
    

    useEffect(() => {
        if (fase.tantangans && fase.tantangans.length > 0) {
            const initialCheckedState = fase.tantangans.map((tantangan) =>
                tantangansDone.some((done) => done.tantangan_id === tantangan.tantangan_id)
            );
            setCheckedTantangans(initialCheckedState);
        }
    }, [fase, tantangansDone, anak_id]);

    const handleCheckboxClick = (index: number, tantanganId: number) => {
        if (checkedTantangans[index] || processing) return;

        setSelectedTantanganIndex(index);
        setSelectedTantanganId(tantanganId);
        setIsModalOpen(true);
    };

    const handleImageUpload = (file: File) => {
        if (selectedTantanganIndex === null || selectedTantanganId === null) return;

        setProcessing(true);
        setErrorMessage(null);

        const formData = new FormData();
        formData.append("anak_id", anak_id.toString());
        formData.append("tantangan_id", selectedTantanganId.toString());
        formData.append("gambar_url", file); // Changed to match backend expectation

        router.post(
            "/anak-tantangan",
            formData,
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    const updatedTantangans = [...checkedTantangans];
                    updatedTantangans[selectedTantanganIndex] = true;
                    setCheckedTantangans(updatedTantangans);
                    setIsModalOpen(false);
                    setSelectedTantanganIndex(null);
                    setSelectedTantanganId(null);
                    router.reload({ only: ["tantangansDone"] });
                },
                onError: (errors: any) => {
                    const errorDetails = Object.entries(errors)
                        .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                        .join("; ");
                    setErrorMessage(errorDetails || "Failed to upload image. Please try again.");
                    console.error("Detailed upload errors:", errors);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTantanganIndex(null);
        setSelectedTantanganId(null);
        setErrorMessage(null);
    };

    const handleNoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!note.trim()) {
            setNoteError("Catatan tidak boleh kosong");
            return;
        }

        setProcessing(true);
        setNoteError(null);

        router.post(
            "/catatan",
            {
                fase_id: fase.fase_id,
                anak_id: anak_id,
                catatan: note,
                _token: csrf_token,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setNote("");
                    setProcessing(false);
                },
                onError: (errors: any) => {
                    const errorDetails = Object.entries(errors)
                        .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
                        .join("; ");
                    setNoteError(errorDetails || "Gagal menyimpan catatan. Silakan coba lagi.");
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <Layout>
            <div key={fase.fase_id} className="w-full lg:p-8">
                <div className="w-full p-4 lg:p-8">
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {errorMessage}
                        </div>
                    )}
                    {processing && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
                            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                        </div>
                    )}
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
                                                        disabled={processing}
                                                    />
                                                    <span
                                                        className={`text-sm font-medium text-gray-900 ${checkedTantangans[index] ? "line-through text-gray-500" : ""}`}
                                                    >
                                                        {tantangan.activity}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Catatan" && (
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                                    >
                                        <div id="catatanSection">
                                            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                                Tuliskan Catatan
                                            </h2>
                                            {noteError && (
                                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                                    {noteError}
                                                </div>
                                            )}
                                            <form onSubmit={handleNoteSubmit}>
                                                <textarea
                                                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine"
                                                    placeholder="Tulis catatan Anda di sini..."
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    disabled={processing}
                                                ></textarea>
                                                <button
                                                    type="submit"
                                                    className="mt-4 px-4 py-2 bg-wine font-bold text-white rounded-lg hover:bg-dark-wine disabled:bg-blue-400 disabled:cursor-not-allowed"
                                                    disabled={processing}
                                                >
                                                    {processing ? "Menyimpan..." : "Simpan Catatan"}
                                                </button>
                                            </form>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                                            {Array.isArray(catatan) && catatan.length > 0 ? (
                                                catatan.map((noteItem, index) => (
                                                    <div
                                                        key={index} // Use index since id is not available
                                                        className="rounded-lg border border-gray-200 p-6 shadow-sm bg-white"
                                                    >
                                                        <div className="flex flex-col h-full justify-between">
                                                            <h3 className="text-lg font-medium text-gray-800 mb-8">
                                                                {noteItem.catatan}
                                                            </h3>
                                                            <div className="flex items-center justify-between mt-auto">
                                                                <span className="text-sm text-gray-600">
                                                                    {new Date(noteItem.tanggal).toLocaleDateString(
                                                                        "id-ID",
                                                                        {
                                                                            year: "numeric",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                </span>
                                                                {<a href="">
                                                                    <button
                                                                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                                                                        aria-label="Edit note"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                                                        </svg>
                                                                    </button>
                                                                </a>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-600">Belum ada catatan.</p>
                                            )}
                                        </div>
                                    </motion.div>
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
            {/* {isPreviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white shadow-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Preview Gambar</h2>
                            <button
                                onClick={handlePreviewModalClose}
                                className="rounded-full p-1 hover:bg-gray-100"
                                aria-label="Close"
                            >
                                <XIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        {previewImageUrl && (
                            <img
                                src={previewImageUrl}
                                alt="Uploaded Image"
                                className="w-full h-auto rounded-lg"
                            />
                        )}
                    </div>
                </div>
            )} */}
        </Layout>
    );
}
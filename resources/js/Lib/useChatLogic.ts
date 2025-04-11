import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Message {
    sender: string;
    text: string;
    image?: string;
}

interface ChatLogicReturn {
    messages: Message[];
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    image: string | null;
    setImage: Dispatch<SetStateAction<string | null>>;
    isLoading: boolean;
    isTyping: boolean;
    isRecording: boolean;
    recordingDuration: number;
    handleSend: () => Promise<void>;
    stopTyping: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    toggleRecording: () => void;
    recordedTranscripts: string[];
}

export const useChatLogic = (geminiApiKey: string): ChatLogicReturn => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "ai", text: "Halo! Saya bisa membantu Anda dengan pertanyaan seputar kehamilan. Apa yang ingin Anda tanyakan?" },
    ]);
    const [input, setInput] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [recordedTranscripts, setRecordedTranscripts] = useState<string[]>([]);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const fileRef = useRef<File | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
        listening,
    } = useSpeechRecognition();

    // Log status SpeechRecognition untuk debugging
    console.log("Browser supports speech recognition:", browserSupportsSpeechRecognition);
    console.log("Microphone available:", isMicrophoneAvailable);
    console.log("Listening state:", listening);

    // Update input secara real-time saat merekam menggunakan useEffect
    useEffect(() => {
        if (isRecording && transcript) {
            console.log("Current transcript:", transcript);
            setInput(transcript);
        }
    }, [isRecording, transcript]); // Hanya jalankan efek ini jika isRecording atau transcript berubah

    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const base64Data = base64String.split(",")[1];
                resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const callGeminiAPI = async (query: string, imageBase64?: string): Promise<string> => {
        if (!geminiApiKey) {
            return "Halo, maaf, API key tidak ditemukan. Silakan periksa konfigurasi.";
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/tunedModels/growpluskia-a9oj1rbwlrf0:generateContent?key=${geminiApiKey}`;

        try {
            const payload = {
                contents: [
                    {
                        parts: [
                            {
                                text: `Saya adalah AI yang hanya menjawab pertanyaan terkait kehamilan. Jika pertanyaan berikut tidak berkaitan dengan kehamilan, katakan: "Maaf, saya hanya menjawab pertanyaan tentang kehamilan." Pertanyaan: ${query}`,
                            },
                            ...(imageBase64
                                ? [
                                      {
                                          inlineData: {
                                              mimeType: "image/jpeg",
                                              data: imageBase64,
                                          },
                                      },
                                  ]
                                : []),
                        ],
                    },
                ],
            };

            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("API Response:", response.data);

            const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!content || content.trim() === "") {
                return "Halo, maaf, saya tidak mendapatkan jawaban yang valid dari API.";
            }

            return content;
        } catch (error: any) {
            console.error("Error calling Gemini API:", error.response?.data || error.message);
            return `Halo, maaf, terjadi kesalahan: ${error.message || "Tidak diketahui"}. Silakan coba lagi.`;
        }
    };

    const typeMessagePerWord = (text: string) => {
        if (!text || typeof text !== "string") {
            setMessages((prev) => [...prev, { sender: "ai", text: "Halo, maaf, terjadi kesalahan saat menampilkan pesan." }]);
            return;
        }

        const words = text.split(" ").filter((word) => word);
        let currentIndex = 0;

        setMessages((prev) => [...prev, { sender: "ai", text: "" }]);
        setIsTyping(true);

        typingIntervalRef.current = setInterval(() => {
            if (currentIndex < words.length) {
                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    lastMessage.text = currentIndex === 0 ? words[currentIndex] : `${lastMessage.text} ${words[currentIndex]}`;
                    return updatedMessages;
                });
                currentIndex++;
            } else {
                clearInterval(typingIntervalRef.current!);
                setIsTyping(false);
            }
        }, 500);
    };

    const stopTyping = () => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            setIsTyping(false);
            typingIntervalRef.current = null;
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            console.log("Stopping speech recognition");
            try {
                SpeechRecognition.stopListening();
                setIsRecording(false);
                if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
                startTimeRef.current = null;
                resetTranscript();
                console.log("Final transcript:", input);
            } catch (error) {
                console.error("Error stopping speech recognition:", error);
                setMessages((prev) => [
                    ...prev,
                    { sender: "ai", text: "Halo, maaf, terjadi kesalahan saat menghentikan perekaman." },
                ]);
            }
        } else {
            if (!browserSupportsSpeechRecognition) {
                console.log("Speech recognition not supported in this browser");
                typeMessagePerWord("Halo, maaf, speech-to-text tidak didukung di browser ini. Silakan gunakan Chrome.");
                return;
            }
            if (!isMicrophoneAvailable) {
                console.log("Microphone not available or access denied");
                typeMessagePerWord("Halo, maaf, mikrofon tidak tersedia atau akses ditolak. Pastikan mikrofon Anda terhubung dan diizinkan.");
                return;
            }
            console.log("Starting speech recognition");
            try {
                setIsRecording(true);
                setRecordingDuration(0);
                setInput("");
                startTimeRef.current = Date.now();
                durationIntervalRef.current = setInterval(() => {
                    if (startTimeRef.current) {
                        setRecordingDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
                    }
                }, 1000);
                SpeechRecognition.startListening({ language: "id-ID", continuous: true, interimResults: true });
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                setIsRecording(false);
                typeMessagePerWord("Halo, maaf, terjadi kesalahan saat memulai perekaman. Silakan coba lagi.");
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        stopTyping();
        setMessages((prev) => [...prev, { sender: "user", text: input, image: image || undefined }]);
        setInput("");
        setIsLoading(true);

        let imageBase64: string | undefined;
        if (fileRef.current) {
            try {
                imageBase64 = await convertImageToBase64(fileRef.current);
            } catch (error) {
                console.error("Error converting image:", error);
                setIsLoading(false);
                typeMessagePerWord("Halo, maaf, gagal memproses gambar.");
                return;
            }
        }

        setImage(null);
        fileRef.current = null;

        try {
            const aiResponse = await callGeminiAPI(input, imageBase64);
            typeMessagePerWord(aiResponse);
        } catch (error) {
            console.error("Error in handleSend:", error);
            typeMessagePerWord("Halo, maaf, terjadi kesalahan saat mengirim pesan.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            fileRef.current = file;
            setImage(URL.createObjectURL(file));
        }
    };

    return {
        messages,
        input,
        setInput,
        image,
        setImage,
        isLoading,
        isTyping,
        isRecording,
        recordingDuration,
        handleSend,
        stopTyping,
        handleKeyDown,
        handleImageUpload,
        toggleRecording,
        recordedTranscripts,
    };
};
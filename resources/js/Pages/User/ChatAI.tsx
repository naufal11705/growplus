import { useState } from "react";
import ProfileAI from "../../../assets/images/AiProfile.png";
import Layout from "@/Layouts/Layout";
import axios from "axios";

// Definisikan tipe kustom untuk props yang diterima dari Inertia
interface ChatPageProps {
    geminiApiKey: string;
}

export default function User({ geminiApiKey }: ChatPageProps) {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
        { sender: "ai", text: "Halo! Saya bisa membantu Anda dengan pertanyaan seputar kehamilan. Apa yang ingin Anda tanyakan?" },
    ]);
    const [input, setInput] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isGreeting = (text: string): boolean => {
        const greetings = ["selamat pagi", "selamat siang", "selamat malam", "halo", "hai", "hi"];
        return greetings.some((greeting) => text.toLowerCase().includes(greeting));
    };

    const isPregnancyRelated = (text: string): boolean => {
        const keywords = ["hamil", "kehamilan", "bayi", "melahirkan", "trimester", "janin", "ibu hamil", "persalinan", "prenatal"];
        return keywords.some((keyword) => text.toLowerCase().includes(keyword));
    };

    const callGeminiAPI = async (query: string): Promise<string> => {
        if (!geminiApiKey) {
            return "Halo, maaf, API key tidak ditemukan. Silakan periksa konfigurasi.";
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`;

        try {
            const response = await axios.post(
                url,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Jawab pertanyaan berikut hanya jika berkaitan dengan kehamilan: ${query}`,
                                },
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("API Response:", JSON.stringify(response.data, null, 2));

            const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!content) {
                return "Halo, maaf, tidak ada jawaban yang ditemukan dari API.";
            }
            return `Halo, ${content}`;
        } catch (error: any) {
            console.error("Error calling Gemini API:", {
                message: error.message,
                response: error.response ? error.response.data : null,
                status: error.response ? error.response.status : null,
            });
            return `Halo, maaf, terjadi kesalahan: ${error.message}. Silakan coba lagi.`;
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: "user", text: input }]);
        setInput("");
        setIsLoading(true);

        if (isGreeting(input)) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { sender: "ai", text: `Halo, ${input.toLowerCase()} juga! Bagaimana saya bisa membantu Anda dengan pertanyaan seputar kehamilan hari ini?` },
                ]);
                setIsLoading(false);
            }, 1000);
            return;
        }

        if (!isPregnancyRelated(input)) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { sender: "ai", text: "Halo, maaf, saya hanya bisa menjawab pertanyaan tentang kehamilan. Silakan ajukan pertanyaan terkait kehamilan!" },
                ]);
                setIsLoading(false);
            }, 1000);
            return;
        }

        const aiResponse = await callGeminiAPI(input);
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 mt-8">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900">Chat AI Kehamilan</h2>
                    <div className={`border-t border-gray-300 pt-10 overflow-y-auto lg:mt-6 mt-5 space-y-7 ${image ? "h-[550px]" : "h-[660px]"}`}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start space-x-4`}>
                                {msg.sender === "ai" && (
                                    <div className="flex items-start space-x-4">
                                        <img src={ProfileAI} alt="AI Profile" className="w-8 h-8 rounded-full border border-gray-300" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-extrabold text-gray-600">AI</span>
                                            <div className="max-w-md p-3 rounded-xl font-bold text-sm bg-gray-200 text-gray-900 break-words whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                    </div>
                                )}
                                {msg.sender === "user" && (
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col gap-1 items-end">
                                            <span className="text-xs font-extrabold text-gray-600">You</span>
                                            <div className="lg:max-w-md max-w-64 p-3 rounded-xl font-bold text-sm bg-wine text-white break-words whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                                            alt="User Profile"
                                            className="w-8 h-8 object-cover rounded-full border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start items-start space-x-4">
                                <img src={ProfileAI} alt="AI Profile" className="w-8 h-8 rounded-full border border-gray-300" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-extrabold text-gray-600">AI</span>
                                    <div className="flex space-x-2 p-3 rounded-xl bg-gray-200">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex flex-col items-start border-t border-gray-300 pt-3">
                        <div className="flex flex-row items-end space-y-2 gap-3">
                            <button
                                type="button"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-3 py-3 mt-2"
                                onClick={() => document.getElementById("imageInput")?.click()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-wine transition duration-75">
                                    <path
                                        fillRule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {image && (
                                <div className="relative w-40 h-40">
                                    <img src={image} alt="Preview" className="w-full h-full rounded-xl border border-gray-300 object-cover" />
                                    <button
                                        onClick={() => setImage(null)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                            <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                        <div className="flex w-full mt-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanyakan sesuatu tentang kehamilan..."
                                className="flex-1 p-2 bg-gray-200 text-gray-900 font-medium border border-gray-300 rounded-xl outline-none"
                            />
                            <button onClick={handleSend} className="ml-2 bg-wine text-white px-4 py-2 rounded-xl hover:bg-dark-wine transition duration-200">
                                Kirim
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
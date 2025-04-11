import ProfileAI from "../../../assets/images/AiProfile.png";
import Layout from "@/Layouts/Layout";
import { useChatLogic } from "@/Lib/useChatLogic";
import { useEffect, useRef } from "react";

interface ChatPageProps {
    geminiApiKey: string;
}

export default function User({ geminiApiKey }: ChatPageProps) {
    const {
        messages,
        input,
        setInput,
        image,
        setImage,
        isLoading,
        isTyping,
        handleSend,
        stopTyping,
        handleKeyDown,
        handleImageUpload,
        toggleRecording,
        isRecording,
        recordingDuration,
        recordedTranscripts,
    } = useChatLogic(geminiApiKey);

    const isButtonDisabled = !input?.trim();
    const isAIResponding = isLoading || isTyping;
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        if (isAIResponding) {
            console.log("Stopping AI response");
            stopTyping();
        } else {
            handleSend();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (recordedTranscripts.length > 0) {
            console.log("Updated recorded transcripts:", recordedTranscripts);
        }
    }, [recordedTranscripts]);

    console.log("Rendering ChatAI with state:", { messages, input, image, isLoading, isTyping, isRecording });

    return (
        <Layout>
            <div className="lg:pl-8 lg:pt-8 p-1 sm:ml-64 mt-8">
                <div className="">
                    <div className="bg-white shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <span className="bg-gradient-to-r from-wine/10 to-wine/20 p-2 rounded-lg mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-wine"
                                    >
                                        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                                        <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                                    </svg>
                                </span>
                                Chat AI Kehamilan
                            </h2>
                        </div>

                        <div
                            ref={chatContainerRef}
                            className={`px-6 py-6 ${image ? "h-[592px]" : "h-[765px]"} overflow-y-auto bg-gray-50/50 space-y-6`}
                        >
                            {messages?.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start space-x-4 animate-fadeIn`}
                                    >
                                        {msg.sender === "ai" && (
                                            <div className="flex items-start space-x-3 max-w-[80%]">
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={ProfileAI || "/placeholder.svg"}
                                                        alt="AI Profile"
                                                        className="w-9 h-9 rounded-full border border-gray-200 shadow-sm p-0.5 bg-white"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/placeholder.svg";
                                                            console.error("Failed to load AI Profile image");
                                                        }}
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-medium text-gray-500">AI Assistant</span>
                                                    <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap">
                                                        {msg.text || "Pesan kosong"}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {msg.sender === "user" && (
                                            <div className="flex items-start space-x-3 max-w-[80%]">
                                                <div className="flex flex-col gap-1 items-end">
                                                    <span className="text-xs font-medium text-gray-500">You</span>
                                                    {msg.image && (
                                                        <div className="mb-2 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                            <img
                                                                src={msg.image || "/placeholder.svg"}
                                                                alt="User uploaded"
                                                                className="w-40 h-40 object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = "/placeholder.svg";
                                                                    console.error("Failed to load user uploaded image");
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-3.5 rounded-2xl bg-wine text-white shadow-sm text-sm leading-relaxed break-words whitespace-pre-wrap">
                                                        {msg.text || "Pesan kosong"}
                                                    </div>
                                                </div>
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                                                        alt="User Profile"
                                                        className="w-9 h-9 object-cover rounded-full border border-gray-200 shadow-sm p-0.5 bg-white"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/placeholder.svg";
                                                            console.error("Failed to load user profile image");
                                                        }}
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500">Tidak ada pesan.</div>
                            )}
                            {isLoading && (
                                <div className="flex justify-start items-start space-x-3 max-w-[80%] animate-fadeIn">
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={ProfileAI || "/placeholder.svg"}
                                            alt="AI Profile"
                                            className="w-9 h-9 rounded-full border border-gray-200 shadow-sm p-0.5 bg-white"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.svg";
                                                console.error("Failed to load AI Profile image during loading");
                                            }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-500">AI Assistant</span>
                                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                                            <div className="flex space-x-2">
                                                <div
                                                    className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                                    style={{ animationDelay: "0s" }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                                    style={{ animationDelay: "0.2s" }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                                    style={{ animationDelay: "0.4s" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 bg-white">
                            <div className="flex flex-col space-y-3">
                                {image && (
                                    <div className="relative w-40 h-40 mx-2 animate-fadeIn">
                                        <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                            <img
                                                src={image || "/placeholder.svg"}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.svg";
                                                    console.error("Failed to load preview image");
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => setImage(null)}
                                            className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors duration-200 border border-gray-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={toggleRecording}
                                        className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                            isRecording
                                                ? "bg-wine text-white focus:ring-wine/50"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-400/50"
                                        }`}
                                    >
                                        <svg
                                            className="w-5 h-5 transition duration-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 8a1 1 0 0 1 1 1v3a4.006 4.006 0 0 0 4 4h4a4.006 4.006 0 0 0 4-4V9a1 1 0 1 1 2 0v3.001A6.006 6.006 0 0 1 14.001 18H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H9.999A6.006 6.006 0 0 1 4 12.001V9a1 1 0 0 1 1-1Z"
                                                clipRule="evenodd"
                                            />
                                            <path d="M7 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V6Z" />
                                        </svg>
                                        {isRecording && (
                                            <span className="absolute -top-2 -right-2 bg-white text-wine text-xs font-medium rounded-full px-2 py-0.5 border border-wine/20 shadow-sm animate-pulse">
                                                {recordingDuration}s
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2"
                                        onClick={() => document.getElementById("imageInput")?.click()}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 transition duration-200"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={input || ""}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Tanyakan sesuatu tentang kehamilan..."
                                            className="w-full py-2.5 px-4 pr-12 bg-gray-100 text-gray-800 border-0 rounded-full focus:ring-2 focus:ring-wine/30 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                                        />
                                        <button
                                            onClick={handleButtonClick}
                                            className={`absolute right-1 top-1 p-1.5 rounded-full transition-all duration-300 ${
                                                isButtonDisabled && !isAIResponding
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : isAIResponding
                                                    ? "bg-red-500 text-white hover:bg-red-600"
                                                    : "bg-wine text-white hover:bg-wine/90"
                                            }`}
                                            disabled={isButtonDisabled && !isAIResponding}
                                        >
                                            {isAIResponding ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";
import Layout from "../../Layouts/Layout";

export default function ScanBarcode() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
    const [barcode, setBarcode] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<any>(null);
    const [isCameraVisible, setIsCameraVisible] = useState<boolean>(true); // State untuk kontrol kamera

    useEffect(() => {
        codeReaderRef.current = new BrowserMultiFormatReader();

        const startScanner = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === "videoinput");

                console.log("Detected video devices:", videoDevices);

                if (videoDevices.length > 0) {
                    const selectedDeviceId = videoDevices[0].deviceId;
                    await codeReaderRef.current!.decodeFromVideoDevice(
                        selectedDeviceId,
                        videoRef.current!,
                        (result) => {
                            if (result) {
                                console.log("Barcode detected:", result.getText());
                                setBarcode(result.getText());
                                fetchFoodData(result.getText());
                            }
                        }
                    );
                } else {
                    console.error("No video input devices found.");
                }
            } catch (error) {
                console.error("Error initializing barcode scanner:", error);
            }
        };

        startScanner();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    async function fetchFoodData(barcode: string) {
        try {
            console.log(`Fetching data for barcode: ${barcode}`);
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            const data = await response.json();
            if (data.status === 1) {
                setFoodData(data.product);
                setIsCameraVisible(false); // Hide camera after product is found
            } else {
                setFoodData(null);
            }
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-10">Scan Barcode</h2>

                    {/* Only show the camera if `isCameraVisible` is true */}
                    {isCameraVisible && (
                        <video ref={videoRef} className="w-[1000px] h-auto border border-gray-200 rounded-3xl" />
                    )}

                    {barcode && <p className="mt-4 font-bold">Barcode: {barcode}</p>}

                    {foodData ? (
                        <>
                            <div className="mt-4 p-6 border border-gray-200 rounded-xl w-full flex flex-col text-left">
                                <div className="lg:flex lg:flex-row flex flex-col lg:gap-10">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{foodData.product_name}</h3>
                                        <img
                                            src={foodData.image_url || "https://via.placeholder.com/150"}
                                            alt={foodData.product_name}
                                            className="w-56 h-56 object-cover rounded-md mb-4"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-semibold text-gray-800 mb-3">Kandungan Nutrisi</h4>
                                        <div className="space-y-2">
                                            <p><strong>Kalori:</strong> {foodData.nutriments?.energy_kcal || "Tidak tersedia"} kcal</p>
                                            <p><strong>Protein:</strong> {foodData.nutriments?.proteins || "Tidak tersedia"} g</p>
                                            <p><strong>Lemak:</strong> {foodData.nutriments?.fat || "Tidak tersedia"} g</p>
                                            <p><strong>Karbohidrat:</strong> {foodData.nutriments?.carbohydrates || "Tidak tersedia"} g</p>
                                        </div>
                                        {foodData.ingredients_text && (
                                            <div className="mt-6">
                                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Bahan-Bahan</h4>
                                                <p>{foodData.ingredients_text || "Tidak tersedia"}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <a href="/user/scan-barcode" className="inline-flex items-center px-4 py-2 mt-10 text-sm font-medium text-white bg-wine rounded-lg hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">
                                Kembali
                            </a>
                        </>
                    ) : (
                        barcode && <p className="mt-4">Data tidak ditemukan</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

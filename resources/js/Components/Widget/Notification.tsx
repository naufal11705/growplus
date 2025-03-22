import { Imunisasi } from "@/types/imunisasi";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

interface NotificationProps {
    domUser: string;
}

export default function Notification({ domUser }: NotificationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifcations] = useState<Imunisasi[]>([]);
    useEffect(() => {
        const pusher = new Pusher('PUSHER_APP_KEY', {
            cluster: "PUSHER_APP_CLUSTER",
            encrypted: true
        }) as any;

        const channel = pusher.subscribe(`imunisasi.${domUser}`);

        channel.bind("App\\Events\\ImunisasiNotification", (data: any) => {
            setNotifcations((prev: Imunisasi[]) => [
                ...prev,
                {
                    nama: data.nama || 'Imunisasi Gratis',
                    jenis: data.jenis || 'Corona',
                    tanggal: data.tanggal || 'Senin, 10 Maret 2025',
                    puskesmas: data.puskesmas || 'Puskesmas Singosari',
                    alamat: data.alamat || '',
                } as Imunisasi,
            ]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [domUser]);
    return (
        <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)} className="bg-gray-200 p-2 rounded-full text-gray-500 hover:bg-wine hover:text-white transition-all duration-200 cursor-pointer">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                </svg>
            </div>
            <div className={`absolute right-0 top-full mt-2 w-80 bg-gray-50 border border-gray-200 rounded-xl shadow-sm ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-4 flex flex-col font-medium">
                    <div className="flex">
                        <div className="w-10 h-10 flex items-center justify-center text-wine bg-[#411a2d3b] font-medium rounded-full text-sm text-center me-2">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                            </svg>
                        </div>
                        <div className="flex text-center justify-center items-center flex-col">
                            {notifications.length === 0 ? (
                                <p className="text-gray-900 text-sm font-semibold text-center">Belum ada notifikasi</p>
                            ) : (
                                notifications.map((notification, i) => (
                                    <div key={i}>
                                        <p className="text-gray-900 text-sm font-semibold">{notification.nama}</p>
                                        {/* <p className="text-gray-700 text-sm">Jangan lupa imunisasi rutin untuk anak Anda! Pastikan datang tepat waktu untuk menjaga kesehatannya.</p> */}
                                        <p className="text-gray-500 text-xs mt-1">📍 {notification.alamat}</p>
                                        <p className="text-gray-500 text-xs mt-2">📅 {notification.tanggal} | ⏰ 08:00 - 12:00 WIB</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <hr className="h-px my-4 bg-gray-300 border-0" />
                </div>
            </div>
        </div>
    );
}

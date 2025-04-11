// resources/js/Components/Sidebar.jsx
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Sidebar({
    isOpen,
    toggleSidebar,
}: {
    isOpen: boolean;
    toggleSidebar: () => void;
}) {
    const [isOpenPuskesmas, setIsOpenPuskesmas] = useState(false);
    const [isOpenPengguna, setIsOpenPengguna] = useState(false);

    const puskesmasDropdown = () => {
        setIsOpenPuskesmas(!isOpenPuskesmas);
    };

    const penggunaDropdown = () => {
        setIsOpenPengguna(!isOpenPengguna);
    };

    const handleLogout = (e: any) => {
        e.preventDefault();
        router.post(route("logout"));
        toggleSidebar(); // Tutup sidebar setelah logout
    };

    const handleMenuClick = () => {
        toggleSidebar(); // Tutup sidebar saat menu diklik
    };

    return (
        <>
            <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-40 lg:w-72 md:w-60 sm:w-56 h-screen transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto mt-3 bg-gray-50">
                    <ul className="space-y-2 font-bold md:mt-14">
                        <li>
                            <a href="/petugas/imunisasi" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd" />
                                </svg>
                                <span className="ms-3">Imunisasi</span>
                            </a>
                        </li>
                        <li>
                            <a href="/petugas/chat" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
                                </svg>
                                <span className="ms-3">Chat</span>
                            </a>
                        </li>
                        <li>
                            <a href="/petugas/laporan" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
                                </svg>
                                <span className="ms-3">Laporan</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-bold border-t border-gray-200">
                        <li>
                            <a href="/petugas/profile" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-5 h-5 text-gray-500 transition duration-75">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                                <span className="ms-3">Profil</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="flex items-center p-2 text-red-500 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="shrink-0 w-5 h-5 text-red-500 transition duration-75">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                <span className="ms-3">Keluar</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Overlay untuk Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}

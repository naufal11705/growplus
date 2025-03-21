import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e: any) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-xl sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 lg:w-72 md:w-60 sm:w-56 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <ul className="space-y-2 font-bold mt-14">
                        <li>
                            <a href="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/artikel" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clip-rule="evenodd" />
                                </svg>
                                <span className="ms-3">Artikel</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/fase" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Fase</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/tantangan" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Tantangan</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" onClick={toggleDropdown} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c-.5523 0-1 .4477-1 1s.4477 1 1 1 1-.4477 1-1-.4477-1-1-1Z" />
                                    <path fill-rule="evenodd" d="M17 4c-.5523 0-1 .44772-1 1v4.97045l-4-4.92309-5.34889 6.58324c-.18989.2337-.47499.3694-.77612.3694H3v7c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-7h-2.875c-.0421 0-.0838-.0026-.125-.0078V9h3c.5523 0 1-.44772 1-1V5c0-.55228-.4477-1-1-1h-4Zm-8.00001 9c0-1.6568 1.34311-3 3.00001-3 1.6568 0 3 1.3432 3 3 0 1.6569-1.3432 3-3 3-1.6569 0-3.00001-1.3431-3.00001-3Z" clip-rule="evenodd" />
                                    <path d="M5.2 6.40001 2.5 10h2.89902l3.25-3.99999H6c-.31476 0-.61115.1482-.8.4Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Puskesmas</span>
                                <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
                                <li>
                                    <a href="/admin/puskesmas" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Puskesmas</a>
                                </li>
                                <li>
                                    <a href="/admin/imunisasi" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Imunisasi</a>
                                </li>
                                <li>
                                    <a href="/admin/faskes" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100">Faskes</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-bold border-t border-gray-200">
                        <li>
                            <a href="/profil" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 w-5 h-5 text-gray-500 transition duration-75">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                                </svg>
                                <span className="ms-3">Profil</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="flex items-center p-2 text-red-500 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="shrink-0 w-5 h-5 text-red-500 transition duration-75">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                <span className="ms-3">Keluar</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

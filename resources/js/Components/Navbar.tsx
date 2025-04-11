import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { auth } = usePage().props as any;
    const isLoggedIn = !!auth?.user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = (e: any) => { 
        e.preventDefault(); 
        router.post(route('logout')); 
    };
    
    const toggleDropdown = () => { 
        setIsDropdownOpen(!isDropdownOpen); 
    };
    
    const closeDropdown = () => { 
        setIsDropdownOpen(false); 
    };
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleOutsideClick = (e: any) => { 
        if (!e.target.closest('#user-menu-button') && !e.target.closest('#user-dropdown')) 
            closeDropdown(); 
    };

    useEffect(() => {
        if (isDropdownOpen) 
            document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isDropdownOpen]);

    return (
        <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap">Grow+</span>
                </a>
                <div className="flex flex-row md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {isLoggedIn ? (
                        <div className="relative items-center justify-center flex">
                            <button 
                                type="button" 
                                className="flex rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" 
                                id="user-menu-button" 
                                onClick={toggleDropdown} 
                                aria-expanded={isDropdownOpen}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img 
                                    className="w-8 h-8 rounded-full" 
                                    src={auth.user.profile_photo_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    alt="user photo" 
                                />
                            </button>
                            <div 
                                className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-52 border border-gray-200 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm`} 
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">{auth.user.name}</span>
                                    <span className="block text-sm text-gray-500 truncate">{auth.user.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    {(() => {
                                        if (auth.user.role_id === 1) {
                                            return (
                                                <li>
                                                    <a 
                                                        href="/admin/dashboard" 
                                                        onClick={closeDropdown} 
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </li>
                                            );
                                        } else if (auth.user.role_id === 3) {
                                            return (
                                                <li>
                                                    <a 
                                                        href="/admin/petugas" 
                                                        onClick={closeDropdown} 
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li>
                                                    <a 
                                                        href="/dashboard" 
                                                        onClick={closeDropdown} 
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Dashboard
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })()}
                                    <li>
                                        <a 
                                            href="#" 
                                            onClick={(e) => { handleLogout(e); closeDropdown(); }} 
                                            className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                        >
                                            Keluar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <a href="/login">
                            <button 
                                type="button" 
                                className="lg:block hidden text-white bg-wine hover:bg-dark-wine font-medium rounded-xl text-md px-6 py-2 text-center"
                            >
                                Login
                            </button>
                        </a>
                    )}
                    <button 
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
                        onClick={toggleMenu}
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a href="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-wine md:p-0">Home</a>
                        </li>
                        <li>
                            <a href="/artikel" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-wine md:p-0">Artikel</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div 
                className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                } md:hidden`}
                id="mobile-menu"
            >
                <div className="flex justify-end p-6">
                    <button 
                        onClick={closeMenu}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className="flex flex-col items-center justify-center h-[calc(100%-4rem)] space-y-8 text-lg font-medium">
                    <li>
                        <a href="/" onClick={closeMenu} className="text-gray-900 hover:text-wine">Home</a>
                    </li>
                    <li>
                        <a href="/artikel" onClick={closeMenu} className="text-gray-900 hover:text-wine">Artikel</a>
                    </li>
                    {!isLoggedIn && (
                        <li className="px-8 py-2 rounded-xl bg-wine hover:bg-dark-wine">
                            <a href="/login" onClick={closeMenu} className="text-white">Login</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
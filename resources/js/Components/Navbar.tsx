import { router } from "@inertiajs/react";

export default function Navbar() {

    const handleLogout = (e: any) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 bg-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap">Grow+</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <a href="/login">
                        <button type="button" className="lg:block hidden text-white bg-wine hover:bg-dark-wine font-medium rounded-xl text-md px-6 py-2 text-center">
                            Login
                        </button>
                    </a>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
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
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-wine md:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-wine md:p-0">Contact</a>
                        </li>
                        {/* <li>
                            <button type="button" onClick={handleLogout} className="flex items-center p-2 text-red-500 transition duration-75 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="shrink-0 w-5 h-5 text-red-500 transition duration-75">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                <span className="ms-3">Keluar</span>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default function Promotion() {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="lg:grid lg:grid-cols-2 justify-between p-4">
                    <div>
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Jangan Lewatkan Rahasia <span className="text-wine">Hidup Sehat!</span></h1>
                        <p className="text-lg font-normal text-gray-500 lg:text-xl">Masukkan email Anda dan dapatkan rekomendasi makanan sehat terbaik.</p>
                    </div>
                    <div>
                        <form className="max-w-sm mx-auto lg:mt-0 mt-5">
                            <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pinky focus:border-pinky block w-full ps-10 p-2.5" placeholder="name@flowbite.com" />
                            </div>
                            <button type="button" className="px-6 py-2.5 mt-5 text-base font-medium text-center text-white bg-wine rounded-lg hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">Berlangganan</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

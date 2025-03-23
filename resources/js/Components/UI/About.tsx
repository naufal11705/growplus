import AboutUs from "../../../assets/images/AboutUs.png"
import Presentase from "@/Components/Widget/Card_Presentase";
export default function About() {
    return (
        <section className="">
            <div className="px-4 mx-auto max-w-screen-xl">
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 mb-8">
                    <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 items-center">
                        <div>
                            <p className="lg:text-lg text-md font-extrabold text-gray-400 mb-1">About us</p>
                            <h1 className="text-gray-900 text-4xl md:text-5xl font-extrabold mb-5">
                                Grow+ – Makan Sehat, Hidup <span className="underline decoration-wine decoration-wavy">Lebih Baik!</span>
                            </h1>
                            <p className="text-lg font-bold text-gray-500 mb-6">
                                Grow+ hadir sebagai solusi pintar untuk membantu Anda memahami gizi dalam setiap makanan yang dikonsumsi. Dengan teknologi terkini, kami memberikan rekomendasi makanan yang sesuai dengan kebutuhan kesehatan, pola makan, dan gaya hidup Anda. Dari kalkulator nutrisi hingga analisis stunting, Grow+ membantu Anda membuat keputusan makanan yang lebih sehat dan bijak.
                            </p>
                            <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-xl bg-wine hover:bg-dark-wine focus:ring-4 focus:ring-light-pinky">
                                Lihat Fitur
                                <svg className="w-3.5 h-3.5 ms-2 -rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex justify-center lg:block hidden">
                            <img src={AboutUs} alt="About Us Illustration" className="mx-auto" />
                        </div>
                    </div>
                </div>
                <Presentase />
                <hr className="h-px my-8 bg-gray-200 border-0" />
            </div>
        </section>
    );
}

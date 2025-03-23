import About from "@/Components/UI/About";
import Category from "@/Components/UI/Category";
import Features from "@/Components/UI/Features";
import Promotion from "@/Components/UI/Promotion";
import Ads from "@/Components/Widget/Ads";
import Banner from "@/Components/Widget/Banner";
import Layout from "@/Layouts/Anonymous";
import { Fase } from "@/types/fase";
import { fases as defaultFases } from "@/Data/FaseCard";

interface FaseCardsProps {
    fases?: Fase[];
}

export default function Index({ fases: propFases }: FaseCardsProps) {
    const dataFase = propFases ?? defaultFases;

    return (
        <>
            <Layout>
                <section className="lg:mt-24 mt-20">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-center lg:py-16">
                        <h1 className="lg:mb-6 mb-5 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                            Bersama <span className="underline decoration-wavy decoration-wine">Grow+</span>, cegah stunting <br /> sejak dini 👶🏽 <br />

                        </h1>
                        <p className="lg:mb-10 mb-7 text-lg font-normal lg:px-56 text-gray-500 lg:text-xl">Grow+ hadir sebagai pendamping ibu hamil dan anak usia dini menuju kesehatan optimal, karena setiap langkah kecil hari ini adalah investasi besar untuk masa depan generasi Indonesia!</p>
                        <div className="flex flex-row lg:justify-center">
                            <a href="#" className="inline-flex justify-center items-center lg:py-5 lg:px-9 lg:text-xl text-md py-3 px-7 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine">
                                Kerjakan Tantangan  ⚔️
                            </a>
                            <a href="#" className="inline-flex transition-transform duration-300 hover:rotate-[360deg] justify-center items-center lg:py-5 lg:px-6 lg:text-xl text-lg py-4 px-4 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine">
                                <svg className="w-5 h-5 -rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                <Banner />
                <Category fases={dataFase} />
                <About />
                <Features />
                <Ads />
                <Promotion />
            </Layout>
        </>
    );
}

import React from "react";
import TantanganCards from "../Widget/Tantangan_Card";
import { challenges } from "@/Data/ChallengeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Category() {
    const challengesNoProgress = challenges.map(challenge => ({
        ...challenge,
        progress: 0
    }));

    return (
        <section className="lg:mt-10 mt-5">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-center lg:py-16">
                <h1 className="lg:mb-2 mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    Challenge Disini
                </h1>
                <p className="lg:mb-10 mb-7 text-lg font-normal lg:px-80 text-gray-500 lg:text-xl">
                    Setiap hidangan memiliki kandungan gizi yang berbeda, pastikan Anda memilih yang paling sesuai dengan kebutuhan kesehatan Anda
                </p>

                <Swiper
                    spaceBetween={20} 
                    slidesPerView={1}
                    freeMode={true}
                    grabCursor={true}
                    simulateTouch={true}
                    touchEventsTarget="container"
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="w-full !flex !justify-center text-left"
                >
                    {challengesNoProgress.map((challenge, index) => (
                        <SwiperSlide key={index}>
                            <TantanganCards challenges={[challenge]} gridCols="xl:grid-cols-1" />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide>
                        <div className="bg-white rounded-2xl border-2 border-gray-100 flex flex-col h-[585px] items-center justify-center">
                            <button type="button" className="bg-gray-100 text-gray-300 hover:text-gray-400 transition-transform duration-300 hover:rotate-[360deg] hover:bg-gray-200 font-medium rounded-full text-sm p-6 text-center inline-flex items-center me-2 w-26">
                                <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </button>
                            <h1 className="mt-5 font-medium text-xl">Jelajahi Challenge Lainnya</h1>
                        </div>
                    </SwiperSlide>
                </Swiper>

            </div>
        </section>
    );
}

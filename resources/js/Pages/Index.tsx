import About from "@/Components/UI/About";
import Category from "@/Components/UI/Category";
import Features from "@/Components/UI/Features";
import Promotion from "@/Components/UI/Promotion";
import Ads from "@/Components/Widget/Ads";
import Banner from "@/Components/Widget/Banner";
import Layout from "@/Layouts/Anonymous";
export default function Index() {
    return (
        <>
            <Layout>
                <section className="lg:mt-24 mt-20">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-center lg:py-16">
                        <h1 className="lg:mb-6 mb-5 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                            Temukan Nutrisi Seimbang dengan <br />
                            <span className="underline decoration-wavy decoration-wine">Grow+</span> 😱
                        </h1>
                        <p className="lg:mb-10 mb-7 text-lg font-normal lg:px-56 text-gray-500 lg:text-xl">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                        <div className="flex flex-row lg:justify-center">
                            <a href="#" className="inline-flex justify-center items-center lg:py-5 lg:px-9 lg:text-xl text-md py-3 px-7 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine">
                                Kerjakan Tantangan ⚔️
                            </a>
                            <a href="#" className="inline-flex transition-transform duration-300 hover:rotate-[360deg] justify-center items-center lg:py-5 lg:px-6 lg:text-xl text-lg py-4 px-4 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine">
                                <svg className="w-5 h-5 -rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                <Banner />
                <Category />
                <About />
                <Features />
                <Ads />
                <Promotion />
            </Layout>
        </>
    );
}

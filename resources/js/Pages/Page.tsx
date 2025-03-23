import Layout from "@/Layouts/Anonymous";
import { Article } from "@/types/article";
import { useEffect, useState } from 'react';

interface ArtikelProps {
    article: Article
}

const Page: React.FC<ArtikelProps> = ({ article }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <Layout>
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="w-full h-0 bg-gray-200">
                    <div
                        className="h-1 bg-wine transition-all duration-200 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>
            <section className="lg:mt-24 mt-20 bg-white">
                <div key={article.id} className="py-8 px-4 mx-auto max-w-screen-xl lg:text-left lg:py-16">
                    <a href="/artikel">
                        <button type="button" className="text-gray-900 bg-white flex flex-row items-center justify-center text-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-3 py-2.5 me-2 mb-10">
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                            </svg>
                            Kembali ke Artikel
                        </button>
                    </a>
                    <span className="bg-wine bg-opacity-50 px-4 py-2 text-xs text-white rounded-full">Teknik</span>
                    <h1 className="mb-8 mt-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{article.title}</h1>
                    <div className="flex lg:flex-row flex-col gap-5">
                        <h1 className="inline-flex gap-3 items-center text-lg font-bold text-center text-black flex flex-row">
                            <img className="w-10 h-10 rounded-full" src="https://wridev.id/talents/riovaldo-alfiyan-fahmi-rahman.jpg" alt="Rounded avatar" />
                            {article.author}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            <span>{new Date(article?.created_at || "").toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            <span>7 min read</span>
                        </div>
                    </div>
                    <img src={`${window.location.origin}/storage/${article.banner}`} alt="" className="w-full h-96 mt-7 rounded-xl object-cover" />

                    <div className="mt-10 text-gray-700 text-lg leading-relaxed">
                        <p>{article.content}</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Page;

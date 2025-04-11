import Layout from "@/Layouts/Anonymous";
import { Article } from "@/types/article";
import "../../css/app.css"


interface ArtikelProps {
    articles: Article[]
}

const Artikel: React.FC<ArtikelProps> = ({ articles }) => {
    const banner = "https://res.cloudinary.com/dk0z4ums3/image/upload/v1633346734/attached_image/tujuh-keluhan-ibu-hamil-dan-cara-praktis-mengatasinya.jpg";
    return (
        <Layout>
            <section className="lg:mt-24 mt-20">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-left lg:py-16">
                    <h1 className="text-4xl font-bold mb-2 text-left">Baca Artikel Terbaru</h1>
                    <p className="text-md font-normal mb-4 text-gray-500 lg:text-xl">
                        Jangan lewatkan informasi penting seputar kehamilan dan kesehatan ibu! Simak artikel terbaru yang
                        bisa membantu perjalanan kehamilanmu lebih sehat.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div key={article.slug} className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full">
                                <div className="relative w-full overflow-hidden">
                                    <a href={`/artikel/${article.slug}`}>
                                        <img className="rounded-t-lg w-full aspect-video object-cover hover:opacity-90 transition-opacity" src={`${window.location.origin}/storage/${article.banner}`} alt={article.title} />
                                    </a>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                            <span className="bg-wine bg-opacity-50 px-5 py-2 text-xs text-white rounded-full">Teknik</span>
                                            <span className="bg-black bg-opacity-50 px-5 py-2 text-xs text-white rounded-full">10 min read</span>
                                        </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-gray-500 gap-4 mb-2 text-center">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>{new Date(article?.created_at || "").toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>7 minute</span>
                                        </div>
                                    </div>
                                    <a href={`/detail-artikel/${article.slug}`}>
                                        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">{article.title}</h5>
                                    </a>
                                    <p className="mb-5 font-medium text-gray-500 flex-grow">
                                        {article.content.length > 100 ? article.content.substring(0, 100) + "..." : article.content}
                                    </p>
                                    <div className="flex justify-between">
                                        <h1 className="inline-flex gap-2 items-center text-sm font-bold text-center text-black flex flex-row">
                                            {article.author}
                                        </h1>
                                        <a href={`/detail-artikel/${article.slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            Baca Artikel
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Artikel;

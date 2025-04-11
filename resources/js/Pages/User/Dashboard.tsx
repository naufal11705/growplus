import ComingUpNext from "@/Components/Widget/ComingUpNext";
import ProgressStatus from "@/Components/Widget/ProgressStatus";
import BannerVoucher from "@/Components/Widget/BannerVoucher";
import Layout from "@/Layouts/Layout";
import { Fase } from "@/types/fase";

interface StatisticProps {
    'fases': Fase[]
    'totalPoints': number;
    'totalProgress': number;
    'streak': number;
}

export default function User({ totalPoints, totalProgress, streak, fases }: StatisticProps) {
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Dashboard</h1>
                        <p className="text-gray-500">Pantau kemajuan dan tantangan berikutnya</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mb-8 animate-fadeIn">
                        <div className="col-span-3 sm:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Streak</p>
                                    <div className="flex items-center">
                                        <h3 className="text-2xl font-bold text-gray-800">{streak}</h3>
                                        <span className="ml-2 text-xl">🔥</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-span-3 sm:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-500">
                                        <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Points</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{totalPoints}</h3>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-span-3 sm:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Level</p>
                                    <h3 className="text-2xl font-bold text-gray-800">3</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mb-8">
                        <BannerVoucher />
                    </div> */}
                    <div className="lg:flex lg:flex-row gap-8 w-full">
                        <ProgressStatus totalPoints={totalPoints} totalProgress={totalProgress} streak={streak} />
                        <ComingUpNext fases={fases} />
                    </div>
                </div>
            </div>
        </Layout>
    )
};

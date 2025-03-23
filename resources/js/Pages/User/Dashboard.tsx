import ComingUpNext from "@/Components/Widget/ComingUpNext";
import ProgressStatus from "@/Components/Widget/ProgressStatus";
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
                    {/* <div className="lg:grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-2">
                        {Stast.map((stat, index) => (
                            <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <h5 className="text-md mb-1 font-bold text-gray-400">{stat.title}</h5>
                                <p className="text-gray-900 text-4xl font-semibold">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0"></hr> */}
                    <div className="lg:flex lg:flex-row gap-5 w-full space-x-1 space-y-5 lg:space-x-0 lg:space-y-0">
                        {/* <TableStunting /> */}
                        <ProgressStatus totalPoints={totalPoints} totalProgress={totalProgress} streak={streak} />
                        <ComingUpNext fases={fases} />
                    </div>
                </div>
            </div>
        </Layout>
    )
};

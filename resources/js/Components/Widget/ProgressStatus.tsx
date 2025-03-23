interface StatisticProps {
    'totalPoints': number;
    'totalProgress': number;
    'streak': number;
}

export default function ProgressStatus({ totalPoints, totalProgress, streak }: StatisticProps) {
    console.log(totalProgress);
    return (
        <div className="relative overflow-x-auto w-full">
            <div className="w-full text-sm text-left text-gray-500">
                <h2 className="text-3xl font-extrabold text-gray-900">Progress Kamu</h2>
                <div className="relative overflow-x-auto border mt-5 border-gray-200 rounded-xl w-full p-5">
                    <div className="flex justify-between" id="informationProgress">
                        <div id="streak">
                            <h2 className="text-lg font-extrabold text-gray-500">Streak</h2>
                            <h2 className="text-3xl font-extrabold text-gray-900">{streak} 🔥</h2>
                        </div>
                        <div id="streak">
                            <h2 className="text-lg font-extrabold text-gray-500">Total Points</h2>
                            <h2 className="text-3xl font-extrabold text-gray-900">{totalPoints}</h2>
                        </div>
                        <div id="streak">
                            <h2 className="text-lg font-extrabold text-gray-500">Level</h2>
                            <h2 className="text-3xl font-extrabold text-gray-900">3</h2>
                        </div>
                    </div>
                    <div id="levelBar" className="mt-5">
                        <div className="text-gray-900 text-md justify-between flex">
                            <h2 className="text-lg font-extrabold text-gray-900">Level Progress</h2>
                            <span className="font-bold text-gray-400">{totalProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-pinky h-2.5 rounded-full" style={{ width: `${totalProgress}%` }}></div>
                        </div>
                    </div>
                    <div id="yourBadge" className="mt-5">
                        <h2 className="text-lg font-extrabold text-gray-900">Koleksi Badge</h2>
                        <div className="flex flex-row gap-3 mt-2">
                            {["7 Days", "Nutrition", "Early Bird", "Mindful"].map((badge) => (
                                <div key={badge} className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full border-2 border-pinky bg-gray-100 flex items-center justify-center">
                                        {/* Tempat untuk ikon atau gambar badge */}
                                    </div>
                                    <span className="text-xs text-gray-900 mt-1 text-center font-medium">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="mt-5">
                        <a href="#" className="font-extrabold text-pinky hover:underline text-lg">Kunjungi Profile</a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

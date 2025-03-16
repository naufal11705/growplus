export default function ComingUpNext() {
    const tasks = [
        { title: "Meditation Morning", description: "Start your day with 10 minutes of mindful meditation.", time: "Tomorrow" },
        { title: "Hydration Hero", description: "Drink at least 8 glasses of water today to improve hydration.", time: "In 2 days" },
        { title: "Hydration Hero", description: "Drink at least 8 glasses of water today to improve hydration.", time: "In 2 days" },
    ];

    return (
        <div className="w-full lg:max-w-md">
            <h2 className="text-3xl font-extrabold text-gray-900">Tantangan Selanjutnya</h2>
            <div className="space-y-3 mt-5">
                {tasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                {/* Tempat untuk ikon */}
                                <span className="text-gray-400">+</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
                                <p className="text-xs text-gray-500">{task.description}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{task.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

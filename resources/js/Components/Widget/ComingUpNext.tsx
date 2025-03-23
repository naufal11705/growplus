import { Fase } from "@/types/fase";

interface UpcomingProps {
    fases: Fase[];
}

export default function ComingUpNext({ fases }: UpcomingProps) {
    console.log(fases);
    return (
        <div className="w-full lg:max-w-md">
            <h2 className="text-3xl font-extrabold text-gray-900">Tantangan Selanjutnya</h2>
            <div className="space-y-3 mt-5">
                {fases.map((fase) => (
                    console.log(fase),
                    console.log(fase.judul),
                    <div key={fase.fase_id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-pinky flex items-center justify-center p-4">
                                <span className="text-white">{fase.fase_id}</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{fase.judul || 'Fase selanjutnya'}</h3>
                                <p className="text-xs line-clamp-2 text-gray-500">{fase.deskripsi || 'ini deskripsi, aku capek, please works'}</p>
                            </div>
                        </div>
                        {/* <span className="text-sm text-gray-500">{task.}</span> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

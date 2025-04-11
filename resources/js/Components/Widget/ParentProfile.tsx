interface OrangTuaProps {
    orangtua_id: number;
    tanggal_lahir: string;
}

interface PenggunaProps {
    pengguna_id: number;
    nama: string;
    email: string;
}

export default function ParentProfile({
    orangtua,
    pengguna,
}: {
    orangtua: OrangTuaProps;
    pengguna: PenggunaProps;
}) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-50 flex items-center justify-center p-0.5 border border-gray-100 shadow-sm">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        alt={`${pengguna.nama}'s profile`}
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-50 rounded-full p-1 shadow-sm border border-gray-50">
                    <button 
                        className="bg-wine hover:bg-dark-wine transition text-white rounded-full w-8 h-8 flex items-center justify-center"
                        aria-label="Change profile picture"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{pengguna.nama}</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-500 mb-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{pengguna.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">
                            {new Date(orangtua.tanggal_lahir).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>  
            </div>
        </div>
    );
}

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
        <div
            key={pengguna.pengguna_id}
            className="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center"
        >
            <img
                className="w-24 h-24 mb-4 rounded-full shadow-lg object-cover"
                src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt="User Profile"
            />
            <h5 className="mb-2 text-xl font-semibold text-gray-900">
                {pengguna.nama}
            </h5>
            <p className="text-sm text-gray-500 mb-3">
                {new Date(orangtua.tanggal_lahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </p>
            <p className="mb-4 text-gray-700 text-sm">{pengguna.email}</p>
            <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-wine rounded-lg hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky"
            >
                Edit Profile
                <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </a>
        </div>
    );
}

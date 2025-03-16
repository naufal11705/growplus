import { forums } from "../../Data/ForumCard";
export default function Forum_Cards() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {forums.map((forum) => (
                <div key={forum.id} className=" bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <a href="#">
                        <img className="rounded-t-2xl w-full h-40 object-cover" src={forum.image} alt={forum.name} />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{forum.name}</h5>
                        </a>
                        <p className="mb-2 text-sm text-gray-500">
                            {forum.members.toLocaleString()} Anggota •{" "}
                            <span className={`font-bold ${forum.active ? "text-wine" : "text-red-500"}`}>
                                {forum.active ? "Aktif" : "Tidak Aktif"}
                            </span>
                        </p>
                        <p className="mb-3 text-gray-700 text-sm">{forum.description}</p>
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-wine rounded-lg hover:bg-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">
                            Bergabung Sekarang
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

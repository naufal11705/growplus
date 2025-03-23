interface AnakProps {
    anak_id: number;
    nama: string;
    tanggal_lahir: string;
}

export default function ChildProfile({ anak }: { anak: AnakProps }) {
    const hitungUmur = (tanggalLahir: string): string => {
        const birthDate = new Date(tanggalLahir);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        const days = today.getDate() - birthDate.getDate();


        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        if (years < 0) {
            return 'Umur tidak valid';
        }

        if (years === 0) {
            return `${months} bulan`;
        }
        return `${years} tahun ${months} bulan`;
    };

    return (
        <div key={anak.anak_id} className="lg:grid lg:grid-cols-3 lg:gap-5 grid grid-cols-1 gap-2">
            <div className="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center">
                <img className="w-24 h-24 mb-4 rounded-full shadow-lg object-cover" src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="User Profile" />
                <h5 className="mb-2 text-xl font-semibold text-gray-900">{anak.nama}</h5>
                <p className="text-sm text-gray-500 mb-3">
                    {new Date(anak.tanggal_lahir).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>                <p className="mb-4 text-gray-700 text-sm">{hitungUmur(anak.tanggal_lahir)}</p>
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-wine rounded-lg hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky">
                    Edit Profile
                    <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

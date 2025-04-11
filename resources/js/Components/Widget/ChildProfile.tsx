interface AnakProps {
  anak_id: number;
  nama: string;
  tanggal_lahir: string;
}

export default function ChildProfile({ anak }: { anak?: AnakProps | AnakProps[] | null }) {
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
      return "Umur tidak valid";
    }

    if (years === 0) {
      return `${months} bulan`;
    }
    return `${years} tahun ${months} bulan`;
  };

  // Jika anak null atau undefined, tampilkan pesan bahwa data anak tidak tersedia
  if (!anak) {
    return (
      <div className="text-center text-gray-500 py-6">
        Data anak belum ada, silakan tambahkan informasi anak baru.
      </div>
    );
  }

  // Normalisasi anak menjadi array
  const anakArray = Array.isArray(anak) ? anak : [anak];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {anakArray.map((child) => (
        <div
          key={child.anak_id}
          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow transition-shadow duration-300 overflow-hidden group"
        >
          <div className="h-20 bg-gray-50 flex items-center justify-center border-b border-gray-100">
            <div className="relative -mb-10">
              <div className="w-20 h-20 rounded-full bg-white p-0.5 shadow-sm border border-gray-100">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  alt={`${child.nama}'s profile`}
                />
              </div>
            </div>
          </div>

          <div className="pt-12 pb-5 px-5 text-center">
            <h5 className="text-lg font-medium text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
              {child.nama}
            </h5>

            <div className="flex justify-center items-center gap-2 mb-2 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">
                {new Date(child.tanggal_lahir).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-wine bg-opacity-10 text-gray-700 mb-4">
              {hitungUmur(child.tanggal_lahir)}
            </div>

            <a href={`/profil/anak/${child.anak_id}/edit`}>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200">
                Edit Profile
                <svg
                  className="w-3.5 h-3.5 ml-2 opacity-70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
import type { Fase } from "@/types/fase"

interface UpcomingProps {
  fases: Fase[]
}

export default function ComingUpNext({ fases }: UpcomingProps) {
  return (
    <div className="w-full lg:w-2/5 animate-fadeIn">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Tantangan Selanjutnya</h2>
        <div className="ml-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {fases.length} Tersedia
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="p-6">
          <div className="space-y-4">
            {fases.map((fase, index) => (
              <div
                key={fase.fase_id}
                className="flex items-start p-4 bg-white border border-gray-100 rounded-lg hover:border-pink-200 hover:bg-pink-50/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all duration-300">
                    {fase.fase_id}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                    {fase.judul || "Fase selanjutnya"}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {fase.deskripsi || "Deskripsi fase ini akan segera tersedia."}
                  </p>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <button className="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 shadow-sm hover:shadow transition-all duration-200"
            >
              Lihat Semua Tantangan
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


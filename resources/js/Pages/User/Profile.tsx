import ChildProfile from "@/Components/Widget/ChildProfile"
import ParentProfile from "@/Components/Widget/ParentProfile"
import Layout from "@/Layouts/Layout"

interface OrangTuaProps {
  orangtua_id: number
  tanggal_lahir: string
}

interface PenggunaProps {
  pengguna_id: number
  nama: string
  email: string
}

interface AnakProps {
  anak_id: number
  nama: string
  tanggal_lahir: string
}

export default function Profile({
  orangtua,
  pengguna,
  anak,
}: { orangtua: OrangTuaProps; pengguna: PenggunaProps; anak: AnakProps }) {
  return (
    <Layout>
      <div className="sm:ml-64 min-h-screen bg-gray-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative">
              <span className="relative z-10">Profile User</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-pink-100/70 -z-10 rounded"></span>
            </h2>
            <p className="text-gray-600 mt-2">Kelola informasi orang tua dan anak disini ya moms! 🤩</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Profile Orang Tua</h3>
            </div>
            <div className="p-6">
              <ParentProfile orangtua={orangtua} pengguna={pengguna} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Profile Anak</h3>
              <a href="/profil/anak/tambah">
                <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Informasi Anak
                </button>
              </a>
            </div>
            <div className="p-6">
              <ChildProfile anak={anak} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


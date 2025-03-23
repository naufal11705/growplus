import ChildProfile from "@/Components/Widget/ChildProfile";
import ParentProfile from "@/Components/Widget/ParentProfile";
import Layout from "@/Layouts/Layout";

interface OrangTuaProps {
    orangtua_id: number;
    tanggal_lahir: string;
}

interface PenggunaProps {
    pengguna_id: number;
    nama: string;
    email: string;
}

interface AnakProps {
    anak_id: number;
    nama: string;
    tanggal_lahir: string;
}

export default function Profile({ orangtua, pengguna, anak }: { orangtua: OrangTuaProps, pengguna: PenggunaProps, anak: AnakProps }) {
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4 flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Profile User</h2>
                    <ParentProfile orangtua={orangtua} pengguna={pengguna} />
                    <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                    <ChildProfile anak={anak} />
                </div>
            </div>
        </Layout>
    )
};

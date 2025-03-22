import ChildProfile from "@/Components/Widget/ChildProfile";
import ParentProfile from "@/Components/Widget/ParentProfile";
import Layout from "@/Layouts/Layout";

interface OrangTua {
    orangtua_id: number;
    pengguna_id: number;
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    alamat: string;
    pekerjaan: string;
    penghasilan: number;
    sumber_penghasilan: string;
    jumlah_tanggungan: number;
    status_rumah: string;
    tanggungan_listrik: number;
    tanggungan_air: number;
}

export default function Profile() {
    return (
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">Profile User</h2>
                    <ParentProfile />
                    <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                    <ChildProfile />
                </div>
            </div>
        </Layout>
    )
};

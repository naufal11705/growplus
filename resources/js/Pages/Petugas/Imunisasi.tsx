import Layout from "@/Layouts/Petugas";
export default function Imunisasi(){
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/petugas/imunisasi/tambah">
                        <button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Tambah Imunisasi
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    );
}
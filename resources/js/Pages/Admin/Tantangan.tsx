import Layout from "@/Layouts/Admin";
export default function Tantangan(){
    return(
        <Layout>
            <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
                <div className="lg:p-8 p-4">
                    <a href="/admin/tantangan/create">
                        <button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">
                            Tambah Tantangan
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    );
}
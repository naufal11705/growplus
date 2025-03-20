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
                    <div className="relative overflow-x-auto border rounded-xl mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Akitivitas
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Poin
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fase ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Disini
                                    </th>
                                    <td className="px-6 py-4">
                                        Disini
                                    </td>
                                    <td className="px-6 py-4">
                                        Disini
                                    </td>
                                    <td className="px-6 py-4">
                                        Disini
                                    </td>
                                    <td className="px-6 py-4">
                                        Disini
                                    </td>
                                    <td className="px-6 py-4 text-right flex gap-2">
                                        <a href="#" className="font-medium text-wine hover:underline">Edit</a>
                                        │
                                        <a href="#" className="font-medium text-red-500 hover:underline">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
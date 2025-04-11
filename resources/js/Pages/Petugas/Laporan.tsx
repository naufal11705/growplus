import Layout from "@/Layouts/Petugas";
import { Pencil, Trash2 } from "lucide-react";

export default function Forum() {
  return (
    <Layout>
      <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
        <div className="lg:p-8 p-4">
          <div className="relative overflow-x-auto border rounded-xl mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">No</th>
                  <th scope="col" className="px-6 py-3">Orang Tua ID</th>
                  <th scope="col" className="px-6 py-3">Nama Orang Tua</th>
                  <th scope="col" className="px-6 py-3">Jenis Kelamin</th>
                  <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-start gap-3">
                      <a
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </a>
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
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

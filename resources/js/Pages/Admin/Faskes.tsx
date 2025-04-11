import { usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Layout from "@/Layouts/Admin";
import { Pencil, Trash2 } from "lucide-react"
import FilterDropdown from "@/Components/Widget/Filter/FilterPuskesmas";

interface Faskes {
  faskes_id: number;
  orangtua_id: number;
  puskesmas_id: number;
  no_reg_kohort_ibu: number;
  no_reg_kohort_anak: number;
}

interface PageProps extends InertiaPageProps {
  faskes: Faskes[];
}

export default function Faskes() {
  const { faskes } = usePage<PageProps>().props;
  const [filteredFaskes, setFilteredFaskes] = useState<Faskes[]>([]);

  useEffect(() => setFilteredFaskes(faskes), [faskes]);

  const handleFilterChange = (puskesmasId: string) => {
    setFilteredFaskes(puskesmasId ? faskes.filter((item) => item.puskesmas_id.toString().includes(puskesmasId)) : faskes);
  };

  const handleDelete = (id: number) => router.delete(`/admin/faskes/${id}`, {
    onSuccess: () => router.reload({ only: ["faskes"] }),
    onError: () => alert("Gagal menghapus data."),
  });

  return (
    <Layout>
      <div className="lg:p-8 p-1 sm:ml-64 lg:mt-12 mt-8 md:mt-14">
        <div className="lg:p-8 p-4">
          <div className="flex justify-between items-center mb-5">
            <a href="/admin/faskes/create"><button type="button" className="px-5 py-3 text-base font-medium text-center text-white bg-wine rounded-xl hover:bg-dark-wine">Tambah Faskes</button></a>
            <FilterDropdown onFilterChange={handleFilterChange} />
          </div>
          <div className="relative overflow-x-auto border rounded-xl mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Orang Tua ID</th>
                  <th scope="col" className="px-6 py-3">Puskesmas ID</th>
                  <th scope="col" className="px-6 py-3">Kohort Ibu</th>
                  <th scope="col" className="px-6 py-3">Kohort Anak</th>
                  <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaskes.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-4">Tidak ada data yang ditemukan.</td></tr>
                ) : (
                  filteredFaskes.map((item) => (
                    <tr key={item.faskes_id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.faskes_id}</th>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.orangtua_id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.puskesmas_id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_reg_kohort_ibu}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.no_reg_kohort_anak}</td>
                      <td className="px-6 py-4 text-right">
                          <div className="flex justify-start gap-3">
                            <a
                              href={`/admin/faskes/${item.faskes_id}/edit`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </a>
                            <button
                              onClick={() => handleDelete(item.faskes_id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>  
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
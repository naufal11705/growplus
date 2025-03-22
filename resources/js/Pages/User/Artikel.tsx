
import Layout from "@/Layouts/Layout";

export default function Artikel() {
    return (
        <Layout>
            <div className="mt-4 p-4">
                <h2 className="lg:text-4xl text-2xl font-bold text-gray-900 mb-4">Informasi Penting dalam Fase Kehamilan 👇🏻</h2>
                <div id="accordion-collapse" data-accordion="collapse">
                    <h2 id="accordion-collapse-heading-1">
                        <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right border-wine border-t-2 !text-wine !bg-transparent gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                            <span className="text-left">Daftar layanan kesehatan gratis selama kehamilan</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                        <div className="p-5 border-t-2 border-wine">
                            <ul className="list-decimal px-4 text-gray-600">
                                <li>
                                    Pemeriksaan kehamilan
                                    oleh dokter, bidan dan
                                    tenaga kesehatan
                                </li>
                                <li>
                                    Pemeriksaan status gizi
                                </li>
                                <li>
                                    Pemeriksaan laboratorium
                                </li>
                                <li>
                                    Pemeriksaan kondisi bayi
                                </li>
                                <li>
                                    USG 2 kali
                                </li>
                                <li>
                                    Pemberian tablet tambah
                                    darah (TTD)/multivitamin
                                    bagi ibu hamil
                                </li>
                                <li>
                                    Pemeriksaan tekanan darah
                                </li>
                                <li>
                                    Skrining kesehatan jiwa
                                </li>
                                <li>
                                    Imunisasi Tetanus
                                </li>
                                <li>
                                    Kelas ibu hamil
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-2">
                        <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right border-wine border-t-2 !text-wine !bg-transparent gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                            <span className="text-left">Hal-hal yang tidak boleh dilakukan selama kehamilan</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                        <div className="py-5 border-t-2 border-wine">
                            <ul>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg className="w-6 h-6 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Minum obat tanpa resep dokter
                                </li>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg className="w-6 h-6 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Merokok atau terpapar asap rokok
                                </li>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg className="w-6 h-6 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Stress berlebihan
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-3">
                        <button type="button" className="flex items-center justify-between w-full py-3 font-medium rtl:text-right border-wine border-t-2 !text-wine !bg-transparent gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                            <span className="text-left">Hal-hal yang tidak boleh dilakukan selama kehamilan</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                        <div className="py-5 border-t-2 border-wine">
                            <ul>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 512 512"><path fill="#411a2d" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                                    Demam tinggi
                                </li>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 512 512"><path fill="#411a2d" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                                    Mual dan muntah hebat
                                </li>
                                <li className="flex items-center justify-start gap-2 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 512 512"><path fill="#411a2d" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                                    Pendarahan
                                </li>
                            </ul>
                            <div className="bg-red-600 py-2 px-4 text-white text-sm mt-4 rounded-md">
                                <span>Jika mengalami tanda bahaya diatas pada masa kehamilan, segera bawa
                                    ibu hamil periksa ke Puskesmas/Rumah Sakit.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

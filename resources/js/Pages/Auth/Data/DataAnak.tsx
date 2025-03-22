import { useState } from "react";

interface DataAnakProps {
    onNext: (data: any) => void;
}

interface ChildData {
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    berat_badan: number;
    tinggi_badan: number;
}

export default function DataAnak({ onNext }: DataAnakProps) {
    const [childrenCount, setChildrenCount] = useState(1);
    const [formData, setFormData] = useState<{ [key: string]: ChildData }>({
        '1': {
            nama: '',
            nik: '',
            no_jkn: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            golongan_darah: 'Pilih',
            berat_badan: 0,
            tinggi_badan: 0
        }
    });
    const [dropdownStates, setDropdownStates] = useState<{
        [key: string]: {
            isBloodTypeOpen: boolean;
            selectedBloodType: string;
        }
    }>({
        '1': {
            isBloodTypeOpen: false,
            selectedBloodType: "Pilih"
        }
    });

    const toggleDropdown = (childId: string, dropdown: string) => {
        setDropdownStates(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                isBloodTypeOpen: dropdown === "bloodType" ? !prev[childId].isBloodTypeOpen : false
            }
        }));
    };

    const dropdownOptions: Record<string, string[]> = {
        golongan_darah: ["AB", "A", "B", "O"],
    };

    const handleSelect = (childId: string, dropdown: string, option: string) => {
        setDropdownStates(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                ...(dropdown === "bloodType" && { selectedBloodType: option, isBloodTypeOpen: false })
            }
        }));
        setFormData(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                ...(dropdown === "bloodType" && { golongan_darah: option })
            }
        }));
    };

    const handleInputChange = (childId: string, field: keyof ChildData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                [field]: value
            }
        }));
    };

    const addChild = () => {
        const newCount = childrenCount + 1;
        setChildrenCount(newCount);
        setDropdownStates(prev => ({
            ...prev,
            [newCount.toString()]: {
                isBloodTypeOpen: false,
                selectedBloodType: "Pilih"
            }
        }));
        setFormData(prev => ({
            ...prev,
            [newCount.toString()]: {
                nama: '',
                nik: '',
                no_jkn: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                golongan_darah: 'Pilih',
                berat_badan: 0,
                tinggi_badan: 0
            }
        }));
    };

    const removeChild = (childId: string) => {
        if (childrenCount <= 1 || childId === "1") return;

        setChildrenCount(prev => prev - 1);
        setDropdownStates(prev => {
            const newStates = { ...prev };
            delete newStates[childId];
            return newStates;
        });
        setFormData(prev => {
            const newData = { ...prev };
            delete newData[childId];
            return newData;
        });
    };

    const isFormComplete = () => {
        return Object.values(formData).every(data =>
            data.nama.trim() !== '' &&
            data.nik.trim() !== '' && data.nik.length >= 16 &&
            data.no_jkn.trim() !== '' && data.no_jkn.length >= 13 &&
            data.tempat_lahir.trim() !== '' &&
            data.tanggal_lahir.trim() !== '' &&
            data.golongan_darah !== 'Pilih' &&
            data.berat_badan !== null &&
            data.tinggi_badan !== null
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormComplete()) {
            onNext(Object.values(formData));
        }
    };

    const renderChildForm = (childNumber: number) => {
        const childId = childNumber.toString();
        const state = dropdownStates[childId];
        const data = formData[childId];

        return (
            <div key={childId} className="relative">
                <hr className="h-px my-8 bg-gray-200 border-0" />
                <div className="flex justify-between items-center">
                    <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-xl">
                        Data Anak {childNumber}
                    </h1>
                    {childrenCount > 1 && childNumber !== 1 && (
                        <button
                            type="button"
                            onClick={() => removeChild(childId)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                            Hapus
                        </button>
                    )}
                </div>
                <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5 mt-4">
                    <div>
                        <label htmlFor={`nama-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap Anak</label>
                        <input
                            type="text"
                            name={`nama-${childId}`}
                            id={`nama-${childId}`}
                            value={data.nama}
                            onChange={(e) => handleInputChange(childId, 'nama', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Nama Lengkap"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`nik-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                        <input
                            type="text"
                            name={`nik-${childId}`}
                            id={`nik-${childId}`}
                            value={data.nik}
                            onChange={(e) => handleInputChange(childId, 'nik', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="NIK (Min. 16 karakter)"
                            minLength={16}
                            maxLength={16}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`no_jkn-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">No. JKN</label>
                        <input
                            type="text"
                            name={`no_jkn-${childId}`}
                            id={`no_jkn-${childId}`}
                            value={data.no_jkn}
                            onChange={(e) => handleInputChange(childId, 'no_jkn', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Nomor JKN (Min. 13 karakter)"
                            minLength={13}
                            maxLength={13}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`tempat_lahir-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                        <input
                            type="text"
                            name={`tempat_lahir-${childId}`}
                            id={`tempat_lahir-${childId}`}
                            value={data.tempat_lahir}
                            onChange={(e) => handleInputChange(childId, 'tempat_lahir', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Tempat Lahir"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`tanggal_lahir-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                        <input
                            type="date"
                            name={`tanggal_lahir-${childId}`}
                            id={`tanggal_lahir-${childId}`}
                            value={data.tanggal_lahir}
                            onChange={(e) => handleInputChange(childId, 'tanggal_lahir', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Golongan Darah</label>
                        <button
                            onClick={() => toggleDropdown(childId, "bloodType")}
                            type="button"
                            className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5"
                        >
                            {state.selectedBloodType}
                            <svg className={`w-2.5 h-2.5 ml-3 transform ${state.isBloodTypeOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {state.isBloodTypeOpen && (
                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                <ul className="py-2 text-gray-700 font-medium">
                                    {dropdownOptions.golongan_darah.map(option => (
                                        <li key={option}>
                                            <a href="#" onClick={() => handleSelect(childId, "bloodType", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-5 mt-4">
                    <div>
                        <label htmlFor={`berat_badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Berat Badan (kg)</label>
                        <input
                            type="number"
                            name={`berat_badan-${childId}`}
                            id={`berat_badan-${childId}`}
                            value={data.berat_badan}
                            onChange={(e) => handleInputChange(childId, 'berat_badan', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Berat Badan"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`tinggi_badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan (cm)</label>
                        <input
                            type="number"
                            name={`tinggi_badan-${childId}`}
                            id={`tinggi_badan-${childId}`}
                            value={data.tinggi_badan}
                            onChange={(e) => handleInputChange(childId, 'tinggi_badan', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                            placeholder="Tinggi Badan"
                            required
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                    Isi Data Anak Anda ✍️
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {Array.from({ length: childrenCount }, (_, i) => renderChildForm(i + 1))}
                    <div className="space-y-2 flex flex-col mt-6">
                        <button
                            type="submit"
                            disabled={!isFormComplete()}
                            className={`w-full text-white font-medium rounded-xl text-md px-5 py-3 text-center ${isFormComplete()
                                ? 'bg-wine hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Selanjutnya
                        </button>
                        <button
                            type="button"
                            onClick={addChild}
                            className="w-full gap-2 flex justify-center items-center text-black bg-white hover:bg-gray-100 border border-dashed focus:ring-4 focus:outline-none focus:ring-dark-wine font-medium rounded-xl text-md px-5 py-3 text-center"
                        >
                            <svg className="w-5 h-5 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            Tambah Data Anak
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

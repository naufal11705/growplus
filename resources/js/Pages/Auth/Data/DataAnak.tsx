import { useState } from "react";

interface DataAnakProps {
    onNext: (data: any) => void;
}

interface ChildData {
    namaLengkap: string;
    tanggalLahir: string;
    jenisKelamin: string;
    faseUsia: string;
    beratBadan: string;
    tinggiBadan: string;
    polaMakan: string;
    alergiMakanan: string;
    riwayatKesehatan: string;
}

export default function DataAnak({ onNext }: DataAnakProps) {
    const [childrenCount, setChildrenCount] = useState(1);
    const [formData, setFormData] = useState<{ [key: string]: ChildData }>({
        '1': {
            namaLengkap: '',
            tanggalLahir: '',
            jenisKelamin: 'Pilih',
            faseUsia: 'Pilih',
            beratBadan: '',
            tinggiBadan: '',
            polaMakan: 'Pilih',
            alergiMakanan: '',
            riwayatKesehatan: ''
        }
    });
    const [dropdownStates, setDropdownStates] = useState<{
        [key: string]: {
            isGenderOpen: boolean;
            isAgeOpen: boolean;
            isFoodOpen: boolean;
            selectedGender: string;
            selectedAge: string;
            selectedFood: string;
        }
    }>({
        '1': {
            isGenderOpen: false,
            isAgeOpen: false,
            isFoodOpen: false,
            selectedGender: "Pilih",
            selectedAge: "Pilih",
            selectedFood: "Pilih"
        }
    });

    const toggleDropdown = (childId: string, dropdown: string) => {
        setDropdownStates(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                isGenderOpen: dropdown === "gender" ? !prev[childId].isGenderOpen : false,
                isAgeOpen: dropdown === "age" ? !prev[childId].isAgeOpen : false,
                isFoodOpen: dropdown === "food" ? !prev[childId].isFoodOpen : false
            }
        }));
    };

    const handleSelect = (childId: string, dropdown: string, option: string) => {
        setDropdownStates(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                ...(dropdown === "gender" && { selectedGender: option, isGenderOpen: false }),
                ...(dropdown === "age" && { selectedAge: option, isAgeOpen: false }),
                ...(dropdown === "food" && { selectedFood: option, isFoodOpen: false })
            }
        }));
        setFormData(prev => ({
            ...prev,
            [childId]: {
                ...prev[childId],
                ...(dropdown === "gender" && { jenisKelamin: option }),
                ...(dropdown === "age" && { faseUsia: option }),
                ...(dropdown === "food" && { polaMakan: option })
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
                isGenderOpen: false,
                isAgeOpen: false,
                isFoodOpen: false,
                selectedGender: "Pilih",
                selectedAge: "Pilih",
                selectedFood: "Pilih"
            }
        }));
        setFormData(prev => ({
            ...prev,
            [newCount.toString()]: {
                namaLengkap: '',
                tanggalLahir: '',
                jenisKelamin: 'Pilih',
                faseUsia: 'Pilih',
                beratBadan: '',
                tinggiBadan: '',
                polaMakan: 'Pilih',
                alergiMakanan: '',
                riwayatKesehatan: ''
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
            data.namaLengkap.trim() !== '' &&
            data.tanggalLahir.trim() !== '' &&
            data.jenisKelamin !== 'Pilih' &&
            data.faseUsia !== 'Pilih' &&
            data.beratBadan.trim() !== '' &&
            data.tinggiBadan.trim() !== '' &&
            data.polaMakan !== 'Pilih' &&
            data.alergiMakanan.trim() !== '' &&
            data.riwayatKesehatan.trim() !== ''
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormComplete()) {
            onNext(formData);
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
                        <label htmlFor={`nama-lengkap-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap Anak</label>
                        <input 
                            type="text" 
                            name={`nama-lengkap-${childId}`} 
                            id={`nama-lengkap-${childId}`} 
                            value={data.namaLengkap}
                            onChange={(e) => handleInputChange(childId, 'namaLengkap', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                            placeholder="Nama Lengkap" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor={`tanggal-lahir-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir Anak</label>
                        <input 
                            type="date" 
                            name={`tanggal-lahir-${childId}`} 
                            id={`tanggal-lahir-${childId}`} 
                            value={data.tanggalLahir}
                            onChange={(e) => handleInputChange(childId, 'tanggalLahir', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Jenis Kelamin Anak</label>
                        <button onClick={() => toggleDropdown(childId, "gender")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                            {state.selectedGender}
                            <svg className={`w-2.5 h-2.5 ml-3 transform ${state.isGenderOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {state.isGenderOpen && (
                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                <ul className="py-2 text-gray-700 font-medium">
                                    {["Laki-Laki", "Perempuan"].map(option => (
                                        <li key={option}>
                                            <a href="javascript:void(0)" onClick={() => handleSelect(childId, "gender", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-900">Fase Usia Anak</label>
                        <button onClick={() => toggleDropdown(childId, "age")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                            {state.selectedAge}
                            <svg className={`w-2.5 h-2.5 ml-3 transform ${state.isAgeOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {state.isAgeOpen && (
                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                <ul className="py-2 text-gray-700 font-medium">
                                    {["Bayi (0-12 bulan)", "Balita (1-5 Tahun)", "Pra-Sekolah(5-7 Tahun)"].map(option => (
                                        <li key={option}>
                                            <a href="javascript:void(0)" onClick={() => handleSelect(childId, "age", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor={`berat-badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Berat Badan Anak</label>
                    <input 
                        type="text" 
                        name={`berat-badan-${childId}`} 
                        id={`berat-badan-${childId}`} 
                        value={data.beratBadan}
                        onChange={(e) => handleInputChange(childId, 'beratBadan', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                        placeholder="Berat Badan" 
                        required 
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor={`tinggi-badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan Anak</label>
                    <input 
                        type="text" 
                        name={`tinggi-badan-${childId}`} 
                        id={`tinggi-badan-${childId}`} 
                        value={data.tinggiBadan}
                        onChange={(e) => handleInputChange(childId, 'tinggiBadan', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                        placeholder="Tinggi Badan" 
                        required 
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-bold text-gray-900">Pola Makan Anak</label>
                    <button onClick={() => toggleDropdown(childId, "food")} type="button" className="text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5">
                        {state.selectedFood}
                        <svg className={`w-2.5 h-2.5 ml-3 transform ${state.isFoodOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {state.isFoodOpen && (
                        <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                            <ul className="py-2 text-gray-700 font-medium">
                                {["Asi", "MPASI", "Makanan Padat"].map(option => (
                                    <li key={option}>
                                        <a href="javascript:void(0)" onClick={() => handleSelect(childId, "food", option)} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                            {option}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor={`alergi-makanan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Alergi Makanan Anak</label>
                    <input 
                        type="text" 
                        name={`alergi-makanan-${childId}`} 
                        id={`alergi-makanan-${childId}`} 
                        value={data.alergiMakanan}
                        onChange={(e) => handleInputChange(childId, 'alergiMakanan', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                        placeholder="Alergi Makanan" 
                        required 
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor={`riwayat-kesehatan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Riwayat Kesehatan Anak</label>
                    <input 
                        type="text" 
                        name={`riwayat-kesehatan-${childId}`} 
                        id={`riwayat-kesehatan-${childId}`} 
                        value={data.riwayatKesehatan}
                        onChange={(e) => handleInputChange(childId, 'riwayatKesehatan', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5" 
                        placeholder="Riwayat Kesehatan" 
                        required 
                    />
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
                            className={`w-full text-white font-medium rounded-xl text-md px-5 py-3 text-center ${
                                isFormComplete() 
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
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                            Tambah Data Anak
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
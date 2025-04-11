import { useState, useEffect } from "react";

interface DataAnakProps {
    onNext: (data: any) => void;
    onBack?: () => void;
    onNotYetDelivered?: () => void;
    initialData?: any[];
}

interface ChildData {
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    golongan_darah: string;
    berat_badan: string;
    tinggi_badan: string;
}

type ValidationErrors = Record<string, string>;

const initialChildData: ChildData = {
    nama: "",
    nik: "",
    no_jkn: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    golongan_darah: "Pilih",
    berat_badan: "",
    tinggi_badan: "",
};

const dropdownOptions: Record<string, string[]> = {
    golongan_darah: ["AB", "A", "B", "O"],
};

export default function DataAnak({ onNext, onBack, onNotYetDelivered, initialData = [] }: DataAnakProps) {
    const [childrenCount, setChildrenCount] = useState(initialData.length || 1);
    const [formData, setFormData] = useState<{ [key: string]: ChildData }>(() => {
        if (initialData.length > 0) {
            const initialFormData: { [key: string]: ChildData } = {};
            initialData.forEach((data, index) => {
                initialFormData[(index + 1).toString()] = { ...data };
            });
            return initialFormData;
        }
        return { "1": { ...initialChildData } };
    });
    const [errors, setErrors] = useState<{ [key: string]: ValidationErrors }>(() => {
        const initialErrors: { [key: string]: ValidationErrors } = {};
        for (let i = 1; i <= (initialData.length || 1); i++) {
            initialErrors[i.toString()] = {};
        }
        return initialErrors;
    });
    const [dropdownStates, setDropdownStates] = useState<{
        [key: string]: { isBloodTypeOpen: boolean };
    }>(() => {
        const initialDropdowns: { [key: string]: { isBloodTypeOpen: boolean } } = {};
        for (let i = 1; i <= (initialData.length || 1); i++) {
            initialDropdowns[i.toString()] = { isBloodTypeOpen: false };
        }
        return initialDropdowns;
    });
    const [isNotYetDelivered, setIsNotYetDelivered] = useState(false);
    const [lastMenstrualDate, setLastMenstrualDate] = useState("");
    const [mensError, setMensError] = useState("");

    useEffect(() => {
        setChildrenCount(initialData.length || 1);
    }, [initialData]);

    const toggleDropdown = (childId: string) => {
        setDropdownStates((prev) => ({
            ...prev,
            [childId]: { isBloodTypeOpen: !prev[childId].isBloodTypeOpen },
        }));
    };

    const handleSelect = (childId: string, option: string) => {
        setFormData((prev) => ({
            ...prev,
            [childId]: { ...prev[childId], golongan_darah: option },
        }));
        setDropdownStates((prev) => ({
            ...prev,
            [childId]: { isBloodTypeOpen: false },
        }));
        setErrors((prev) => ({
            ...prev,
            [childId]: { ...prev[childId], golongan_darah: "" },
        }));
    };

    const handleInputChange = (childId: string, field: keyof ChildData, value: string, maxLength?: number) => {
        let sanitizedValue = value;

        if (["nik", "no_jkn", "berat_badan", "tinggi_badan"].includes(field)) {
            sanitizedValue = value.replace(/[^0-9]/g, "");
            if (maxLength) {
                sanitizedValue = sanitizedValue.slice(0, maxLength);
            }
        } else if (maxLength) {
            sanitizedValue = value.slice(0, maxLength);
        }

        setFormData((prev) => ({
            ...prev,
            [childId]: { ...prev[childId], [field]: sanitizedValue },
        }));
    };

    const addChild = () => {
        const newCount = childrenCount + 1;
        setChildrenCount(newCount);
        setFormData((prev) => ({
            ...prev,
            [newCount.toString()]: { ...initialChildData },
        }));
        setDropdownStates((prev) => ({
            ...prev,
            [newCount.toString()]: { isBloodTypeOpen: false },
        }));
        setErrors((prev) => ({
            ...prev,
            [newCount.toString()]: {},
        }));
    };

    const removeChild = (childId: string) => {
        if (childrenCount <= 1 || childId === "1") return;

        setChildrenCount((prev) => prev - 1);
        setFormData((prev) => {
            const newData = { ...prev };
            delete newData[childId];
            return newData;
        });
        setDropdownStates((prev) => {
            const newStates = { ...prev };
            delete newStates[childId];
            return newStates;
        });
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[childId];
            return newErrors;
        });
    };

    const validateRequired = (value: string, fieldName: string): string => {
        return !value ? `${fieldName} harus diisi` : "";
    };

    const validateExactLength = (value: string, length: number, fieldName: string): string => {
        return value.length !== length ? `${fieldName} harus tepat ${length} karakter` : "";
    };

    const validateDropdown = (value: string, fieldName: string): string => {
        return value === "Pilih" ? `${fieldName} harus dipilih` : "";
    };

    const validateNonNegativeNumber = (value: string, fieldName: string): string => {
        if (value === "") return `${fieldName} harus diisi`;
        const numValue = parseInt(value);
        return numValue <= 0 ? `${fieldName} harus lebih dari 0` : "";
    };

    const validationRules: Record<keyof ChildData, (value: string) => string> = {
        nama: (value) => validateRequired(value, "Nama lengkap"),
        nik: (value) => validateRequired(value, "NIK") || validateExactLength(value, 16, "NIK"),
        no_jkn: (value) => validateRequired(value, "Nomor JKN") || validateExactLength(value, 13, "Nomor JKN"),
        tempat_lahir: (value) => validateRequired(value, "Tempat lahir"),
        tanggal_lahir: (value) => validateRequired(value, "Tanggal lahir"),
        golongan_darah: (value) => validateDropdown(value, "Golongan darah"),
        berat_badan: (value) => validateNonNegativeNumber(value, "Berat badan"),
        tinggi_badan: (value) => validateNonNegativeNumber(value, "Tinggi badan"),
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: ValidationErrors } = {};

        if (!isNotYetDelivered) {
            Object.entries(formData).forEach(([childId, data]) => {
                const childErrors: ValidationErrors = {};
                Object.entries(data).forEach(([field, value]) => {
                    const validateFn = validationRules[field as keyof ChildData];
                    const error = validateFn(value);
                    if (error) childErrors[field] = error;
                });
                if (Object.keys(childErrors).length > 0) newErrors[childId] = childErrors;
            });
        }

        if (isNotYetDelivered && !lastMenstrualDate) {
            setMensError("Tanggal terakhir menstruasi harus diisi");
            return false; // Explicitly return false if validation fails
        } else {
            setMensError("");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && (!isNotYetDelivered || !!lastMenstrualDate);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting with lastMenstrualDate:", lastMenstrualDate); // Debug log
        if (validateForm()) {
            const submissionData = isNotYetDelivered
                ? { lastMenstrualDate }
                : Object.values(formData).map((data) => ({
                      ...data,
                      berat_badan: parseInt(data.berat_badan) || 0,
                      tinggi_badan: parseInt(data.tinggi_badan) || 0,
                  }));
            console.log("Submission data:", submissionData); // Debug log
            onNext(submissionData);
        } else {
            console.log("Validation failed, mensError:", mensError); // Debug log
        }
    };

    const getInputClassName = (childId: string, field: string): string => {
        return errors[childId]?.[field]
            ? "bg-gray-50 border-2 border-red-500 text-gray-900 rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            : "bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5";
    };

    const getMensInputClassName = (): string => {
        return mensError
            ? "bg-gray-50 border-2 border-red-500 text-gray-900 rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            : "bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5";
    };

    const handleNotYetDelivered = () => {
        setIsNotYetDelivered(true);
        setChildrenCount(0); // Clear child forms
        setFormData({}); // Reset form data
        setErrors({}); // Reset errors
        setDropdownStates({}); // Reset dropdowns
        setLastMenstrualDate(""); // Ensure menstrual date is reset
        setMensError("");
    };

    const handleBackToChildForm = () => {
        setIsNotYetDelivered(false);
        setLastMenstrualDate("");
        setMensError("");
        setChildrenCount(1);
        setFormData({ "1": { ...initialChildData } });
        setErrors({ "1": {} });
        setDropdownStates({ "1": { isBloodTypeOpen: false } });
    };

    const renderChildForm = (childNumber: number) => {
        const childId = childNumber.toString();
        const data = formData[childId];
        const state = dropdownStates[childId];

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
                            id={`nama-${childId}`}
                            value={data.nama}
                            onChange={(e) => handleInputChange(childId, "nama", e.target.value, 255)}
                            className={getInputClassName(childId, "nama")}
                            placeholder="Nama Lengkap"
                            maxLength={255}
                        />
                        {errors[childId]?.nama && <p className="text-red-500 text-xs mt-1">{errors[childId].nama}</p>}
                    </div>
                    <div>
                        <label htmlFor={`nik-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                        <input
                            type="text"
                            id={`nik-${childId}`}
                            value={data.nik}
                            onChange={(e) => handleInputChange(childId, "nik", e.target.value, 16)}
                            className={getInputClassName(childId, "nik")}
                            placeholder="NIK (16 karakter)"
                            maxLength={16}
                        />
                        {errors[childId]?.nik && <p className="text-red-500 text-xs mt-1">{errors[childId].nik}</p>}
                    </div>
                    <div>
                        <label htmlFor={`no_jkn-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">No. JKN</label>
                        <input
                            type="text"
                            id={`no_jkn-${childId}`}
                            value={data.no_jkn}
                            onChange={(e) => handleInputChange(childId, "no_jkn", e.target.value, 13)}
                            className={getInputClassName(childId, "no_jkn")}
                            placeholder="Nomor JKN (13 karakter)"
                            maxLength={13}
                        />
                        {errors[childId]?.no_jkn && <p className="text-red-500 text-xs mt-1">{errors[childId].no_jkn}</p>}
                    </div>
                    <div>
                        <label htmlFor={`tempat_lahir-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tempat Lahir</label>
                        <input
                            type="text"
                            id={`tempat_lahir-${childId}`}
                            value={data.tempat_lahir}
                            onChange={(e) => handleInputChange(childId, "tempat_lahir", e.target.value, 255)}
                            className={getInputClassName(childId, "tempat_lahir")}
                            placeholder="Tempat Lahir"
                            maxLength={255}
                        />
                        {errors[childId]?.tempat_lahir && <p className="text-red-500 text-xs mt-1">{errors[childId].tempat_lahir}</p>}
                    </div>
                    <div>
                        <label htmlFor={`tanggal_lahir-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                        <input
                            type="date"
                            id={`tanggal_lahir-${childId}`}
                            value={data.tanggal_lahir}
                            onChange={(e) => handleInputChange(childId, "tanggal_lahir", e.target.value)}
                            className={getInputClassName(childId, "tanggal_lahir")}
                        />
                        {errors[childId]?.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors[childId].tanggal_lahir}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Golongan Darah</label>
                        <button
                            type="button"
                            onClick={() => toggleDropdown(childId)}
                            className={`text-gray-500 w-full bg-gray-100 hover:bg-gray-200 flex justify-between items-center h-11 font-medium rounded-xl text-sm px-5 py-2.5 ${errors[childId]?.golongan_darah ? "border-2 border-red-500" : ""}`}
                        >
                            {data.golongan_darah}
                            <svg className={`w-2.5 h-2.5 ml-3 transform ${state.isBloodTypeOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {state.isBloodTypeOpen && (
                            <div className="z-10 bg-gray-100 rounded-xl shadow-sm mt-2 w-full">
                                <ul className="py-2 text-gray-700 font-medium">
                                    {dropdownOptions.golongan_darah.map((option) => (
                                        <li key={option}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelect(childId, option);
                                                }}
                                                className="flex items-center px-4 py-2 hover:bg-gray-200"
                                            >
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {errors[childId]?.golongan_darah && <p className="text-red-500 text-xs mt-1">{errors[childId].golongan_darah}</p>}
                    </div>
                    <div>
                        <label htmlFor={`berat_badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Berat Badan (kg)</label>
                        <input
                            type="text"
                            id={`berat_badan-${childId}`}
                            value={data.berat_badan}
                            onChange={(e) => handleInputChange(childId, "berat_badan", e.target.value)}
                            className={getInputClassName(childId, "berat_badan")}
                            placeholder="Berat Badan"
                        />
                        {errors[childId]?.berat_badan && <p className="text-red-500 text-xs mt-1">{errors[childId].berat_badan}</p>}
                    </div>
                    <div>
                        <label htmlFor={`tinggi_badan-${childId}`} className="block mb-2 text-sm font-medium text-gray-900">Tinggi Badan (cm)</label>
                        <input
                            type="text"
                            id={`tinggi_badan-${childId}`}
                            value={data.tinggi_badan}
                            onChange={(e) => handleInputChange(childId, "tinggi_badan", e.target.value)}
                            className={getInputClassName(childId, "tinggi_badan")}
                            placeholder="Tinggi Badan"
                        />
                        {errors[childId]?.tinggi_badan && <p className="text-red-500 text-xs mt-1">{errors[childId].tinggi_badan}</p>}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                        Isi Data Anak Anda ✍️
                    </h1>
                    {!isNotYetDelivered && (
                        <button
                            type="button"
                            onClick={handleNotYetDelivered}
                            className="bg-gray-200 text-gray-900 font-medium rounded-xl px-6 py-2.5 hover:bg-gray-300"
                        >
                            Belum Melahirkan
                        </button>
                    )}
                </div>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {!isNotYetDelivered && Array.from({ length: childrenCount }, (_, i) => renderChildForm(i + 1))}
                    {isNotYetDelivered && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="lastMenstrualDate" className="block mb-2 text-sm font-medium text-gray-900">
                                    Tanggal Terakhir Menstruasi
                                </label>
                                <input
                                    type="date"
                                    id="lastMenstrualDate"
                                    value={lastMenstrualDate}
                                    onChange={(e) => {
                                        console.log("Date selected:", e.target.value); // Debug log
                                        setLastMenstrualDate(e.target.value);
                                    }}
                                    className={getMensInputClassName()}
                                    required // Add required attribute for browser validation
                                />
                                {mensError && <p className="text-red-500 text-xs mt-1">{mensError}</p>}
                            </div>
                            <div className="grid lg:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handleBackToChildForm}
                                    className="bg-gray-200 text-gray-900 font-medium rounded-xl px-6 py-2.5 w-full hover:bg-gray-300"
                                >
                                    Kembali ke Form Data Anak
                                </button>
                                <button
                                    type="submit"
                                    className="bg-wine text-white font-medium rounded-xl px-6 py-2.5 w-full hover:bg-dark-wine"
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    )}
                    {!isNotYetDelivered && (
                        <div className="space-y-2 flex flex-col mt-6">
                            <div className="grid lg:grid-cols-2 gap-4">
                                {onBack && (
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        className="bg-gray-200 text-gray-900 font-medium rounded-xl px-6 py-2.5 hover:bg-gray-300"
                                    >
                                        Kembali ke Form Orang Tua
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="bg-wine text-white font-medium rounded-xl px-6 py-2.5 hover:bg-dark-wine"
                                >
                                    Selanjutnya
                                </button>
                            </div>
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
                    )}
                </form>
            </div>
        </div>
    );
}
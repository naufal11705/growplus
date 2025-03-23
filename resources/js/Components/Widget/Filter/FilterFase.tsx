import React, { useState } from "react";

interface FilterFaseProps {
    onFilterChange: (filters: { faseId: string; status: string }) => void;
}

const FilterFase: React.FC<FilterFaseProps> = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [faseId, setFaseId] = useState("");
    const [status, setStatus] = useState("");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const toggleFase = () => setIsOpen(!isOpen);
    const toggleStatusFase = () => setIsStatusOpen(!isStatusOpen);
    const handleFaseIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFaseId(e.target.value);
        onFilterChange({ faseId: e.target.value, status });
    };
    const handleStatusChange = (selectedStatus: string) => {
        setStatus(selectedStatus);
        setIsStatusOpen(false);
        onFilterChange({ faseId, status: selectedStatus });
    };
    const handleClearAll = () => {
        setFaseId("");
        setStatus("");
        onFilterChange({ faseId: "", status: "" });
    };

    return (
        <div className="relative">
            <button onClick={toggleFase} className="flex items-center px-4 py-2 bg-wine text-white rounded-xl shadow hover:bg-dark-wine transition duration-200">
                Filter <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                        <button onClick={handleClearAll} className="text-gray-600 text-sm hover:underline">Clear all</button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fase ID</label>
                        <input type="text" value={faseId} onChange={handleFaseIdChange} placeholder="Cari Fase ID..." className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
                    </div>

                    <div className="relative">
                        <button onClick={toggleStatusFase} className="w-full flex justify-between items-center text-gray-700 hover:text-wine">
                        {status || "Status"} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isStatusOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>
                        </button>
                        {isStatusOpen && (
                        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                            <button onClick={() => handleStatusChange("Aktif")} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Aktif</button>
                            <button onClick={() => handleStatusChange("Tidak Aktif")} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Tidak Aktif</button>
                        </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterFase;
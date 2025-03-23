import React, { useState } from "react";

interface FilterPuskesmasProps {
  onFilterChange: (puskesmasId: string) => void;
}

const FilterPuskesmas: React.FC<FilterPuskesmasProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [puskesmasId, setPuskesmasId] = useState("");

  const togglePuskesmas = () => setIsOpen(!isOpen);
  const handlePuskesmasIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPuskesmasId(e.target.value);
    onFilterChange(e.target.value);
  };
  const handleClear = () => {
    setPuskesmasId("");
    onFilterChange("");
  };

  return (
    <div className="relative">
      <button onClick={togglePuskesmas} className="flex items-center px-4 py-2 bg-wine text-white rounded-xl shadow hover:bg-dark-wine transition duration-200">
        Filter Puskesmas<svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filter Puskesmas</h3>
            <button onClick={handleClear} className="text-gray-600 text-sm hover:underline">Clear</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Puskesmas ID</label>
            <input type="text" value={puskesmasId} onChange={handlePuskesmasIdChange} placeholder="Cari Puskesmas ID..." className="w-full px-3 py-2 border rounded-xl border-gray-200" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPuskesmas;
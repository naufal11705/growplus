import React, { useState } from "react";

interface FilterKecamatanProps {
  onFilterChange: (kecamatan: string) => void;
}

const FilterKecamatan: React.FC<FilterKecamatanProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [kecamatan, setKecamatan] = useState("");

  const toggleKecamatan = () => setIsOpen(!isOpen);
  const handleKecamatanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKecamatan(e.target.value);
    onFilterChange(e.target.value);
  };
  const handleClear = () => {
    setKecamatan("");
    onFilterChange("");
  };

  return (
    <div className="relative">
      <button onClick={toggleKecamatan} className="flex items-center px-4 py-2 bg-wine text-white rounded-xl shadow hover:bg-dark-wine transition duration-200">
        Filter Kecamatan <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filter Kecamatan</h3>
            <button onClick={handleClear} className="text-gray-600 text-sm hover:underline">Clear</button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
            <input type="text" value={kecamatan} onChange={handleKecamatanChange} placeholder="Cari Kecamatan..." className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterKecamatan;
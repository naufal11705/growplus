import React from 'react';

const SaleBanner = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white w-full">
      {/* Bagian Kiri: Teks Promosi */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Black Friday Sale</span>
        <span className="text-lg font-bold">20% off every Product</span>
        <button className="mt-2 px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg hover:bg-gray-100 transition">
          Buy Now →
        </button>
      </div>

      {/* Bagian Kanan: Ikon Hadiah */}
      <div>
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SaleBanner;
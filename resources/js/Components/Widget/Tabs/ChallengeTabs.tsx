import { useState } from "react";

export default function ChallengeTabs() {
  const categories = ["All", "Kategori 1", "Kategori 2"];
  const [active, setActive] = useState("All");

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg space-x-2 mb-8 w-full">
      {categories.map((category) => (
        <button key={category} onClick={() => setActive(category)} className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${active === category ? "bg-white text-black" : "text-gray-600 hover:text-black"}`}>
          {category}
        </button>
      ))}
    </div>
  );
}

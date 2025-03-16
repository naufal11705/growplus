import { StuntingTables } from "../../../Data/StuntingTables";

export default function StuntingTable() {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-xl w-full">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Region</th>
            <th scope="col" className="px-6 py-3">Total Cases</th>
            <th scope="col" className="px-6 py-3">Percentage (%)</th>
            <th scope="col" className="px-6 py-3">Year</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {StuntingTables.map((item, index) => (
            <tr key={item.id} className="bg-white border-b border-gray-200 text-center">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-4">{item.region}</td>
              <td className="px-6 py-4">{item.totalCases.toLocaleString()}</td>
              <td className="px-6 py-4">{item.percentage}%</td>
              <td className="px-6 py-4">{item.year}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-wine hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

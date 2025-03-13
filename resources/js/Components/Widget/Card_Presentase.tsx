import { PresentaseData } from "../../Data/Card_Presentase";
export default function Card_Presentase() {
    return(
        <div className="lg:flex lg:flex-row flex flex-col text-center gap-3">
            {PresentaseData.map((item, index) => (
                <a key={index} href="#" className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:bg-gray-100">
                    <h5 className="mb-2 text-6xl font-extrabold tracking-tight text-gray-900">{item.value}</h5>
                    <p className="font-bold text-gray-400">{item.description}</p>
                </a>
            ))}
        </div>
    );
}
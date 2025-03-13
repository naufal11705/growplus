import Sample from '../../../assets/images/Sample.png';
import { ListFeatures } from '../../Data/Features';
export default function Features() {
    return (
        <section className="">
            <div className="px-4 mx-auto max-w-screen-xl text-left">
                <div className="flex lg:flex-row flex-col gap-2 h-full">
                    <div className="">
                        <img src={Sample} alt="" className="w-[800px] rounded-2xl h-auto" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl w-full h-full lg:p-10 p-7 justify-between">
                        <h1 className="lg:text-3xl text-2xl font-bold lg:mb-2 mb-1">Additional Medical Feature</h1>
                        <h1 className="lg:text-lg text-sm font-semibold mb-5 opacity-50">Offer programs focused on preventive care, nutrition, exercise, and mental health complete with tracking and progress reports </h1>
                        <ul className="lg:gap-5 gap-3 grid grid-cols-1 text-gray-500 list-inside lg:grid lg:grid-cols-2 mb-2">
                            {ListFeatures.map((item, index) => (
                                <li key={index} className="flex font-semibold lg:text-lg text-md">
                                    <svg className="w-5 h-5 me-2 mt-[3px] text-wine flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

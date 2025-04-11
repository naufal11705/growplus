import { useState } from "react";

interface LastMenstrualDateFormProps {
    onNext: (data: { lastMenstrualDate: string }) => void;
    onBackToChildForm: () => void;
}

export default function LastMenstrualDateForm({ onNext, onBackToChildForm }: LastMenstrualDateFormProps) {
    const [lastMenstrualDate, setLastMenstrualDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lastMenstrualDate) {
            setError("Tanggal terakhir menstruasi harus diisi");
            return;
        }
        setError("");
        onNext({ lastMenstrualDate });
    };

    const getInputClassName = (): string => {
        return error
            ? "bg-gray-50 border-2 border-red-500 text-gray-900 rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
            : "bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5";
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow border border-gray-200">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                    Isi Tanggal Terakhir Menstruasi ✍️
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="lastMenstrualDate" className="block mb-2 text-sm font-medium text-gray-900">
                            Tanggal Terakhir Menstruasi
                        </label>
                        <input
                            type="date"
                            id="lastMenstrualDate"
                            value={lastMenstrualDate}
                            onChange={(e) => setLastMenstrualDate(e.target.value)}
                            className={getInputClassName()}
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={onBackToChildForm}
                            className="bg-gray-200 text-gray-900 font-medium rounded-xl px-6 py-2.5 hover:bg-gray-300"
                        >
                            Kembali ke Form Data Anak
                        </button>
                        <button
                            type="submit"
                            className="bg-wine text-white font-medium rounded-xl px-6 py-2.5 hover:bg-dark-wine"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
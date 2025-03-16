interface StepperProps {
    currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
    const steps = [{ id: 1, label: "Data Keluarga" }, { id: 2, label: "Data Anak" }, { id: 3, label: "Selesai" }];

    return (
        <div className="relative w-full flex items-center justify-center mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
            <div
                className="absolute top-1/2 left-0 h-1 bg-wine transform -translate-y-1/2"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            <ol className="relative z-10 flex w-full justify-between">
                {steps.map((step) => (
                    <li key={step.id} className="flex flex-col items-center">
                        <span className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full ${currentStep >= step.id ? "bg-wine text-white" : "bg-gray-300 text-gray-500"}`}>
                            {currentStep > step.id ? (
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                            ) : (
                                step.id
                            )}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

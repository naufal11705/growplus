interface AdminAlertProps {
    type: 'success' | 'error' | 'warning';
    message: string;
    onClose: () => void;
}

export default function AdminAlert({ type, message, onClose }: AdminAlertProps) {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="mx-auto mb-4 text-green-500 w-12 h-12" aria-hidden={true} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="mx-auto mb-4 text-red-500 w-12 h-12" aria-hidden={true} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="mx-auto mb-4 text-yellow-500 w-12 h-12" aria-hidden={true} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getButtonColor = () => {
        switch (type) {
            case 'success': return 'bg-green-600 hover:bg-green-800 focus:ring-green-300';
            case 'error': return 'bg-red-600 hover:bg-red-800 focus:ring-red-300';
            case 'warning': return 'bg-yellow-600 hover:bg-yellow-800 focus:ring-yellow-300';
            default: return 'bg-gray-600 hover:bg-gray-800 focus:ring-gray-300';
        }
    };

    return (
        <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <button type="button" className="absolute top-3 end-2.5 text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center" onClick={onClose}>
                        <svg className="w-3 h-3" aria-hidden={true} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        {getIcon()}
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
                        <button type="button" className={`text-white ${getButtonColor()} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`} onClick={onClose}>
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
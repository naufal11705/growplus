"use client"

interface AdminAlertProps {
  type: "success" | "error" | "warning" | "confirm"
  message: string
  onClose: () => void
  onConfirm?: () => void
}

export default function AdminAlert({ type, message, onClose, onConfirm }: AdminAlertProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6 transform transition-transform duration-500 animate-icon-entry">
            <svg
              className="w-8 h-8 text-green-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )
      case "error":
        return (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6 transform transition-transform duration-500 animate-icon-entry">
            <svg
              className="w-8 h-8 text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )
      case "warning":
      case "confirm":
        return (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-6 transform transition-transform duration-500 animate-icon-entry">
            <svg
              className="w-8 h-8 text-amber-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-wine hover:bg-dark-wine focus:ring-wine active:bg-dark-wine text-white"
      case "error":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-300 active:bg-red-800 text-white"
      case "warning":
        return "bg-wine hover:bg-dark-wine focus:ring-wine active:bg-dark-wine text-white"
      case "confirm":
        return "bg-wine hover:bg-dark-wine focus:ring-wine active:bg-dark-wine text-white"
      default:
        return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 active:bg-gray-800 text-white"
    }
  }

  const getModalAccent = () => {
    switch (type) {
      case "success":
        return "ring-green-100"
      case "error":
        return "ring-red-100"
      case "warning":
        return "ring-amber-100"
      case "confirm":
        return "ring-sky-100"
      default:
        return "ring-gray-100"
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 animate-backdrop-fade"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

      {/* Modal */}
      <div
        className={`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 pt-8 pb-6 text-left shadow-xl transition-all ring-1 ring-gray-200 ${getModalAccent()} animate-modal-entry sm:my-8 sm:p-8`}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {getIcon()}

          <h3 id="alert-title" className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
            {message}
          </h3>

          {/* Buttons */}
          {type === "confirm" ? (
            <div className="mt-4 flex space-x-3 w-full sm:w-auto">
              <button
                type="button"
                className={`flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-lg ${getButtonColor()} focus:outline-none focus:ring-4 shadow-sm transition-all duration-200 transform`}
                onClick={onConfirm}
              >
                Update
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none justify-center px-5 py-2.5 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 shadow-sm transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-[1px]"
                onClick={onClose}
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={`mt-4 px-5 py-2.5 text-sm font-medium rounded-lg ${getButtonColor()} focus:outline-none focus:ring-4 shadow-sm transition-all duration-200 transform`}
              onClick={onClose}
            >
              Kembali
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


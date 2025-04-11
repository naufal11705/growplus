  "use client"

  import { useState, useRef, useEffect, type ChangeEvent, type DragEvent } from "react"
  import { CloudIcon, XIcon, XCircleIcon } from "lucide-react"

  interface ImageUploadModalProps {
    isOpen: boolean
    onClose: () => void
    onUpload: (file: File) => void
    maxSizeInMB?: number
    allowedTypes?: string[]
    title?: string
  }

  export default function ImageUploadModal({
    isOpen,
    onClose,
    onUpload,
    maxSizeInMB = 50,
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
    title = "Upload Image",
  }: ImageUploadModalProps) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    // Handle escape key to close modal
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          handleCancel()
        }
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscape)
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "" // Restore scrolling when modal is closed
      }
    }, [isOpen])

    // Handle click outside to close modal
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          handleCancel()
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      processFile(selectedFile)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFile = e.dataTransfer.files?.[0]
      processFile(droppedFile)
    }

    const processFile = (selectedFile?: File) => {
      setError(null)

      if (!selectedFile) {
        return
      }

      // Check file type
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          `Unsupported file format. Please upload ${allowedTypes.map((type) => type.split("/")[1].toUpperCase()).join(", ")} files only.`,
        )
        return
      }

      // Check file size
      if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeInMB}MB limit.`)
        return
      }

      setFile(selectedFile)

      // Create preview for image files
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else if (selectedFile.type === "video/mp4") {
        // For video files, we could create a thumbnail, but for simplicity we'll just show the file name
        setPreview(null)
      }
    }

    const handleUpload = () => {
      if (file) {
        onUpload(file)
        resetState()
        onClose()
      }
    }

    const resetState = () => {
      setFile(null)
      setPreview(null)
      setError(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }

    const handleCancel = () => {
      resetState()
      onClose()
    }

    const formatFileTypes = () => {
      return allowedTypes.map((type) => type.split("/")[1].toUpperCase()).join(", ")
    }

    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white shadow-xl animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
            <button
              onClick={handleCancel}
              className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Close"
            >
              <XIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <div className="flex items-center gap-2">
                  <XCircleIcon className="h-4 w-4" />
                  {error}
                </div>
              </div>
            )}

            {!file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                aria-label="File upload area"
                tabIndex={0}
                role="button"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click()
                  }
                }}
              >
                <CloudIcon className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                <p className="text-base font-medium mb-1">Choose a file or drag & drop it here</p>
                <p className="text-sm text-gray-500">
                  {formatFileTypes()} formats, up to {maxSizeInMB}MB
                </p>
                <button className="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Browse File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept={allowedTypes.join(",")}
                  aria-label="File input"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Selected file:</p>
                  <button
                    onClick={resetState}
                    className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
                    aria-label="Remove selected file"
                  >
                    Change
                  </button>
                </div>

                {preview ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-gray-100">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-4 border rounded-lg">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button
              onClick={handleCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                file ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "bg-blue-400 cursor-not-allowed"
              }`}
              aria-disabled={!file}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    )
  }

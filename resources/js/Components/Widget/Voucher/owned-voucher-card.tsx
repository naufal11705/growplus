"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Clock, AlertCircle, ExternalLink, Copy, Check, FileText } from 'lucide-react'
import type { Voucher } from "@/types/voucher"
import { generateVoucherPDF } from "@/Lib/pdfGenerator"

interface OwnedVoucherCardProps {
  voucher: Voucher
  onUse: () => void
}

export default function OwnedVoucherCard({ voucher, onUse }: OwnedVoucherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCopyCode = () => {
    if (voucher.code) {
      navigator.clipboard.writeText(voucher.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExportPDF = async () => {
    try {
      setIsExporting(true)
      await generateVoucherPDF(voucher)
      setIsExporting(false)
    } catch (error) {
      console.error("Failed to export PDF:", error)
      setIsExporting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden"
      ref={cardRef}
    >
      {/* Cinema ticket style card with notches */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative">
        {/* Left notch */}
        <div className="absolute left-0 top-1/2 w-4 h-8 bg-gray-100 rounded-r-full -ml-2 transform -translate-y-1/2"></div>
        {/* Right notch */}
        <div className="absolute right-0 top-1/2 w-4 h-8 bg-gray-100 rounded-l-full -mr-2 transform -translate-y-1/2"></div>

        {/* Redeemed badge */}
        <div className="absolute top-0 right-0 bg-pinky text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          REDEEMED
        </div>

        {/* Top section with logo and title */}
        <div className="p-5 flex items-center border-b border-dashed border-gray-200">
          <div className="w-16 h-16 relative flex-shrink-0 mr-4 bg-white rounded-lg overflow-hidden border border-gray-100">
            <img
              src={voucher.logoUrl || "/placeholder.svg"}
              alt={`${voucher.provider} logo`}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 uppercase tracking-wider">{voucher.provider}</div>
            <h3 className="text-xl font-bold text-gray-800">{voucher.title}</h3>
          </div>
        </div>

        {/* Middle section with details */}
        <div className="p-5 bg-white">
          <p className="text-gray-600 mb-3">{voucher.description}</p>

          {voucher.redeemDate && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Redeemed on: {voucher.redeemDate}</span>
            </div>
          )}

          {voucher.code && (
            <div className="mt-4 bg-gray-50 border border-dashed border-gray-300 rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Voucher Code</p>
                  <p className="font-mono font-bold text-gray-800 tracking-wider">{voucher.code}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCode}
                  className="p-2 text-gray-500 hover:text-dark-pinky rounded-full hover:bg-gray-100"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom section with buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-pinky text-white hover:bg-dark-pinky transition-colors duration-200"
              onClick={onUse}
            >
              Gunakan
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-sm flex items-center transition-all duration-200"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating PDF...
                </span>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" /> Export as PDF
                </>
              )}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Hide
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> Details
              </>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              <h4 className="font-semibold text-gray-700 mb-2">Terms & Conditions</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {voucher.terms.map((term, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>

              {voucher.expiryDate && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Expires on: <span className="font-medium ml-1">{voucher.expiryDate}</span>
                  </p>
                </div>
              )}

              {voucher.providerUrl && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a
                    href={voucher.providerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
                  >
                    Visit {voucher.provider} <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

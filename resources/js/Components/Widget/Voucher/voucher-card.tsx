"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Clock, AlertCircle, ExternalLink } from "lucide-react"
import type { Voucher } from "@/types/voucher"

interface VoucherCardProps {
  voucher: Voucher
  userPoints: number
  onRedeem: () => void
}

export default function VoucherCard({ voucher, userPoints, onRedeem }: VoucherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const canRedeem = userPoints >= voucher.pointsCost

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden"
    >
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden relative">
        {/* Left notch */}
        <div className="absolute left-0 top-1/2 w-4 h-8 bg-gray-200 rounded-r-full -ml-1 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-4 h-8 bg-gray-200 rounded-l-full -mr-1 transform -translate-y-1/2"></div>

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

        <div className="p-5 bg-white">
          <p className="text-gray-600 mb-3">{voucher.description}</p>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>{voucher.validity}</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="text-lg font-bold text-pinky">{voucher.pointsCost}</span>
              <span className="ml-1 text-gray-500">points</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              canRedeem
                ? "bg-pinky text-white hover:bg-dark-pinky"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={onRedeem}
            disabled={!canRedeem}
          >
            Tukar Voucher
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Sembunyikan
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
                    className="text-sm text-pinky hover:text-dark-pinky flex items-center"
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

"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"

interface PointsDisplayProps {
  points: number
}

export default function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-pinky to-light-pinky rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-white text-lg font-medium">Points Kamu</p>
          <p className="text-white text-4xl font-bold">{points}</p>
          <p className="text-gray-50 text-sm mt-1">Tukarkan Poin Kamu Untuk Vouchers Yang Menarik Dibawah Ini 🤩</p>
        </div>

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          className="bg-white/20 p-4 rounded-full"
        >
          <Gift className="h-10 w-10 text-white" />
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-pinky to-light-pinky px-6 py-3 flex justify-between items-center">
        <p className="text-teal-100 text-sm">
          Point Kedaluwarsa: <span className="font-medium text-white">45 Hari</span>
        </p>
        <a href="/tantangan">
          <button className="text-xs bg-white text-pinky px-3 py-1 rounded-full font-medium hover:bg-teal-50 transition-colors">
            Dapatkan Points
          </button>
        </a>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  icon: ReactNode
  label: string
  count?: number
}

export default function TabButton({ isActive, onClick, icon, label, count }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-md text-sm font-medium flex items-center ${
        isActive ? "bg-pinky text-white" : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}

      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            isActive ? "bg-white text-pinky" : "bg-gray-100 text-gray-700"
          }`}
        >
          {count}
        </span>
      )}

      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-md bg-pinky -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

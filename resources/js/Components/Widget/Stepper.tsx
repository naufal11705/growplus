"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface StepperProps {
  currentStep: number
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { id: 1, label: "Data Keluarga" },
    { id: 2, label: "Data Anak" },
    { id: 3, label: "Selesai" },
  ]

  const [prevStep, setPrevStep] = useState(currentStep)

  useEffect(() => {
    setPrevStep(currentStep)
  }, [currentStep])

  // Calculate progress width based on current step
  const getProgressWidth = (step: number) => {
    const totalSteps = steps.length

    // For first step, progress should be 0%
    if (step <= 1) return "0%"

    // For last step, progress should be 100%
    if (step > totalSteps) return "100%"

    // For intermediate steps, calculate the exact position
    const stepPosition = (step - 1) / (totalSteps - 1)
    return `${stepPosition * 100}%`
  }

  return (
    <div className="relative w-full py-12 px-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 w-full"></div>
          <motion.div
            className="absolute top-0 left-0 h-1 bg-wine origin-left"
            initial={{ width: getProgressWidth(prevStep) }}
            animate={{ width: getProgressWidth(currentStep) }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          ></motion.div>

          {/* Steps positioned on the progress bar */}
          <ol className="relative flex w-full">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`flex flex-col ${
                  step.id === 1 ? "w-1/3 items-start" : step.id === 2 ? "w-1/3 items-center" : "w-1/3 items-end"
                }`}
              >
                <motion.div
                  className={`relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-300 -mt-[20px] lg:-mt-[24px] ${
                    currentStep > step.id
                      ? "bg-wine text-white"
                      : currentStep === step.id
                        ? "bg-wine text-white"
                        : "bg-white text-gray-400 border border-gray-200"
                  }`}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: currentStep === step.id ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    times: [0, 0.5, 1],
                    repeat: currentStep === step.id ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 2,
                  }}
                >
                  {currentStep > step.id ? (
                    <motion.svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 12l5 5L20 7"
                      />
                    </motion.svg>
                  ) : (
                    <span className="text-lg font-medium">{step.id}</span>
                  )}

                  {currentStep === step.id && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-pink-400 opacity-20"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.span>
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.span
                  className={`mt-4 text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-500"}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * step.id }}
                >
                  {step.label}
                </motion.span>

                {/* Step Status */}
                <motion.span
                  className={`text-xs mt-1 ${
                    currentStep > step.id
                      ? "text-green-500"
                      : currentStep === step.id
                        ? "text-pink-500"
                        : "text-gray-400"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 * step.id }}
                >
                  {currentStep > step.id ? "Selesai" : currentStep === step.id ? "Sedang Diproses" : "Menunggu"}
                </motion.span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

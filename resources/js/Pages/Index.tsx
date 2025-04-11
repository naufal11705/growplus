"use client"

import type React from "react"

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import About from "@/Components/UI/About"
import Category from "@/Components/UI/Category"
import Features from "@/Components/UI/Features"
import Promotion from "@/Components/UI/Promotion"
import Ads from "@/Components/Widget/Ads"
import Banner from "@/Components/Widget/Banner"
import Layout from "@/Layouts/Anonymous"
import "../../css/app.css"
import type { Fase } from "@/types/fase"
import { fases as defaultFases } from "@/Data/FaseCard"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Enhanced animation variants with blur effects
const animations = {
  blurFadeIn: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: (i = 0) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.8, delay: i * 0.1 },
        filter: { duration: 0.8, delay: i * 0.1 },
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.5 },
    },
  },
  blurSlideUp: {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(8px)",
    },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.7, delay: i * 0.1 },
        y: {
          type: "spring",
          stiffness: 50,
          damping: 15,
          delay: i * 0.1,
        },
        filter: { duration: 0.7, delay: i * 0.1 },
      },
    }),
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(8px)",
      transition: { duration: 0.5 },
    },
  },
  blurSlideFromLeft: {
    hidden: {
      opacity: 0,
      x: -100,
      filter: "blur(12px)",
    },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.7, delay: i * 0.1 },
        x: {
          type: "spring",
          stiffness: 70,
          damping: 20,
          delay: i * 0.1,
        },
        filter: { duration: 0.7, delay: i * 0.1 },
      },
    }),
    exit: {
      opacity: 0,
      x: -50,
      filter: "blur(12px)",
      transition: { duration: 0.5 },
    },
  },
  blurSlideFromRight: {
    hidden: {
      opacity: 0,
      x: 100,
      filter: "blur(12px)",
    },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.7, delay: i * 0.1 },
        x: {
          type: "spring",
          stiffness: 70,
          damping: 20,
          delay: i * 0.1,
        },
        filter: { duration: 0.7, delay: i * 0.1 },
      },
    }),
    exit: {
      opacity: 0,
      x: 50,
      filter: "blur(12px)",
      transition: { duration: 0.5 },
    },
  },
  blurScaleUp: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(15px)",
    },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        opacity: { duration: 0.7, delay: i * 0.1 },
        scale: {
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: i * 0.1,
        },
        filter: { duration: 0.7, delay: i * 0.1 },
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(15px)",
      transition: { duration: 0.5 },
    },
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },
}

// Custom hook for scroll-linked blur effect
function useScrollBlur(threshold = 0.1) {
  const [blurAmount, setBlurAmount] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Calculate blur based on scroll velocity
      const previous = scrollYProgress.getPrevious() ?? latest;
      const delta = Math.abs(latest - previous);
      if (delta > threshold) {
        setBlurAmount(Math.min(delta * 50, 10)) // Max blur of 10px

        // Reset blur after a short delay
        setTimeout(() => {
          setBlurAmount(0)
        }, 200)
      }
    })
  }, [scrollYProgress, threshold])

  return blurAmount
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
}

// Enhanced AnimatedSection with scroll-linked animations
const AnimatedSection = ({ children, className = "", delay = 0, index = 0 }: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "-100px 0px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create spring-based scroll progress for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform scroll progress into opacity and y-offset values
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0.6, 1, 1, 0.6])
  const y = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [30, 0, 0, -30])
  const scale = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.98])
  const blur = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [3, 0, 0, 3])

  // Select animation style based on section index for variety
  const animationStyles = [
    animations.blurFadeIn,
    animations.blurSlideUp,
    animations.blurSlideFromLeft,
    animations.blurSlideFromRight,
    animations.blurScaleUp,
  ]
  const animationIndex = index % animationStyles.length
  const selectedAnimation = animationStyles[animationIndex]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      custom={delay}
      variants={selectedAnimation}
      style={{
        opacity,
        y,
        scale,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

interface FaseCardsProps {
  fases?: Fase[]
}

export default function Index({ fases: propFases }: FaseCardsProps) {
  const dataFase = propFases ?? defaultFases
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true })
  const blurAmount = useScrollBlur(0.08)
  const { scrollYProgress } = useScroll()
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Global blur effect based on scroll velocity
  const globalBlur = useTransform(smoothScrollProgress, (value) => {
    return `blur(${blurAmount}px)`
  })

  return (
    <AnimatePresence mode="wait">
      <Layout>
        <motion.div style={{ filter: globalBlur }} className="w-full">
          <AnimatedSection className="lg:mt-24 mt-20" index={0}>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:text-center lg:py-16">
              <motion.h1
                ref={headingRef}
                className="lg:mb-6 mb-5 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
                variants={animations.staggerChildren}
                initial="hidden"
                animate={isHeadingInView ? "visible" : "hidden"}
                exit="exit"
              >
                <motion.span variants={animations.blurSlideFromLeft} custom={0}>
                  Bersama{" "}
                </motion.span>
                <motion.span
                  className="underline decoration-wavy decoration-wine"
                  variants={animations.blurScaleUp}
                  custom={0.3}
                  whileHover={{
                    scale: 1.05,
                    color: "#a52a2a",
                    filter: "blur(0px) brightness(1.2)",
                    transition: { duration: 0.2 },
                  }}
                >
                  Grow+
                </motion.span>
                <motion.span variants={animations.blurSlideFromRight} custom={0.6}>
                  , cegah stunting <br /> sejak dini{" "}
                </motion.span>
                <motion.span
                  variants={animations.blurScaleUp}
                  custom={0.9}
                  whileHover={{
                    rotate: [0, -10, 20, -10, 0],
                    scale: 1.2,
                    filter: "blur(0px) drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                    transition: {
                      duration: 0.5,
                      times: [0, 0.2, 0.5, 0.8, 1],
                      ease: "easeInOut",
                    },
                  }}
                >
                  👶🏽
                </motion.span>
                <br />
              </motion.h1>

              <motion.p
                className="lg:mb-10 mb-7 text-lg font-normal lg:px-56 text-gray-500 lg:text-xl"
                variants={animations.blurFadeIn}
                custom={1.2}
                initial="hidden"
                animate={isHeadingInView ? "visible" : "hidden"}
                exit="exit"
              >
                Grow+ hadir sebagai pendamping ibu hamil dan anak usia dini menuju kesehatan optimal, karena setiap
                langkah kecil hari ini adalah investasi besar untuk masa depan generasi Indonesia!
              </motion.p>

              <motion.div
                className="flex flex-row lg:justify-center"
                variants={animations.staggerChildren}
                initial="hidden"
                animate={isHeadingInView ? "visible" : "hidden"}
                exit="exit"
              >
                <motion.a
                  href="#"
                  className="inline-flex justify-center items-center lg:py-5 lg:px-9 lg:text-xl text-md py-3 px-7 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine"
                  variants={animations.blurSlideFromLeft}
                  custom={1.5}
                  whileHover={{
                    scale: 1.05,
                    filter: "blur(0px) brightness(1.1)",
                    boxShadow: "0px 5px 20px rgba(165, 42, 42, 0.5)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    filter: "blur(0px) brightness(0.95)",
                  }}
                >
                  Kerjakan Tantangan ⚔️
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex justify-center items-center lg:py-5 lg:px-6 lg:text-xl text-lg py-4 px-4 font-medium text-center text-white rounded-full bg-wine hover:bg-dark-wine ml-3"
                  variants={animations.blurSlideFromRight}
                  custom={1.7}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    filter: "blur(0px) brightness(1.1)",
                    boxShadow: "0px 5px 20px rgba(165, 42, 42, 0.5)",
                    transition: {
                      duration: 0.5,
                      ease: "anticipate",
                    },
                  }}
                  whileTap={{
                    scale: 0.9,
                    filter: "blur(0px) brightness(0.95)",
                  }}
                >
                  <svg
                    className="w-5 h-5 -rotate-45"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} index={1}>
            <Banner />
          </AnimatedSection>

          <AnimatedSection delay={0.3} index={2}>
            <Category fases={dataFase} />
          </AnimatedSection>

          <AnimatedSection delay={0.4} index={3}>
            <About />
          </AnimatedSection>

          <AnimatedSection delay={0.5} index={4}>
            <Features />
          </AnimatedSection>

          <AnimatedSection delay={0.6} index={5}>
            <Ads />
          </AnimatedSection>

          <AnimatedSection delay={0.7} index={6}>
            <Promotion />
          </AnimatedSection>
        </motion.div>
      </Layout>
    </AnimatePresence>
  )
}

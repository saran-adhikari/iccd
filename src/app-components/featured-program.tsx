'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProgramCard } from "@/app-components/program-card"
import type { Program } from "../lib/programs"
import { Button } from "@/app-components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function FeaturedProgram({ programs }: { programs: Program[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1))
  }

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [programs.length])

  const getCardStyle = (index: number) => {
    let diff = index - currentIndex
    if (diff > programs.length / 2) diff -= programs.length
    else if (diff < -programs.length / 2) diff += programs.length

    if (diff === 0) {
      return "scale-100 opacity-100 z-20 translate-x-0 cursor-default"
    } else if (diff === 1 || diff === -(programs.length - 1)) {
      return "scale-90 opacity-40 z-10 translate-x-[60%] blur-[1px] cursor-pointer pointer-events-none" // pointer-events-none on side cards to prevent clicking links
    } else if (diff === -1 || diff === programs.length - 1) {
      return "scale-90 opacity-40 z-10 -translate-x-[60%] blur-[1px] cursor-pointer pointer-events-none"
    } else {
      return "scale-75 opacity-0 z-0 pointer-events-none"
    }
  }

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          >
            Our <span className="text-white"> Featured Programs</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover our most comprehensive and popular training programs designed for modern financial professionals.
          </p>
        </div>

        <div className="relative py-10">
          <div className="flex items-center justify-center h-[550px]"> {/* Container height to fit cards */}
            <div
              className="relative w-full max-w-4xl h-full flex items-center justify-center perspective-1000"
            >
              {programs.map((program, index) => {
                // Hack: allow clicking next/prev by clicking side cards
                let diff = index - currentIndex
                if (diff > programs.length / 2) diff -= programs.length
                else if (diff < -programs.length / 2) diff += programs.length

                const onClick = diff === 0 ? undefined : () => setCurrentIndex(index)

                return (
                  <div
                    key={program.id}
                    className={`absolute transition-all duration-700 ease-in-out w-full sm:w-[380px] md:w-[420px] h-[500px] ${getCardStyle(index)}`}
                    onClick={onClick}
                  >
                    {/* Wrap in div to capture click on non-active cards */}
                    <div className={diff === 0 ? "h-full w-full" : "h-full w-full pointer-events-none"}>
                      <ProgramCard program={program} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
            {/* Left / Right Buttons */}
            <button
              onClick={() => setCurrentIndex(prev => 
                prev === 0 ? programs.length - 1 : prev - 1
              )}
              className="absolute left-0 top-1/2 -translate-y-1/2 
                        bg-secondary/20 hover:bg-secondary/40 
                        backdrop-blur-md rounded-full p-3 
                        text-white transition z-30"
              aria-label="Previous Program"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => handleNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 
                        bg-secondary/20 hover:bg-secondary/40 
                        backdrop-blur-md rounded-full p-3 
                        text-white transition z-30"
              aria-label="Next Program"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          {/* Dots */}
          {/* <div className="flex justify-center gap-2 mt-8">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-secondary" : "w-2 bg-secondary/30 hover:bg-secondary/50"
                  }`}
                aria-label={`Go to program ${index + 1}`}
              />
            ))}
          </div> */}

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold px-8">
              <Link href="/programs">
                View All Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

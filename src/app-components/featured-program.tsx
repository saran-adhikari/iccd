'use client'

import { useState, useRef } from "react"
import { ProgramCard } from "@/app-components/program-card"
import type { Program } from "../lib/programs"
import { Button } from "@/app-components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export default function FeaturedProgram({ programs }: { programs: Program[] }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const cardWidth = 380 + 24 // card width + gap

  const scrollToIndex = (i: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: i * cardWidth,
        behavior: "smooth",
      })
    }
  }

  const next = () => {
    const newIndex = (index + 1) % programs.length
    setIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const prev = () => {
    const newIndex = (index - 1 + programs.length) % programs.length
    setIndex(newIndex)
    scrollToIndex(newIndex)
  }

  return (
    <section className="py-20 bg-background overflow-hidden">
      
      <div className="max-w-[80%] mx-auto">

        {/* ---------- Heading + Button Row ---------- */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Our <span className="text-white"> Featured Programs</span>
          </h2>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold px-8"
          >
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* ---------- Slider (NO SCROLLBAR) ---------- */}
        <div className="py-10">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth"
          >
            {programs.map((program) => (
              <div
                key={program.id}
                className="min-w-[300px] sm:min-w-[350px] md:min-w-[380px]"
              >
                <ProgramCard program={program} />
              </div>
            ))}
          </div>

          {/* ---------- Buttons BELOW the cards ---------- */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="bg-secondary/20 hover:bg-secondary/40 p-3 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={next}
              className="bg-secondary/20 hover:bg-secondary/40 p-3 rounded-full"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

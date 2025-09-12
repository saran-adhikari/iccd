"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { Badge } from "@/app-components/ui/badge"
import { Clock, Users, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { programData, type Program } from "../lib/programs"

type MinimalProgram = {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  durationDays: number
  maxParticipants: number
  certification: string
  cover: string
  outcomes: string[]
}

/** Mouse-driven parallax background (safe, no overflow) */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Subtle pixel offsets; springs keep it smooth
  const x = useSpring(useTransform(mx, [-1, 1], [-24, 24]), { stiffness: 120, damping: 18, mass: 0.4 })
  const y = useSpring(useTransform(my, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18, mass: 0.4 })
  // Slight overscale so edges never show even at max offset
  const scale = useSpring(1.12, { stiffness: 120, damping: 20, mass: 0.45 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      // normalize to [-1, 1]
      const nx = (e.clientX / w) * 2 - 1
      const ny = (e.clientY / h) * 2 - 1
      mx.set(nx)
      my.set(ny)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.img
        src={src}
        alt={alt}
        className="w-[110%] h-[110%] object-cover will-change-transform"
        style={{ x, y, scale }}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
    </div>
  )
}

export default function FeaturedProgram() {
  const [index, setIndex] = useState(0)

  const programs = useMemo<MinimalProgram[]>(
    () =>
      programData.slice(0, 3).map((p: Program) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        category: p.category,
        durationDays: p.durationDays,
        maxParticipants: p.maxParticipants,
        certification: p.certification,
        cover: p.images.cover,
        outcomes: p.learningOutcomes.slice(0, 3),
      })),
    []
  )

  const len = programs.length
  const next = () => setIndex((i) => (i + 1) % len)
  const prev = () => setIndex((i) => (i - 1 + len) % len)
  if (!len) return null

  return (
    <section className="w-full max-w-[100vw] overflow-x-hidden bg-black/90">
      <div className="relative w-full h-[90svh] overflow-hidden">
        {/* Slides rail (full width, no overflow) */}
        <div
          className="flex w-full h-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: "transform 500ms ease",
          }}
        >
          {programs.map((program) => {
            const detailsHref = `/programs/${program.slug}`
            const stats = [
              { icon: Clock, value: `${program.durationDays} day${program.durationDays > 1 ? "s" : ""}` },
              { icon: Users, value: `${program.maxParticipants} max` },
              { icon: Award, value: program.certification },
            ]

            return (
              <div
                key={program.id}
                className="basis-full shrink-0 grow-0 h-[90svh] relative flex items-center justify-center"
              >
                {/* Parallax background (wrapped to avoid horizontal overflow) */}
                <ParallaxImage src={program.cover} alt={program.title} />
                <div className="absolute inset-0 bg-black/60" />

                {/* Centered foreground */}
                <motion.div
                  key={program.id + "-fg"}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
                >
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    {program.category}
                  </Badge>

                  <h2 className="mt-6 text-4xl md:text-5xl font-bold">{program.title}</h2>

                  <p className="mt-4 text-lg text-gray-200">{program.summary}</p>

                  <div className="mt-6 flex justify-center gap-8">
                    {stats.map((s, i) => {
                      const Icon = s.icon
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Icon className="h-6 w-6 text-accent" />
                          <span className="text-sm">{s.value}</span>
                        </div>
                      )
                    })}
                  </div>

                 {program.outcomes.length > 0 && (
                    <ul className="mt-6 space-y-3 text-gray-300 text-sm max-w-xl mx-auto text-center list-none">
                      {program.outcomes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}


                  <Button asChild className="mt-6 bg-primary hover:bg-primary/90 text-accent-foreground">
                    <Link href={detailsHref}>View details</Link>
                  </Button>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Navigation buttons */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
          <button
            aria-label="Previous program"
            onClick={prev}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur px-4 py-4 ring-1 ring-white/20 transition"
          >
            <ChevronLeft className="h-6 w-6 text-white cursor-pointer" />
          </button>

          <button
            aria-label="Next program"
            onClick={next}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur px-4 py-4 ring-1 ring-white/20 transition"
          >
            <ChevronRight className="h-6 w-6 text-white cursor-pointer" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {programs.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

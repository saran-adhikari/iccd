"use client"

import { useMemo, useState } from "react"
import type { ComponentType, SVGProps, KeyboardEvent } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { Badge } from "@/app-components/ui/badge"
import {
  Leaf,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  Globe2,
  Building2,
  Handshake,
} from "lucide-react"
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

type IconType = ComponentType<SVGProps<SVGSVGElement>>

function iconForProgram(p: MinimalProgram, i: number): IconType {
  const byCategory: Record<string, IconType> = {
    "ESG & Sustainability": Leaf,
    "Risk & Compliance": ShieldCheck,
    "Fraud & Forensics": BarChart3,
    "Service Excellence": Handshake,
    "Global": Globe2,
    "Risk & Finance": Building2,
  }
  const fallbacks: IconType[] = [Leaf, ShieldCheck, BarChart3, GraduationCap, Globe2, Building2]
  return byCategory[p.category] ?? fallbacks[i % fallbacks.length]
}

export default function FeaturedProgram() {
  const [index, setIndex] = useState(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  const programs = useMemo<MinimalProgram[]>(
    () =>
      programData.map((p: Program) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        category: p.category,
        durationDays: p.durationDays,
        maxParticipants: p.maxParticipants,
        certification: p.certification,
        cover: p.images.cover,
        outcomes: (p.learningOutcomes ?? []).slice(0, 3),
      })),
    []
  )

  const len = programs.length
  if (!len) return null

  const next = () => setIndex((i) => (i + 1) % len)
  const prev = () => setIndex((i) => (i - 1 + len) % len)

  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); next() }
    else if (e.key === "ArrowUp") { e.preventDefault(); prev() }
  }

  // ORBIT DOT POSITION (kept for future use if you re-add dots)
  const getDotPosition = (i: number) => {
    const totalDots = len
    const angle = (i * 360) / totalDots - 90
    const radius = 40
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
    return { x, y }
  }

  const current = programs[index]
  const IconBadge = iconForProgram(current, index)

  return (
    <section className="w-full mx-auto">
      {/* Title */}
      <div className="px-6 pt-8">
        <h2 className="text-4xl text-center lg:text-5xl font-extrabold mb-6 leading-tight text-black">
          Our <span className="text-primary">Featured Programs</span>
        </h2>
      </div>

      {/* Layout (full width within container, no artificial narrowing) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="relative">

          {/* Left icon rail (desktop) */}
          <div
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3"
            role="tablist"
            aria-label="Programs"
            tabIndex={0}
            onKeyDown={onRailKey}
          >
            {programs.map((p, i) => {
              const Icon = iconForProgram(p, i)
              const active = i === index
              return (
                <motion.button
                  key={p.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`program-panel-${i}`}
                  onClick={() => setIndex(i)}
                  title={p.title}
                  className={[
                    "group inline-flex items-center justify-center h-11 w-11 rounded-full border transition focus:outline-none focus:ring-2",
                    active
                      ? "bg-emerald-600 text-white border-emerald-600 ring-emerald-300"
                      : "bg-white/70 text-slate-700 border-slate-200 hover:bg-white"
                  ].join(" ")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.button>
              )
            })}
          </div>

          {/* Single panel view: Full-width content + full-width orbit stage */}
          <div className="w-full overflow-hidden rounded-2xl">
            <div className="flex w-full">
              <div
                id={`program-panel-${index}`}
                role="tabpanel"
                aria-labelledby={current.id}
                className="basis-full shrink-0 grow-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 px-0 py-8 sm:py-10"
                >
                  {/* Remove middle squeezing: use stretched grid with equal columns */}
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                    {/* LEFT CONTENT (stretched, no extra side padding) */}
                    <div className="flex flex-col justify-center px-4 sm:px-2 md:pl-20 lg:pl-24">
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
                        {current.category}
                      </Badge>

                      <h3 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900">
                        {current.title}
                      </h3>

                      <p className="mt-3 text-base md:text-lg text-slate-600">
                        {current.summary}
                      </p>

                      {current.outcomes.length > 0 && (
                        <ul className="mt-6 space-y-2 text-slate-600 text-sm list-disc pl-5">
                          {current.outcomes.map((item, k) => (
                            <li key={k}>{item}</li>
                          ))}
                        </ul>
                      )}

                      <Button asChild className="mt-7 w-fit">
                        <Link href={`/programs/${current.slug}`}>View details</Link>
                      </Button>
                    </div>

                    {/* RIGHT: ORBIT IMAGE (fills the entire right column) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {/* Make it fill column: responsive square that scales up to container */}
                      <div className="group relative w-full max-w-none md:max-w-none aspect-square">
                        {/* Circular track (optional) */}
                        {/* <div className="absolute inset-[10%] rounded-full border border-gray-200" /> */}

                        {/* Central image grows to ~70% of the square; scales on hover */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-[70%] h-[70%] rounded-full overflow-hidden shadow-2xl transition-all duration-700 ease-in-out border-4 border-white hover:scale-105">
                            <img
                              src={current.cover}
                              alt={current.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const fb = `https://via.placeholder.com/800x800/6B7280/FFFFFF?text=${encodeURIComponent(current.category || "Program")}`
                                if (e.currentTarget.src !== fb) e.currentTarget.src = fb
                              }}
                            />
                            {/* Floating badge (optional) */}
                            {/* <div className="absolute top-2 left-2 backdrop-blur-md bg-white/70 border border-white/60 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                              <IconBadge className="h-4 w-4 text-emerald-600" />
                              <span className="text-xs text-slate-700">{current.category}</span>
                            </div> */}
                          </div>
                        </div>

                        {/* Decorative background dots */}
                        <div className="absolute top-[12%] right-[15%] w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="absolute bottom-[12%] left-[15%] w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="absolute bottom-[18%] right-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
                        <div className="absolute top-[18%] left-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile dots */}
          <div className="md:hidden flex justify-center gap-2 pb-4">
            {programs.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? "bg-emerald-600" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

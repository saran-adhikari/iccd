"use client"

import { useMemo, useState } from "react"
import type { ComponentType, SVGProps, KeyboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { Badge } from "@/app-components/ui/badge"
import {
  Clock,
  Users,
  Award,
  Leaf,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  Globe2,
  Building2,
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
    "Service Excellence": GraduationCap,
    "Global": Globe2,
    "Risk & Finance": Building2,
  }
  const fallbacks: IconType[] = [Leaf, ShieldCheck, BarChart3, GraduationCap, Globe2, Building2]
  return byCategory[p.category] ?? fallbacks[i % fallbacks.length]
}

export default function FeaturedProgram() {
  const [index, setIndex] = useState(0)

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

  return (
    <section className="w-full overflow-x-hidden mx-auto">
      {/* Title */}
      <div className="px-6 pt-8">
        <h2 className="text-4xl text-center lg:text-5xl font-extrabold mb-6 leading-tight text-black">
          Our <span className="text-primary">Featured Programs</span>
        </h2>
      </div>

      {/* Reverted width */}
      <div className="relative w-4/5 max-w-[1200px] mx-auto px-2 md:px-4 mt-6">
        <div className="relative">
          {/* Left icon rail (desktop) */}
          <div
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3"
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

          {/* Slides rail */}
          <div className="w-full overflow-hidden rounded-2xl">
            <div
              className="flex w-full"
              style={{ transform: `translateX(-${index * 100}%)`, transition: "transform 450ms ease" }}
            >
              {programs.map((program, i) => {
                const detailsHref = `/programs/${program.slug}`
                const stats = [
                  { icon: Clock, value: `${program.durationDays} day${program.durationDays > 1 ? "s" : ""}` },
                  { icon: Users, value: `${program.maxParticipants} max` },
                  { icon: Award, value: program.certification },
                ] as const

                const IconBadge = iconForProgram(program, i)

                return (
                  <div
                    key={program.id}
                    id={`program-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={program.id}
                    className="basis-full shrink-0 grow-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative z-10 px-6 md:pl-28 lg:pl-32 md:pr-10 py-10 md:py-14"
                    >
                      {/* Two-column: text left, creative image stage right */}
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* left content */}
                        <div className="max-w-xl">
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {program.category}
                          </Badge>

                          <h3 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900">
                            {program.title}
                          </h3>

                          <p className="mt-3 text-base md:text-lg text-slate-600">
                            {program.summary}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-6">
                            {stats.map((s, j) => {
                              const Icon = s.icon
                              return (
                                <motion.div
                                  key={j}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.05 * j }}
                                  className="flex items-center gap-2 text-slate-700"
                                >
                                  <Icon className="h-5 w-5 text-emerald-600" />
                                  <span className="text-sm">{s.value}</span>
                                </motion.div>
                              )
                            })}
                          </div>

                          {program.outcomes.length > 0 && (
                            <ul className="mt-6 space-y-2 text-slate-600 text-sm list-none">
                              {program.outcomes.map((item, k) => (
                                <li key={k}>{item}</li>
                              ))}
                            </ul>
                          )}

                          <Button asChild className="mt-7">
                            <Link href={detailsHref}>View details</Link>
                          </Button>
                        </div>

                        {/* right image stage — fixed height, no whitespace, with creative treatment */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                          className="w-full"
                        >
                          <motion.div
                            whileHover={{ rotateX: 2, rotateY: -2 }}
                            transition={{ type: "spring", stiffness: 120, damping: 14 }}
                            className="relative h-64 md:h-[380px] w-full"
                          >
                            {/* glow backdrop */}
                            <div
                              aria-hidden
                              className="absolute -inset-8 bg-gradient-to-tr from-emerald-200/50 via-transparent to-sky-200/50 blur-2xl rounded-[28px]"
                            />
                            {/* frame */}
                            <div className="relative h-full w-full rounded-2xl ring-1 ring-slate-200 shadow-xl overflow-hidden">
                              {/* image fills container — no whitespace */}
                              <img
                                src={program.cover}
                                alt={program.title}
                                
                                className="object-contain w-full h-full"
                                // sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 90vw"
                                // priority={i === index}
                              />
                              {/* subtle grid overlay for texture */}
                              <svg
                                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                              >
                                <defs>
                                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                              </svg>

                              {/* floating badge with category icon */}
                              <motion.div
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="absolute top-3 left-3"
                              >
                                <div className="backdrop-blur-md bg-white/70 border border-white/60 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                                  <IconBadge className="h-4 w-4 text-emerald-600" />
                                  <span className="text-xs text-slate-700">{program.category}</span>
                                </div>
                              </motion.div>

                              {/* corner ribbon */}
                              <div className="absolute -right-10 top-6 rotate-45">
                                <div className="bg-emerald-600 text-white text-[10px] tracking-wide px-10 py-1 shadow-md">
                                  Featured
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile dots (emerald when active) */}
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

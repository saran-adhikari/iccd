"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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

export default function FeaturedProgram() {
  const programs = useMemo<MinimalProgram[]>(() =>
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
      outcomes: p.learningOutcomes.slice(0, 3),
    }))
  , [])

  const [index, setIndex] = useState(0)
  if (!programs.length) return null

  const program = programs[index]
  const detailsHref = `/programs/${program.slug}`

  const box = 520
  const main = 460
  const radius = box / 2 - 10
  const cx = box / 2
  const cy = box / 2
  const planetSize = 64

  const orbitItems = programs
    .map((p, i) => ({ src: p.cover, alt: p.title, target: i, slug: p.slug }))
    .filter((o) => o.target !== index)
    .slice(0, 4)

  const stats = [
    { icon: Clock, value: `${program.durationDays} day${program.durationDays > 1 ? "s" : ""}` },
    { icon: Users, value: `${program.maxParticipants} max` },
    { icon: Award, value: program.certification },
  ]

  return (
    <section className="relative overflow-hidden py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <Badge className="bg-accent/10 text-accent border-accent/20">{program.category}</Badge>

            <Link href={detailsHref} className="block group">
              <h2 className="text-4xl font-bold text-primary group-hover:underline">{program.title}</h2>
            </Link>

            <p className="text-xl text-muted-foreground max-w-xl">{program.summary}</p>

            <div className="grid grid-cols-3 gap-4 pt-2">
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
              <div>
                <h4 className="font-semibold text-primary mb-3">Key learning outcomes</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {program.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button asChild className="bg-primary hover:bg-primary/90 text-accent-foreground">
              <Link href={detailsHref}>View details</Link>
            </Button>
          </div>

          {/* Orbit cluster */}
          <div className="relative flex justify-end">
            <div className="relative" style={{ width: box, height: box }}>
              {/* rotating border */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              />

              {/* main image */}
              <Link href={detailsHref} className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  key={program.cover}
                  src={program.cover}
                  alt={program.title}
                  className="rounded-full shadow-2xl border-4 border-background object-cover cursor-pointer"
                  style={{ width: main, height: main }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 0.95, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                />
              </Link>

              {/* orbiting thumbs */}
                {orbitItems.map((item, i) => {
                  const angle = (i / orbitItems.length) * 2 * Math.PI
                  const x = cx + radius * Math.cos(angle)
                  const y = cy + radius * Math.sin(angle)
                  
                  return (
                    <motion.img
                      key={item.src}
                      src={item.src}
                      alt={item.alt}
                      className="absolute rounded-full border-2 border-background shadow-md object-cover cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent transition-transform"
                      style={{
                        left: x - planetSize / 2,
                        top: y - planetSize / 2,
                        width: planetSize,
                        height: planetSize,
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 0.95, opacity: 1, y: [0, -6, 0] }}
                      transition={{
                        type: "tween",
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 3 + i,
                      }}
                      onClick={() => setIndex(item.target)} // <--- update index on click
                    />
                  )
                })}

              {/* navigation arrows */}
              <button
                onClick={() => setIndex((index - 1 + programs.length) % programs.length)}
                className="absolute left-[-70px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/10 hover:bg-accent/20 transition"
                aria-label="Previous program"
              >
                <ChevronLeft className="w-6 h-6 text-accent" />
              </button>
              <button
                onClick={() => setIndex((index + 1) % programs.length)}
                className="absolute right-[-70px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/10 hover:bg-accent/20 transition"
                aria-label="Next program"
              >
                <ChevronRight className="w-6 h-6 text-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

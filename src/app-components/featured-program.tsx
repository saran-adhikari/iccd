'use client'

import { useMemo, useRef, useState, type ComponentType, type SVGProps, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app-components/ui/button'
import { Badge } from '@/app-components/ui/badge'
import {
  Leaf,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  Globe2,
  Building2,
  Handshake,
  ArrowRight,
} from 'lucide-react'
import { programData, type Program } from '../lib/programs'

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
    'ESG & Sustainability': Leaf,
    'Risk & Compliance': ShieldCheck,
    'Fraud & Forensics': BarChart3,
    'Service Excellence': Handshake,
    Global: Globe2,
    'Risk & Finance': Building2,
  }
  const fallbacks: IconType[] = [Leaf, ShieldCheck, BarChart3, GraduationCap, Globe2, Building2]
  return byCategory[p.category] ?? fallbacks[i % fallbacks.length]
}
function getDirection(prev: number, next: number, len: number) {
  const fwd = (next - prev + len) % len
  const back = (prev - next + len) % len
  return fwd <= back ? 1 : -1
}

export default function FeaturedProgram() {
  const [index, _setIndex] = useState(0)
  const prevIndexRef = useRef(0)
  const [direction, setDirection] = useState<1 | -1>(1)

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

  const setIndex = (nextIdx: number, explicitDir?: 1 | -1) => {
    const dir = explicitDir ?? (getDirection(prevIndexRef.current, nextIdx, len) as 1 | -1)
    setDirection(dir)
    prevIndexRef.current = nextIdx
    _setIndex(nextIdx)
  }

  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((index + 1) % len, 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((index - 1 + len) % len, -1) }
  }

  const current = programs[index]
  const IconBadge = iconForProgram(current, index)

  const itemVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.25, ease: 'easeOut' as const }
    })
  }

  return (
    <motion.section
      className="w-full mx-auto py-12 md:py-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="px-6 pt-6">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        >
          Our <span className="text-white"> Programs</span>
        </motion.h2>
      </div>

      {/* widened left column to allow full titles; titles now wrap instead of truncating */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] gap-4 lg:gap-6">

          {/* LEFT rail - hidden on mobile */}
          <div
            className="hidden md:flex flex-col items-center justify-center h-full py-2 md:py-3 overflow-y-auto hide-scrollbar"
            role="tablist"
            aria-label="Programs"
            tabIndex={0}
            onKeyDown={onRailKey}
          >
            <ul className="space-y-1.5 w-full">
              {programs.map((p, i) => {
                const Icon = iconForProgram(p, i)
                const active = i === index
                return (
                  <li key={p.id} className="w-full">
                    <motion.button
                      role="tab"
                      aria-selected={active}
                      aria-controls={`program-panel-${i}`}
                      onClick={() => setIndex(i)}
                      title={p.title}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      className={[
                        // use items-center so the icon is vertically centered with the first text line
                        'flex w-full items-center gap-2.5 px-2.5 py-2 rounded-md text-left text-sm transition cursor-pointer ',
                        active
                          ? 'text-secondary bg-secondary/10'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors duration-300',
                          active
                            ? 'bg-secondary text-white border-secondary'
                            : 'bg-transparent text-slate-500 border-slate-600 group-hover:border-slate-400'
                        ].join(' ')}
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      {/* allow wrapping but keep left alignment with the icon */}
                      <span className="flex-1 whitespace-normal break-words leading-snug uppercase font-medium">
                        {p.title}
                      </span>

                      {active && (
                        <motion.div
                          layoutId="active-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-secondary ml-auto"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  </li>

                )
              })}
            </ul>
          </div>

          {/* RIGHT card unchanged */}
          <motion.div
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden max-h-[75vh] md:max-h-[86vh] flex flex-col"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current.id}
                className="flex flex-col min-h-0 h-full"
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x
                  if (swipe < -50) {
                    setIndex((index + 1) % len, 1)
                  } else if (swipe > 50) {
                    setIndex((index - 1 + len) % len, -1)
                  }
                }}
              >
                <div className="px-5 pt-4 pb-3 shrink-0" />

                <div className="px-5 shrink-0">
                  <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20 relative group">
                    <motion.div
                      className="relative w-full bg-gray-900"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <img
                        src={current.cover}
                        alt={current.title}
                        className="h-[25vh] md:h-[40vh] w-full object-cover opacity-90"
                        onError={(e) => {
                          const fb = `https://via.placeholder.com/1200x675/1e293b/94a3b8?text=${encodeURIComponent(current.category || 'Program')}`
                          if ((e.currentTarget as HTMLImageElement).src !== fb) (e.currentTarget as HTMLImageElement).src = fb
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </motion.div>
                  </div>
                </div>

                <div className="px-5 pt-6 pb-8 overflow-hidden flex-1 flex flex-col">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
                      {current.category}
                    </Badge>
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-white mb-3"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    {current.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 text-sm leading-relaxed mb-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    {current.summary}
                  </motion.p>

                  {current.outcomes.length > 0 && (
                    <motion.ul
                      className="space-y-2 text-gray-400 text-sm mb-2"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      {current.outcomes.map((item, k) => (
                        <motion.li
                          key={k}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (k * 0.05), duration: 0.2 }}
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  <motion.div
                    className="mt-auto pt-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                  >
                    <Button asChild size="sm" className="w-full sm:w-auto">
                      <Link href={`/programs/${current.slug}`} className='border border-secondary/40 bg-secondary/20 text-primary hover:bg-secondary hover:text-white transition-all duration-300 group cursor-pointer flex items-center justify-center gap-2'>
                        View Program Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* mobile dots */}
        <div className="md:hidden flex justify-center gap-2 py-4">
          {programs.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i === index ? 'bg-secondary w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

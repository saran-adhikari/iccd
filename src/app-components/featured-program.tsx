// 'use client'

// import { useMemo, useRef, useState } from 'react'
// import type { ComponentType, SVGProps, KeyboardEvent } from 'react'
// import Link from 'next/link'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Button } from '@/app-components/ui/button'
// import { Badge } from '@/app-components/ui/badge'
// import {
//   Leaf,
//   ShieldCheck,
//   BarChart3,
//   GraduationCap,
//   Globe2,
//   Building2,
//   Handshake,
// } from 'lucide-react'
// import { programData, type Program } from '../lib/programs'

// // -----------------------------
// // Types and icon mapping
// // -----------------------------

// type MinimalProgram = {
//   id: string
//   slug: string
//   title: string
//   summary: string
//   category: string
//   durationDays: number
//   maxParticipants: number
//   certification: string
//   cover: string
//   outcomes: string[]
// }

// type IconType = ComponentType<SVGProps<SVGSVGElement>>

// function iconForProgram(p: MinimalProgram, i: number): IconType {
//   const byCategory: Record<string, IconType> = {
//     'ESG & Sustainability': Leaf,
//     'Risk & Compliance': ShieldCheck,
//     'Fraud & Forensics': BarChart3,
//     'Service Excellence': Handshake,
//     Global: Globe2,
//     'Risk & Finance': Building2,
//   }
//   const fallbacks: IconType[] = [Leaf, ShieldCheck, BarChart3, GraduationCap, Globe2, Building2]
//   return byCategory[p.category] ?? fallbacks[i % fallbacks.length]
// }

// // Decide shortest spin direction on a circular list
// function getDirection(prev: number, next: number, len: number) {
//   const fwd = (next - prev + len) % len
//   const back = (prev - next + len) % len
//   return fwd <= back ? 1 : -1
// }

// export default function FeaturedProgram() {
//   const [index, _setIndex] = useState(0)
//   const prevIndexRef = useRef(0)
//   const [direction, setDirection] = useState<1 | -1>(1)
//   const [ringAngle, setRingAngle] = useState(0)
//   const [tilt, setTilt] = useState({ rx: 0, ry: 0 }) // whole-card tilt

//   const programs = useMemo<MinimalProgram[]>(
//     () =>
//       programData.map((p: Program) => ({
//         id: p.id,
//         slug: p.slug,
//         title: p.title,
//         summary: p.summary,
//         category: p.category,
//         durationDays: p.durationDays,
//         maxParticipants: p.maxParticipants,
//         certification: p.certification,
//         cover: p.images.cover,
//         outcomes: (p.learningOutcomes ?? []).slice(0, 3),
//       })),
//     []
//   )

//   const len = programs.length
//   if (!len) return null

//   const setIndex = (nextIdx: number, explicitDir?: 1 | -1) => {
//     const dir = explicitDir ?? (getDirection(prevIndexRef.current, nextIdx, len) as 1 | -1)
//     setDirection(dir)
//     setRingAngle((a) => a + (dir === 1 ? 40 : -40))
//     prevIndexRef.current = nextIdx
//     _setIndex(nextIdx)
//   }

//   const next = () => setIndex((index + 1) % len, 1)
//   const prev = () => setIndex((index - 1 + len) % len, -1)

//   const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === 'ArrowDown') { e.preventDefault(); next() }
//     else if (e.key === 'ArrowUp') { e.preventDefault(); prev() }
//   }

//   const current = programs[index]
//   const IconBadge = iconForProgram(current, index)

//   // pointer tilt for the entire right visual
//   const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect()
//     const px = (e.clientX - rect.left) / rect.width // 0..1
//     const py = (e.clientY - rect.top) / rect.height // 0..1
//     const ry = (px - 0.5) * 16 // left/right
//     const rx = -(py - 0.5) * 12 // up/down
//     setTilt({ rx, ry })
//   }

//   const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 })

//   return (
//     <motion.section
//       className="w-full mx-auto"
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//     >
//       <div className="px-6 pt-8">
//         <motion.h2
//           className="text-4xl text-center lg:text-5xl font-extrabold mb-4 leading-tight text-black"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
//         >
//           Our <span className="text-primary">Featured Programs</span>
//         </motion.h2>
//         <motion.p
//           className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-center"
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
//         >
//           Explore our curated selection of programs designed to empower professionals with the skills and knowledge
//         </motion.p>
//       </div>

//       <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
//         <div className="relative">
//           {/* Left icon rail (desktop) */}
//           <div
//             className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3"
//             role="tablist"
//             aria-label="Programs"
//             tabIndex={0}
//             onKeyDown={onRailKey}
//           >
//             {programs.map((p, i) => {
//               const Icon = iconForProgram(p, i)
//               const active = i === index
//               return (
//                 <motion.button
//                   key={p.id}
//                   role="tab"
//                   aria-selected={active}
//                   aria-controls={`program-panel-${i}`}
//                   onClick={() => setIndex(i)}
//                   title={p.title}
//                   className={[
//                     'group inline-flex items-center justify-center h-11 w-11 rounded-full border transition focus:outline-none focus:ring-2',
//                     active
//                       ? 'bg-emerald-600 text-white border-emerald-600 ring-emerald-300'
//                       : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-white',
//                   ].join(' ')}
//                   initial={{ y: 8, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.03 }}
//                   whileHover={{ scale: 1.06 }}
//                   whileTap={{ scale: 0.96 }}
//                 >
//                   <Icon className="h-5 w-5" />
//                 </motion.button>
//               )
//             })}
//           </div>

//           {/* Card shell with subtle breathing & gradient aura */}
//           <motion.div
//             className="w-full overflow-hidden rounded-2xl relative"
//             initial={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)', scale: 0.995 }}
//             animate={{
//               scale: [0.995, 1, 0.995],
//               boxShadow: [
//                 '0 10px 30px rgba(0,0,0,0.06)',
//                 '0 14px 40px rgba(16,185,129,0.15)',
//                 '0 10px 30px rgba(0,0,0,0.06)'
//               ],
//             }}
//             transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <motion.div
//               aria-hidden
//               className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_20%,rgba(16,185,129,0.08),transparent),radial-gradient(800px_400px_at_10%_80%,rgba(59,130,246,0.06),transparent)]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, ease: 'easeOut' }}
//             />

//             <div className="flex w-full relative">
//               <div id={`program-panel-${index}`} role="tabpanel" aria-labelledby={current.id} className="basis-full shrink-0 grow-0">
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.35, ease: 'easeOut' }}
//                   className="relative z-10 px-0 py-8 sm:py-0"
//                 >
//                   <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
//                     {/* LEFT CONTENT */}
//                     <motion.div
//                       key={`text-${current.id}`}
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -8 }}
//                       transition={{ duration: 0.35, ease: 'easeOut' }}
//                       className="flex flex-col justify-center px-4 sm:px-2 md:pl-20 lg:pl-24"
//                     >
//                       <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
//                         {current.category}
//                       </Badge>

//                       <h3 className="mt-8 text-3xl md:text-4xl font-bold text-slate-900">{current.title}</h3>

//                       <p className="mt-6 text-base md:text-lg text-slate-600">{current.summary}</p>

//                       {current.outcomes.length > 0 && (
//                         <ul className="mt-8 space-y-4 text-slate-600 text-sm list-disc pl-5">
//                           {current.outcomes.map((item, k) => (
//                             <li key={k}>{item}</li>
//                           ))}
//                         </ul>
//                       )}

//                       <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}>
//                         <Button asChild className="mt-10 w-fit">
//                           <Link href={`/programs/${current.slug}`}>View details</Link>
//                         </Button>
//                       </motion.div>
//                     </motion.div>

//                     {/* RIGHT: ORBIT IMAGE with REVOLVE TRANSITION (no variants) */}
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.98 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
//                       className="w-full h-full flex items-center justify-center"
//                     >
//                       {/* Perspective wrapper for 3D effect */}
//                       <motion.div
//                         className="group relative w-full aspect-square [perspective:1200px]"
//                         onMouseMove={handleMouseMove}
//                         onMouseLeave={handleMouseLeave}
//                         animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
//                         transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.4 }}
//                         style={{ transformStyle: 'preserve-3d' }}
//                       >
//                         {/* Rotating background ring + decorative dots */}
//                         <motion.div
//                           aria-hidden
//                           className="absolute inset-[8%] rounded-full border border-slate-200/70"
//                           animate={{ rotate: ringAngle, scale: [1, 1.02, 1] }}
//                           transition={{ rotate: { type: 'spring', stiffness: 80, damping: 20 }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
//                           style={{ transformStyle: 'preserve-3d' }}
//                         >
//                           <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-300" />
//                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-300" />
//                           <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-slate-300" />
//                           <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-slate-300" />
//                         </motion.div>

//                         {/* Flash/glare sweep + revolve */}
//                         <AnimatePresence mode="popLayout" initial={false}>
//                           <motion.div
//                             key={current.id}
//                             className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] transform-gpu"
//                             initial={{ rotateY: direction * 70, opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
//                             animate={{ rotateY: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
//                             exit={{ rotateY: -direction * 70, opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
//                             transition={{
//                               rotateY: { type: 'spring', stiffness: 260, damping: 24, mass: 0.9 },
//                               opacity: { duration: 0.28, ease: 'easeOut' },
//                               scale: { duration: 0.28, ease: 'easeOut' },
//                               filter: { duration: 0.28, ease: 'easeOut' },
//                             }}
//                           >
//                             <motion.div
//                               initial={{ rotateZ: 0, scale: 1 }}
//                               whileHover={{ rotateZ: -2, scale: 1.02 }}
//                               transition={{ type: 'spring', stiffness: 200, damping: 18 }}
//                               className="relative w-[80%] h-[80%] rounded-full overflow-hidden shadow-2xl transition-all duration-700 ease-in-out border-4 border-white transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
//                             >
//                               <img
//                                 src={current.cover}
//                                 alt={current.title}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   const fb = `https://via.placeholder.com/800x800/6B7280/FFFFFF?text=${encodeURIComponent(current.category || 'Program')}`
//                                   if ((e.currentTarget as HTMLImageElement).src !== fb) (e.currentTarget as HTMLImageElement).src = fb
//                                 }}
//                               />

//                               {/* Subtle light sweep */}
//                               <motion.div
//                                 aria-hidden
//                                 className="pointer-events-none absolute inset-0"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 0 }}
//                                 exit={{ opacity: 0 }}
//                               >
//                                 <motion.div
//                                   className="absolute -inset-10 bg-white/10 blur-2xl rotate-12"
//                                   initial={{ x: direction === 1 ? '-120%' : '120%' }}
//                                   animate={{ x: '120%' }}
//                                   transition={{ duration: 0.7, ease: 'easeOut' }}
//                                 />
//                               </motion.div>

//                               {/* Floating category pill */}
//                               <div className="absolute top-2 left-2 backdrop-blur-md bg-white/70 border border-white/60 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2">
//                                 <IconBadge className="h-4 w-4 text-emerald-600" />
//                                 <span className="text-xs text-slate-700">{current.category}</span>
//                               </div>
//                             </motion.div>
//                           </motion.div>
//                         </AnimatePresence>

//                         {/* Tiny background specks */}
//                         <div className="absolute top-[12%] right-[15%] w-1 h-1 bg-gray-300 rounded-full" />
//                         <div className="absolute bottom-[12%] left-[15%] w-1 h-1 bg-gray-300 rounded-full" />
//                         <div className="absolute bottom-[18%] right-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
//                         <div className="absolute top-[18%] left-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
//                       </motion.div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Mobile dots */}
//           <div className="md:hidden flex justify-center gap-2 pb-4">
//             {programs.map((_, i) => (
//               <button
//                 key={i}
//                 aria-label={`Go to slide ${i + 1}`}
//                 onClick={() => setIndex(i)}
//                 className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   )
// }

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

  return (
    <motion.section
      className="w-full mx-auto my-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="px-6 pt-6">
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white text-center"
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
          
          {/* LEFT rail */}
          <div
            className=" py-2 md:py-3 overflow-y-auto"
            role="tablist"
            aria-label="Programs"
            tabIndex={0}
            onKeyDown={onRailKey}
          >
            <ul className="space-y-1.5">
              {programs.map((p, i) => {
                const Icon = iconForProgram(p, i)
                const active = i === index
                return (
                  <li key={p.id}>
                    <button
                      role="tab"
                      aria-selected={active}
                      aria-controls={`program-panel-${i}`}
                      onClick={() => setIndex(i)}
                      title={p.title}
                      className={[
                        // use items-center so the icon is vertically centered with the first text line
                        'flex w-full items-center gap-2.5 px-2.5 py-2 rounded-md text-left text-sm transition cursor-pointer',
                        active
                          ? 'text-secondary'
                          : 'hover:bg-secondary/70 focus-visible:ring-2 focus-visible:ring-emerald-300'
                      ].join(' ')}
                    >
                    <span
                      className={[
                        'inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border',
                        active
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-white text-slate-700 border-slate-200'
                      ].join(' ')}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    {/* allow wrapping but keep left alignment with the icon */}
                    <span className="flex-1 whitespace-normal break-words leading-snug">
                      {p.title}
                    </span>
                  </button>
                </li>

                )
              })}
            </ul>
          </div>

          {/* RIGHT card unchanged */}
          <motion.div
            className="relative rounded-2xl border border-secondary-200 bg-none shadow-sm overflow-hidden max-h-[82vh] md:max-h-[86vh] flex flex-col"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_60%_-80px,theme(colors.primary/10),transparent_60%)]" />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="flex flex-col min-h-0"
                variants={{
                  enter:  { opacity: 0, y: 24 },
                  center: { opacity: 1, y: 0 },
                  exit:   { opacity: 0, y: -24 },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 28, mass: 0.9 },
                  opacity: { duration: 0.2, ease: 'easeOut' },
                }}
              >
                <div className="px-5 pt-4 pb-3 shrink-0" />

                <div className="px-5 shrink-0">
                  <div className="rounded-xl border-slate-200 overflow-hidden bg-slate-50">
                    <div className="relative w-full bg-white">
                      <img
                        src={current.cover}
                        alt={current.title}
                        className="h-[36vh] md:h-[40vh] w-full object-cover"
                        onError={(e) => {
                          const fb = `https://via.placeholder.com/1200x675/EEF2F7/475569?text=${encodeURIComponent(current.category || 'Program')}`
                          if ((e.currentTarget as HTMLImageElement).src !== fb) (e.currentTarget as HTMLImageElement).src = fb
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-5 pt-4 pb-5 overflow-auto">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {current.title || current.category}
                  </Badge>

                  <p className="mt-3 text-sm text-white-600">{current.summary}</p>

                  {current.outcomes.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-white-600 text-sm list-disc pl-5">
                      {current.outcomes.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5">
                    <Button asChild size="sm">
                      <Link href={`/programs/${current.slug}`} className='border-2 bg-primary border-primary text-primary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25 cursor-pointer'>View Details 
                      </Link>
                    </Button>
                  </div>
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
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}


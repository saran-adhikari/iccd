'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Eye, Compass } from 'lucide-react'
import { Button } from '@/app-components/ui/button'
import { Badge } from '@/app-components/ui/badge'

type MVKey = 'mission' | 'vision'
type MVItem = {
  key: MVKey
  title: string
  kicker: string
  summary: string
  image: string
  icon: typeof Target
}

const items: MVItem[] = [
  {
    key: 'mission',
    title: 'Our Mission',
    kicker: 'Why we exist',
    summary: `We empower financial institutions and professionals with the skills and tools to build strong compliance frameworks, manage risks, and support safer, more transparent financial systems. 
    
    Beyond technical training, we foster integrity, critical thinking, and proactive risk awareness. Through regulatory expertise, real-world case studies, and ongoing advisory support, we help organisations anticipate threats, strengthen governance, and embed ethical decision-making in daily operations.`,

    image: 'https://i.pinimg.com/1200x/ab/e7/83/abe783ad28e688b6c529c301881b6540.jpg',
    icon: Compass,
  },
  {
    key: 'vision',
    title: 'Our Vision',
    kicker: 'Where we’re headed',
    summary:
      `Our vision is to be the most trusted hub for compliance and risk capability, setting the standard for impact, accessibility, and measurable outcomes worldwide.

      We envision a future where every organisation can foster integrity and accountability. Through innovation, collaboration, and evidence-based practices, we aim to inspire confidence in financial systems, protect consumers, and strengthen global economic resilience.`,

    image: 'https://i.pinimg.com/736x/bd/82/d0/bd82d0b7fcd8ba12836be0e70b3f5664.jpg',
    icon: Eye,
  },
]

function getDirection(prev: number, next: number, len: number) {
  const fwd = (next - prev + len) % len
  const back = (prev - next + len) % len
  return fwd <= back ? 1 : -1
}

export function MissionVision() {
  const [index, setIndexState] = useState(0)
  const prevIndexRef = useRef(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [ringAngle, setRingAngle] = useState(0)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const len = items.length

  const setIndex = (nextIdx: number, explicitDir?: 1 | -1) => {
    const dir = explicitDir ?? (getDirection(prevIndexRef.current, nextIdx, len) as 1 | -1)
    setDirection(dir)
    setRingAngle((a) => a + (dir === 1 ? 40 : -40))
    prevIndexRef.current = nextIdx
    setIndexState(nextIdx)
  }

  const next = () => setIndex((index + 1) % len, 1)
  const prev = () => setIndex((index - 1 + len) % len, -1)

  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); next() }
    else if (e.key === 'ArrowUp') { e.preventDefault(); prev() }
  }

  const current = items[index]
  const IconBadge = current.icon

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * 16
    const rx = -(py - 0.5) * 12
    setTilt({ rx, ry })
  }
  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <motion.section
      className="w-full mx-auto py-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="px-6 pt-8">
        <motion.h2
          className="text-4xl text-center lg:text-5xl font-extrabold mb-4 leading-tight text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        >
          Mission & <span className="text-white">Vision</span>
        </motion.h2>
        
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="relative">
          {/* Left icon rail (desktop) */}
          <div
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3"
            role="tablist"
            aria-label="Mission & Vision"
            tabIndex={0}
            onKeyDown={onRailKey}
          >
            {items.map((it, i) => {
              const Icon = it.icon
              const active = i === index
              return (
                <motion.button
                  key={it.key}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`mv-panel-${i}`}
                  onClick={() => setIndex(i)}
                  title={it.title}
                  className={[
                    'group inline-flex items-center justify-center h-11 w-11 rounded-full  transition focus:outline-none focus:ring-2',
                    active
                      ? 'bg-primary/70 text-white border-emerald-600 ring-primary/40'
                      : 'bg-secondary/20 text-white border-emerald-600 hover:bg-secondary/70 cursor-pointer',
                  ].join(' ')}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.button>
              )
            })}
          </div>

          {/* Card shell with subtle breathing & gradient aura */}
          <motion.div
              className="w-full overflow-hidden rounded-2xl relative shadow-none border-0 ring-0 outline-none"
              initial={{ scale: 1 }}          // removed any boxShadow here
              animate={{ scale: 1 }}          // keep or simplify scale animation
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            <div className="flex w-full relative">
              <div id={`mv-panel-${index}`} role="tabpanel" className="basis-full shrink-0 grow-0 bg-background">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 px-0 py-8 sm:py-0"
                >
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-stretch ">
                    {/* LEFT CONTENT (same structure as Featured) */}
                    <motion.div
                      key={`text-${current.key}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col justify-center px-4 sm:px-2 md:pl-20 lg:pl-24"
                    >
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit"
                      >
                        {current.kicker}
                      </Badge>

                      <h3 className="mt-8 text-3xl md:text-4xl font-bold text-white-900">
                        {current.title}
                      </h3>

                      <p className="mt-6 text-base md:text-lg text-white-600 whitespace-pre-line">{current.summary}</p>
                      

                    </motion.div>

                    {/* RIGHT VISUAL (orbit ring + tilt, like Featured) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <motion.div
                        className="group relative w-full aspect-square [perspective:1200px]"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.4 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Rotating background ring + decorative dots */}
                        <motion.div
                          aria-hidden
                          className="absolute inset-[8%] rounded-full border border-slate-200/70"
                          animate={{ rotate: ringAngle, scale: [1, 1.02, 1] }}
                          transition={{
                            rotate: { type: 'spring', stiffness: 80, damping: 20 },
                            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                          }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-300" />
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-300" />
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-slate-300" />
                          <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-slate-300" />
                        </motion.div>

                        {/* Card that flips in/out like the image in Featured */}
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.div
                            key={current.key}
                            className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] transform-gpu"
                            initial={{ rotateY: direction * 70, opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
                            animate={{ rotateY: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ rotateY: -direction * 70, opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
                            transition={{
                              rotateY: { type: 'spring', stiffness: 260, damping: 24, mass: 0.9 },
                              opacity: { duration: 0.28, ease: 'easeOut' },
                              scale: { duration: 0.28, ease: 'easeOut' },
                              filter: { duration: 0.28, ease: 'easeOut' },
                            }}
                          >
                            <motion.div
                              initial={{ rotateZ: 0, scale: 1 }}
                              whileHover={{ rotateZ: -2, scale: 1.02 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                              className="relative w-[80%] h-[80%] rounded-full overflow-hidden shadow-2xl transition-all duration-700 ease-in-out border-4 border-white transform-gpu [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-gradient-to-br from-emerald-100 via-white to-sky-100"
                            >
                              {/* Center icon */}
                              <div className="absolute inset-0 grid place-items-center">
                                <img
                                  src={current.image}
                                  alt={current.title}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    const fb = `https://via.placeholder.com/1000x1000/eeeeee/111111?text=${encodeURIComponent(current.title)}`
                                    if ((e.currentTarget as HTMLImageElement).src !== fb) (e.currentTarget as HTMLImageElement).src = fb
                                  }}
                                />
                              </div>

                              {/* Floating pill */}
                              <div className="absolute top-2 left-2 backdrop-blur-md bg-white/70 border border-white/60 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                                <IconBadge className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs text-slate-700">
                                  {current.key === 'mission' ? 'Mission' : 'Vision'}
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Tiny background specks */}
                        <div className="absolute top-[12%] right-[15%] w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="absolute bottom-[12%] left-[15%] w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="absolute bottom-[18%] right-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
                        <div className="absolute top-[18%] left-[18%] w-0.5 h-0.5 bg-gray-400 rounded-full" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Mobile dots */}
          <div className="md:hidden flex justify-center gap-2 pb-4 pt-4">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to ${items[i].title}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

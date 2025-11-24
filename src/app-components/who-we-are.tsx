"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { Button } from "@/app-components/ui/button"

export function WhoWeAre() {
  const prefersReduced = useReducedMotion()

  const inViewTransition = {
    duration: 0.6,
    ease: "easeOut",
  } as const

  return (
    <motion.section
      className="relative overflow-hidden relative overflow-hidden py-16 lg:py-24"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={inViewTransition}
    >
      {/* soft background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_-80px,theme(colors.primary/10),transparent_60%)]" />
        <div className="absolute -inset-x-10 -bottom-10 h-44 bg-gradient-to-t from-muted/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Big heading + arrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={inViewTransition}
          >
            <div className="flex items-start justify-between">
              <div className="relative">
                <motion.h2
                  className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight text-white"
                >
                  Who<br /> <span className="block sm:inline"><span className="text-primary">We</span> Are</span>
                </motion.h2>


              </div>

              {/* corner arrow */}
              <motion.div
                className="ml-6 text-primary"
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                animate={
                  prefersReduced
                    ? undefined
                    : { y: [0, -4, 0] }
                }
                style={{ originX: 0.5, originY: 0.5 }}
                {...(!prefersReduced && {
                  transition: { duration: 2.0, repeat: Infinity, ease: "easeInOut" },
                })}
                whileHover={{ scale: 1.06 }}
              >
                <ArrowUpRight size={72} strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Content card */}
          <motion.div
            className="space-y-6 bg-background/70 p-6 lg:p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={inViewTransition}
          >
            <p>
              International Center for Capacity Development (ICCD) stands as a leading corporate training institute in Nepal, dedicated to elevating professional excellence and organizational potential across the region. ICCD is committed to strengthening professional excellence across the financial sector. </p>

            <p> As a trusted learning partner for banks, insurance companies, and financial institutions, we are your strategic partner in growth, committed to fostering a culture of continuous learning and high-impact skill development.</p>
            
            {/* <p>Through industry-aligned training programs, expert-led workshops, and customized learning solutions, ICCD empowers professionals to stay ahead in an evolving financial landscape. </p> */}

            {/* CTA */}
            <Link href="/about" className="inline-block group ">
              {/* motion(Button) without variants */}
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-secondary/25 cursor-pointer"
                >
                  READ MORE
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

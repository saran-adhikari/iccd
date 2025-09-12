"use client"

import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function WhoWeAre() {
  return (
    <motion.section
      className="relative py-20 overflow-hidden" // clamp any stray children
      initial={{ opacity: 0, y: 16, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* soft background accents (clipped by overflow-hidden on section) */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_-80px,theme(colors.primary/10),transparent_60%)]" />
        <div className="absolute -inset-x-10 -bottom-10 h-44 bg-gradient-to-t from-muted/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Big label + contained accent line */}
          <motion.div
            className="relative overflow-hidden" // ensure inner svg never bleeds
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight">
              <span className="bg-gradient-to-br from-black to-primary/80 bg-clip-text text-transparent">
                Who&nbsp;We&nbsp;Are
              </span>
            </h2>

            <div className="mt-4 h-1 w-24 rounded-full bg-primary/80" />

            {/* Contained, subtle line accent that points toward the right column */}
            <div className="hidden lg:block mt-8 w-full overflow-hidden">
              <motion.svg
                viewBox="0 0 600 120"
                width="100%"
                height="120"
                preserveAspectRatio="xMidYMid meet"
                className="max-w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                {/* smooth curve kept fully INSIDE the viewBox */}
                <motion.path
                  d="M 10 90 C 180 20, 380 20, 590 60"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
                />
                {/* minimalist arrow head */}
                <motion.path
                  d="M 590 60 L 570 48 M 590 60 L 570 72"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/70"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* RIGHT: Content card */}
          <motion.div
            className="space-y-6 bg-background/70  p-6 lg:p-8  overflow-hidden"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p className="text-foreground/90">
                The International Centre for Compliance and Development (ICCD) is a premier training institution
                dedicated to strengthening AML/CFT regimes and compliance frameworks across financial institutions
                worldwide.
              </p>
              <p>
                With over a decade of experience, we bring together industry experts, regulatory specialists, and
                thought leaders to deliver world-class training programs that meet international standards and address
                real-world challenges.
              </p>
              <p>
                Our mission is to unite stakeholders in building stronger, more resilient financial systems through
                comprehensive education, innovative training methodologies, and practical solutions that drive
                meaningful change.
              </p>
            </div>

            <Link href="/about" className="inline-block">
              <Button className="bg-black hover:bg-primary/90 text-primary-foreground cursor-pointer group">
                READ MORE
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

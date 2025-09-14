"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { ReactTyped } from "react-typed"

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16) // ~60fps
    const step = () => {
      start += increment
      if (start < end) {
        setCount(Math.floor(start))
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  return <span>{count}+</span>
}

export function HeroSection() {
  return (
    <section className="relative py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            className="space-y-6 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              className="space-y-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
                <span className="text-primary">
                  <ReactTyped
                    strings={["Empowering"]}
                    typeSpeed={80}
                    backSpeed={40}
                    showCursor={true}
                    loop={false}
                  />
                </span>{" "}<br/>
                Professionals,{" "}
                <span className="text-primary">Elevating</span> Institutions
              </h1>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
              }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent-foreground cursor-pointer">
                EXPLORE PROGRAMS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={500} />
                </div>
                <div className="text-sm text-muted-foreground">Professionals Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={50} />
                </div>
                <div className="text-sm text-muted-foreground">Partner Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={15} />
                </div>
                <div className="text-sm text-muted-foreground">Training Programs</div>
              </div>
            </div>
          </motion.div>
          
          

          {/* Image */}
          <motion.div
            className="relative lg:justify-self-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="w-full mx-auto lg:w-[520px] xl:w-[560px]">
              <div className="overflow-hidden">
                <Image
                  src="/Images/puzzle.png"
                  alt="Professional financial training environment"
                  width={560}
                  height={420}
                  className="block w-full h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

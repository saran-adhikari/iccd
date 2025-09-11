"use client"


import { motion } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"


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
                <span className="text-primary">Empowering</span> Professionals,{" "}
                <span className="text-primary">Elevating</span> Institutions
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Leading the way in AML, ESG, Risk Management, and Leadership training. Building stronger compliance
                frameworks for financial institutions worldwide.
              </p>
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

            
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative lg:justify-self-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="w-full mx-auto lg:w-[520px] xl:w-[560px]">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/68/ff/99/68ff994ce11ed575e0d0f9202e79d5a3.jpg"
                  alt="Professional financial training environment"
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

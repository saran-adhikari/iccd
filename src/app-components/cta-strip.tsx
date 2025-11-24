"use client"

import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const scaleUp = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }

export default function CTAStrip() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-balance text-white"
            variants={fadeInUp}
          >
            Build Your Brand <br /> Customize Training Solutions
          </motion.h2>

          <motion.p
            className="text-xl mb-10 max-w-3xl mx-auto text-muted-foreground/70"
            variants={fadeInUp}
          >
            Partner with ICCD to develop tailored training programs that align with your
            institution&apos;s specific needs and regulatory requirements.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={scaleUp}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="bg-secondary border border-secondary/40 text-lg font-semibold px-8 py-6 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                aria-label="Schedule a consultation with ICCD"
                
              >
                SCHEDULE CONSULTATION
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const fadeInRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } } }
const fadeInLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }

export function WhoWeAre() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <motion.div
            className="space-y-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4 relative inline-block">
                Who We Are
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-primary rounded-full"></span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
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
            </div>

            <Link href="/about">
              <Button className="bg-black hover:bg-primary/90 text-primary-foreground cursor-pointer">
                READ MORE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative group rounded-2xl overflow-hidden shadow-xl"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              loading="lazy"
              src="https://i.pinimg.com/1200x/ab/80/69/ab8069647dc1033b87312b955db3b123.jpg"
              alt="ICCD team and training environment"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

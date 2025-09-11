"use client"

import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function WhoWeAre() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <img
              src="https://i.pinimg.com/1200x/ab/80/69/ab8069647dc1033b87312b955db3b123.jpg"
              alt="ICCD team and training environment"
              className="w-full h-full object-cover rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
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

            <Button
              className="bg-black hover:bg-primary/90 text-primary-foreground cursor-pointer"
              onClick={() => (window.location.href = "/about")}
            >
              READ MORE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

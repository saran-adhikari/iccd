'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CompanyInfo() {
  return (
    <motion.section
      className="relative bg-background py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-4xl font-extrabold text-white leading-tight">
              Be a part of <span className="text-primary"> Nepal&apos;s fastest</span>   growing{" "}
              training institute
            </h2>

            
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="relative w-full h-auto lg:h-[400px] object-contain"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src="/Images/Stocks/nepalmap-bg.png"
              alt="Map of Nepal"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CompanyInfo() {
  return (
    <motion.section
      className="relative bg-white py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-4xl font-extrabold text-black leading-tight">
              Be a part of Nepal&apos;s<span className="text-primary"> fastest</span>   growing{" "}
              training institute
            </h2>

            {/* Creative CTA Link */}
            {/* <div className="mt-4">
              <Link
                href="/programs"
                className="group relative inline-block text-lg font-medium text-primary transition-colors duration-300"
              >
                Explore Programs →
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div> */}
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="relative w-full h-auto lg:h-[500px] object-contain"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src="/Images/Stocks/nepalmap-green.png"
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

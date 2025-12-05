"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Raleway } from 'next/font/google'

interface Partner {
  id: string
  name: string
  logo: string | null
  website: string | null
}

// Import Sacramento font
const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export function TrustedPartners({ partners }: { partners: Partner[] }) {
  return (
    <section className="py-8 md:py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="text-center mb-0"
        >
          <h2 className="text-xl sm:text-2xl font-light text-gray mt-2">
            Trusted by Leading Financial Institutions
          </h2>
        </motion.div>

        {/* Partner Names Marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="overflow-hidden relative h-16 sm:h-20 md:h-24"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="flex items-center gap-8 md:gap-12 animate-marquee">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={partner.name + i}
                  className="flex items-center justify-center px-6 flex-shrink-0"
                >
                  <span
                    className={`${raleway.className} text-xl sm:text-2xl md:text-2xl font-light text-white-600 hover:text-white-900 tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap`}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

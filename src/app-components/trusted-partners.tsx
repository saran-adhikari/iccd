"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function TrustedPartners() {
  const partners = [
    { name: "Mahalaxmi Bank", logo: "/Images/Partners/mahalaxmi.jpg" },
    { name: "Nepal Investment Mega Bank", logo: "/Images/Partners/nimb.jpg" },
    { name: "Citizens Bank", logo: "/Images/Partners/citizensbank.jpg" },
    { name: "Kumari Bank", logo: "/Images/Partners/kbl.jpg" },
    { name: "Prime Bank", logo: "/Images/Partners/pbl.jpg" },
    { name: "Himalayan Bank", logo: "/Images/Partners/hbl.jpg" },
    { name: "Siddhartha Capital Ltd.", logo: "/Images/Partners/sbl.jpg" },
    { name: "Machapucchre Bank Ltd.", logo: "/Images/Partners/mbl.jpg" },
  ]

  return (
    <section className="py-8 md:py-4">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,      // how long the pop lasts
            delay: 1,         // delay (seconds) before pop starts
            ease: "easeOut",
          }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl sm:text-2 xl font-light text-secondary mb-2">
            Trusted by Leading Financial Institutions
          </h2>
          {/* optional sub-text if needed */}
          {/* <p className="text-muted-foreground text-sm sm:text-base">
            Partnering with banks and institutions worldwide to strengthen compliance frameworks
          </p> */}
        </motion.div>

        {/* Compact marquee container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1,    // matches the heading delay so the whole block “pops up” together
            ease: "easeOut",
          }}
          className="overflow-hidden relative h-14 sm:h-16 md:h-20"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="flex items-center gap-6 md:gap-8 animate-marquee">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={partner.name + i}
                  className="flex items-center justify-center px-2 flex-shrink-0"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={80}
                    className="object-contain w-auto h-8 sm:h-10 md:h-12 opacity-70 hover:opacity-100 transition duration-200 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

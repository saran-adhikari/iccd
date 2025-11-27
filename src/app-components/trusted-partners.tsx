"use client"

import { motion } from "framer-motion"

interface Partner {
  id: string
  name: string
  logo: string
  website: string | null
}

export function TrustedPartners({ partners }: { partners: Partner[] }) {

  return (
    <section className="py-8 md:py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,      // how long the pop lasts
            delay: 1,         // delay (seconds) before pop starts
            ease: "easeOut",
          }}
          className="text-center mb-0"
        >
          <h2 className="text-xl sm:text-2 xl font-light text-gray mt-2" >
            Trusted by Leading Financial Institutions
          </h2>

        </motion.div>

        {/* Compact marquee container */}
        {/* <motion.div
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
                  className="flex items-center justify-center px-4 flex-shrink-0"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={80}
                    className="object-cover w-auto h-8 sm:h-10 md:h-12 opacity-70 hover:opacity-100 transition duration-200 cursor-pointer grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div> */}
        {/* Compact marquee container with text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: "easeOut",
          }}
          className="overflow-hidden relative h-16 sm:h-20 md:h-24"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="flex items-center gap-8 md:gap-12 animate-marquee">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={partner.name + i}
                  className="flex items-center justify-center px-6 flex-shrink-0"
                >
                  <span className="text-xl sm:text-2xl md:text-2xl font-light text-white-600 hover:text-white-900 tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
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


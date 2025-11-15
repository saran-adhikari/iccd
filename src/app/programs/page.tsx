"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { programData, type Program } from "../../lib/programs"
import { ProgramsHero } from "@/app-components/programs-hero"
import { Header } from "@/app-components/header"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <ProgramsHero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-12 leading-tight text-center text-white">
          Explore Our <span className="text-white">Programs</span>
        </h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {programData.map((program: Program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/programs/${program.slug}`}>
                <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 !border-none rounded-4xl bg-white h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={program.images.cover}
                      alt={program.title}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex flex-wrap gap-2 pt-2 mb-2">
                        <Badge>{program.level}</Badge>
                        <Badge variant="secondary">{program.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors min-h-[60px]">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {program.summary}
                      </p>
                    </div>

                    {/* CTA Button at Bottom */}
                    {/* <div className="mt-4">
                      <span className="text-primary font-medium group-hover:underline">
                        View Details →
                      </span>
                    </div> */}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </>
  )
}

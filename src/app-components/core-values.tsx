"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Lightbulb, TrendingUp } from "lucide-react"

const defaultItems = [
  {
    icon: Shield,
    title: "Empowering Workforce",
    description:
      "Building capabilities and confidence in professionals to excel in compliance and risk management.",
    image: "https://i.pinimg.com/736x/ee/72/36/ee723682f431fc510b0c8670c1f82dce.jpg",
    alt: "Professionals in a training workshop",
  },
  {
    icon: Lightbulb,
    title: "Innovative Training",
    description:
      "Cutting-edge methodologies and real-world case studies that prepare professionals for modern challenges.",
    image: "https://i.pinimg.com/1200x/7b/40/fb/7b40fbfe44ee416b1bdcf4c8cd3833dc.jpg",
    alt: "Instructor presenting modern training materials",
  },
  {
    icon: TrendingUp,
    title: "Driving Change",
    description:
      "Creating lasting impact through transformative learning experiences that elevate industry standards.",
    image: "https://i.pinimg.com/736x/5a/af/30/5aaf307952aa18c7d7491f45aa1a68c1.jpg",
    alt: "Team celebrating growth and success",
  },
]

export function CoreValues({ items = defaultItems, initial = 0 }) {
  const [step, setStep] = useState(Math.min(Math.max(0, initial), items.length - 1))
  const leftRef = useRef<HTMLDivElement>(null)
  const [leftHeight, setLeftHeight] = useState<number | "auto">("auto")

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight)
    }
  }, [step, items.length])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 items-stretch md:grid-cols-2">
          {/* LEFT: steps list */}
          <div ref={leftRef}>
            
            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The principles that guide our mission to strengthen global compliance frameworks.
            </p>

            <div className="space-y-4">
              {items.map((it, i) => {
                const Active = i === step
                const Icon = it.icon
                return (
                  <button
                    key={it.title}
                    onClick={() => setStep(i)}
                    className={`group w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      Active ? "bg-accent/5 shadow-lg" : "bg-card"
                    }`}
                    aria-current={Active}
                  >
                    <div
                      className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-transform duration-300 ${
                        Active
                          ? "scale-105 bg-gradient-to-br from-accent/20 to-primary/10"
                          : "bg-accent/10"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${Active ? "text-accent" : "text-accent/80"}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3
                          className={`text-lg font-semibold ${
                            Active ? "text-primary" : "text-primary/90"
                          }`}
                        >
                          {it.title}
                        </h3>
                        <span
                          className={`ml-auto text-sm font-medium ${
                            Active ? "text-accent" : "text-muted-foreground"
                          }`}
                        >{`Step ${i + 1}`}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {it.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Only dots for navigation */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === step ? "w-8 rounded-full bg-accent" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: image / visual area (clean, no overlay) */}
          <div
            className="relative order-first md:order-last flex justify-center items-center"
            style={{ height: leftHeight }}
          >
            <div className="w-full max-w-2xl h-full overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-primary/5 to-accent/5 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={items[step].title}
                  src={items[step].image}
                  alt={items[step].alt || items[step].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 40, scale: 1.02 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

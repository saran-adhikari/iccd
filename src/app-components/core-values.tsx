"use client"

import { useState, type SVGProps } from "react"
import { Shield, Lightbulb, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

type ValueItem = {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const defaultItems: ValueItem[] = [
  { icon: Shield,     title: "Empowering workforce", description: "All our upcoming events!" },
  { icon: Lightbulb,  title: "Innovative training",  description: "Recommended courses, curated just for you!" },
  { icon: TrendingUp, title: "Driving change",       description: "How we distinguish from the others to make learning fun!" },
]

export function CoreValues({ items = defaultItems }: { items?: ValueItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, staggerChildren: 0.3 },
            },
          }}
        >
          {/* LEFT side heading */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
          >
            <h2 className="text-4xl md:text-4xl font-extrabold text-black leading-tight">
              Building <span className="text-primary">long-term capacity</span> that{" "}
              <span className="text-primary">strengthens</span> organizations.
            </h2>
          </motion.div>

          {/* RIGHT side values */}
          <motion.div className="space-y-8">
            {items.map((item, i) => {
              const Icon = item.icon
              const dim = hovered !== null && hovered !== i

              return (
                <motion.div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-pressed={hovered === i}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onBlur={() => setHovered(null)}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-start gap-6 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/5 ${
                    dim ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center"
                    animate={{
                      y: [0, -4, 0], // subtle floating
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Icon className="h-7 w-7 text-accent" />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-base text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

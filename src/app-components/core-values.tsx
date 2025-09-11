"use client"

import { useState, type SVGProps } from "react"
import { Shield, Lightbulb, TrendingUp } from "lucide-react"

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
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT side heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Building <span className="text-primary">long-term capacity</span> that{" "}
              <span className="text-primary">strengthens</span> organizations.
            </h2>
          </div>

          {/* RIGHT side values */}
          <div
            className="space-y-8"
            onMouseLeave={() => setHovered(null)}
          >
            {items.map((item, i) => {
              const Icon = item.icon
              const dim = hovered !== null && hovered !== i
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onBlur={() => setHovered(null)}
                  className={`flex items-start gap-6 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/5 ${
                    dim ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center transition-transform duration-200">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-base text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

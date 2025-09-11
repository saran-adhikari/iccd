"use client"

import { Shield, Lightbulb, TrendingUp } from "lucide-react"

const defaultItems = [
  {
    icon: Shield,
    title: "Empowering workforce",
    description: "All our upcoming events!",
  },
  {
    icon: Lightbulb,
    title: "Innovative training",
    description: "Recommended courses, curated just for you!",
  },
  {
    icon: TrendingUp,
    title: "Driving change",
    description: "How we distinguish from the others to make learning fun!",
  },
]

export function CoreValues({ items = defaultItems }) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT side heading */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug">
              Building <span className="text-accent">long-term capacity</span> that{" "}
              <span className="text-accent">strengthens</span> organizations.
            </h2>
          </div>

          {/* RIGHT side values */}
          <div className="space-y-6">
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/5 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </p>
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

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
          <div className="space-y-8">
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-6 p-4 rounded-xl hover:bg-accent/5 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground mt-2">
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

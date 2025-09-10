"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app-components/ui/button"
import { ArrowRight, Play } from "lucide-react"

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16) // ~60fps
    const step = () => {
      start += increment
      if (start < end) {
        setCount(Math.floor(start))
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  return <span>{count}+</span>
}

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/30 py-10 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                <span className="text-primary">Empowering</span> Professionals,{" "}
                <span className="text-accent">Elevating</span> Institutions
              </h1>
              {/* <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Leading the way in AML, ESG, Risk Management, and Leadership training. Building stronger compliance
                frameworks for financial institutions worldwide.
              </p> */}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
              >
                <Play className="mr-2 h-5 w-5" />
                Request Proposal
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={500} />
                </div>
                <div className="text-sm text-muted-foreground">Professionals Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={50} />
                </div>
                <div className="text-sm text-muted-foreground">Partner Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <CountUp end={15} />
                </div>
                <div className="text-sm text-muted-foreground">Training Programs</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 p-2">
              <img
                src="https://i.pinimg.com/1200x/ae/34/67/ae346704e44ca3587328cd08594a2308.jpg"
                alt="Professional financial training environment"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold shadow-lg">
              ISO Certified
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-lg">
              Global Standards
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

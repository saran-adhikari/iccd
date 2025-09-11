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
    <section className="relative py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
                <span className="text-primary">Empowering</span> Professionals,{" "}
                <span className="text-primary">Elevating</span> Institutions
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Leading the way in AML, ESG, Risk Management, and Leadership training. Building stronger compliance
                frameworks for financial institutions worldwide.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent-foreground cursor-pointer">
                EXPLORE PROGRAMS
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

            
          </div>

          {/* Image */}
          <div className="relative lg:justify-self-end">
            <div className="w-full mx-auto lg:w-[520px] xl:w-[560px]">
              <div className="rounded-2xl">
                <img
                  src="https://i.pinimg.com/736x/68/ff/99/68ff994ce11ed575e0d0f9202e79d5a3.jpg"
                  alt="Professional financial training environment"
                  className="block w-full h-[300px] sm:h-[340px] md:h-[380px] lg:h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

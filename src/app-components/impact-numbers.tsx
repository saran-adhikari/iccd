"use client"

import { useEffect, useRef, useState } from "react"

interface ImpactMetric {
  id: string
  label: string
  value: string
  suffix: string | null
  order: number
}

export function ImpactNumbers({ metrics }: { metrics: ImpactMetric[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Trigger only once
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
            Our <span className="text-white">Impact</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.slice(0, 3).map((stat) => (
            <div 
              key={stat.id} 
              className="bg-gradient-to-br from-[#0A2E52]/30 via-[#0A2E52]/20 to-[#0A2E52]/10 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm p-8 lg:p-10 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl lg:text-6xl font-extrabold mb-4 text-primary">
                {isVisible ? (
                  <CountUp end={parseInt(stat.value)} suffix={stat.suffix || ""} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-lg lg:text-xl text-muted-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = 0
    const duration = 2000
    const startTime = Date.now()

    // Easing function for smoother animation
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easeOutQuart(progress)
      const current = Math.floor(easedProgress * end)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
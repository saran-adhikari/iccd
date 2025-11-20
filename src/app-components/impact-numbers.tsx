"use client"

import { useEffect, useRef, useState } from "react"

export function ImpactNumbers() {
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

  const stats = [
    { number: 500, label: "Trained Professionals", suffix: "+" },
    { number: 15, label: "Partner Institutions", suffix: "+" },
    { number: 30, label: "Training Programs", suffix: "+" },
    // { number: 15, label: "Countries Served", suffix: "+" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
       

        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
            Our <span className="text-white">Impact</span>
          </h2>
          
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-6xl lg:text-7xl font-extrabold mb-4 text-primary">
                {isVisible ? (
                  <CountUp end={stat.number} suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-lg lg:text-xl text-muted-foreground/70 text-center">
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

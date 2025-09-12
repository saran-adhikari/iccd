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
    { number: 2500, label: "Trained Professionals", suffix: "+" },
    { number: 85, label: "Partner Institutions", suffix: "+" },
    { number: 25, label: "Training Programs", suffix: "+" },
    { number: 15, label: "Countries Served", suffix: "+" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-black">
            Our Impact <span className="text-accent">in Numbers</span>
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable results that demonstrate our commitment to excellence
          </p> */}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-6xl lg:text-7xl font-extrabold mb-4 text-primary">
                {isVisible ? (
                  <CountUp end={stat.number} suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-lg lg:text-xl text-muted-foreground font-medium">
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
    let start = 0
    const duration = 2000 // 2s
    const stepTime = 16 // ~60fps
    const increment = end / (duration / stepTime)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

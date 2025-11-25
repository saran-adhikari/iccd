"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/app-components/ui/card"
import { TrendingUp, Shield, Users, Award, Globe, Target } from "lucide-react"

export function ImpactMetrics() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const metrics = [
    {
      icon: Users,
      number: 500,
      suffix: "+",
      label: "Professionals Trained",
      description: "Compliance experts certified across global institutions",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Shield,
      number: 15,
      suffix: "+",
      label: "Partner Institutions",
      description: "Banks and financial organizations strengthened",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Globe,
      number: 30,
      suffix: "+",
      label: "Projects Delivered",
      description: "Successful compliance initiatives completed",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Award,
      number: 30,
      suffix: "+",
      label: "Training Programs",
      description: "Specialized courses covering all compliance areas",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: TrendingUp,
      number: 95,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistently high ratings from participants",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Target,
      number: 78,
      suffix: "%",
      label: "Compliance Improvement",
      description: "Average improvement in compliance scores",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">Impact by <span className="text-white">the Numbers</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quantifiable results that demonstrate our commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 align-center justify-center">
          {metrics.map((metric, index) => (
            <Card key={metric.label} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/10 border border-secondary/10">
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${metric.bgColor}`}
                >
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>

                <div className="text-4xl lg:text-5xl font-bold mb-2 text-primary">
                  {isVisible ? <CountUp end={metric.number} suffix={metric.suffix} /> : "0"}
                </div>

                <h3 className={`text-xl font-bold mb-2 text-white`}>{metric.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

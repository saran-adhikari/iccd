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
      number: 2500,
      suffix: "+",
      label: "Professionals Trained",
      description: "Compliance experts certified across global institutions",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Shield,
      number: 85,
      suffix: "+",
      label: "Partner Institutions",
      description: "Banks and financial organizations strengthened",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Globe,
      number: 15,
      suffix: "+",
      label: "Countries Served",
      description: "Global reach across major financial markets",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Award,
      number: 25,
      suffix: "+",
      label: "Training Programs",
      description: "Specialized courses covering all compliance areas",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: TrendingUp,
      number: 95,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistently high ratings from participants",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Target,
      number: 78,
      suffix: "%",
      label: "Compliance Improvement",
      description: "Average improvement in compliance scores",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Impact by the Numbers</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Quantifiable results that demonstrate our commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <Card key={metric.label} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${metric.bgColor}`}
                >
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>

                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {isVisible ? <CountUp end={metric.number} suffix={metric.suffix} /> : "0"}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${metric.color}`}>{metric.label}</h3>
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

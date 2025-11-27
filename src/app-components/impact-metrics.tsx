"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/app-components/ui/card"
import { TrendingUp, Shield, Users, Award, Globe, Target, BarChart, FileCheck, MessageSquare, BookOpen } from "lucide-react"

interface ImpactMetric {
  id: string
  label: string
  value: string
  suffix: string | null
  description: string | null
  icon: string | null
  order: number
}

const iconMap: Record<string, any> = {
  Users,
  Shield,
  Globe,
  Award,
  TrendingUp,
  Target,
  BarChart,
  FileCheck,
  MessageSquare,
  BookOpen
}

export function ImpactMetrics() {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<ImpactMetric[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    // Fetch metrics from API
    fetch('/api/impact-metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch impact metrics:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (metrics.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>No impact metrics available</p>
          </div>
        </div>
      </section>
    )
  }

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
          {metrics.map((metric) => {
            const IconComponent = metric.icon ? iconMap[metric.icon] || Users : Users
            const numericValue = parseInt(metric.value) || 0

            return (
              <Card key={metric.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/10 border border-secondary/10">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-secondary/10">
                    <IconComponent className="h-8 w-8 text-secondary" />
                  </div>

                  <div className="text-4xl lg:text-5xl font-bold mb-2 text-primary">
                    {isVisible ? <CountUp end={numericValue} suffix={metric.suffix || ""} /> : "0"}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{metric.label}</h3>
                  {metric.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">{metric.description}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
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

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app-components/ui/button"
import { Badge } from "@/app-components/ui/badge"
import { Clock, Users, Award, BookOpen } from "lucide-react"

/** dynamic mock data */
function getFeaturedPrograms() {
  return [
    {
      badge: "Featured Program",
      title: "ESG & Sustainability Training",
      subtitle: "Comprehensive ESG Training",
      description:
        "Master Environmental, Social, and Governance frameworks with our comprehensive training program designed for modern financial institutions.",
      stats: [
        { icon: Clock, label: "Duration", value: "5 Days" },
        { icon: Users, label: "Max Participants", value: "20" },
        { icon: Award, label: "Certification", value: "Certified" },
      ],
      outcomes: [
        "ESG risk assessment and management frameworks",
        "Sustainable finance regulations and compliance",
        "ESG reporting and disclosure requirements",
        "Integration of ESG factors in investment decisions",
      ],
      cta: { label: "Request Program Details", href: "/contact" },
      image: {
        src: "https://i.pinimg.com/736x/76/aa/9a/76aa9ab4c6455e367f512e6fb57f4e63.jpg",
        alt: "ESG Training Workshop",
      },
      orbitDots: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=150&q=60",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=150&q=60",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=60",
      ],
    },
    {
      badge: "New Arrival",
      title: "AI in Finance Bootcamp",
      subtitle: "AI-Driven Financial Innovation",
      description:
        "Explore machine learning and generative AI for risk management, fraud detection and predictive analytics.",
      stats: [
        { icon: Clock, label: "Duration", value: "4 Days" },
        { icon: Users, label: "Max Participants", value: "25" },
        { icon: BookOpen, label: "Projects", value: "3 Live" },
      ],
      outcomes: [
        "Build ML models for credit scoring",
        "Automate compliance with AI",
        "Integrate LLMs into risk monitoring",
      ],
      cta: { label: "Reserve Seat", href: "/ai-bootcamp" },
      image: {
        src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=65",
        alt: "AI Finance Bootcamp",
      },
      orbitDots: [
        "https://images.unsplash.com/photo-1581093588401-2fe9b3c1517d?auto=format&fit=crop&w=150&q=60",
        "https://images.unsplash.com/photo-1612197527219-11b629c83274?auto=format&fit=crop&w=150&q=60",
        "https://images.unsplash.com/photo-1604079628042-bec98ec2cb52?auto=format&fit=crop&w=150&q=60",
      ],
    },
    // ...keep or add more programs
  ]
}

export function FeaturedProgram() {
  const programs = getFeaturedPrograms()
  const [index, setIndex] = useState(0)
  const program = programs[index]

  // sizes
  const box = 520
  const main = 460
  const radius = box / 2 - 10
  const cx = box / 2
  const cy = box / 2
  const planetSize = 48 // smaller orbit images

  // other programs become clickable planets
  const orbitItems =
    programs.length > 1
      ? programs
          .map((p, i) => ({ src: p.image.src, alt: p.title, target: i }))
          .filter((o) => o.target !== index)
          .slice(0, 3)
      : (program.orbitDots || []).map((src, i) => ({ src, alt: `orbit-${i}`, target: index }))

  return (
    <section className="relative overflow-hidden py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left content */}
          <div className="space-y-8">
            <Badge className="bg-accent/10 text-accent border-accent/20">{program.badge}</Badge>
            <h2 className="text-4xl font-bold text-primary">{program.title}</h2>
            <p className="text-xl text-muted-foreground max-w-xl">{program.description}</p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {program.stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-accent" />
                    <span className="text-sm">{s.value}</span>
                  </div>
                )
              })}
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3">Key Learning Outcomes</h4>
              <ul className="space-y-2 text-muted-foreground">
                {program.outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="bg-primary hover:bg-primary/90 text-accent-foreground">
              <a href={program.cta.href}>{program.cta.label}</a>
            </Button>
          </div>

          {/* right cluster, pushed to right */}
          <div className="relative flex justify-end">
            <div className="relative" style={{ width: box, height: box }}>
              {/* LEFT-side orbit arc */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M100 0 A100 100 0 0 0 100 200"
                  fill="none"
                  stroke="rgba(0,0,0,0.18)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* main big image */}
              <motion.div
                key={program.image.src}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 0.95, opacity: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 16 }} // no delay
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={program.image.src}
                  alt={program.image.alt}
                  className="rounded-full shadow-2xl border-4 border-background object-cover"
                  style={{ width: main, height: main }}
                />
              </motion.div>

              {/* clickable planets along LEFT semicircle */}
              {orbitItems.map((item, i) => {
                const count = orbitItems.length || 1
                const t = count === 1 ? 0.5 : i / (count - 1)
                const angle = Math.PI / 2 + t * Math.PI // left half
                const x = cx + radius * Math.cos(angle)
                const y = cy + radius * Math.sin(angle)

                return (
                  <motion.img
                    key={`${item.src}-${i}`}
                    src={item.src}
                    alt={item.alt}
                    role="button"
                    tabIndex={0}
                    onClick={() => setIndex(item.target)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIndex(item.target)}
                    className="absolute rounded-full border-2 border-background shadow-md object-cover cursor-pointer
                               hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-accent transition-transform"
                    style={{ left: x - planetSize / 2, top: y - planetSize / 2, width: planetSize, height: planetSize }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.95, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 65 }} // removed delay
                    title="Click to view program"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/app-components/header"
import { ProgramsHero } from "@/app-components/programs-hero"
import { ProgramFilters } from "@/app-components/program-filters"
import { ProgramCategories } from "@/app-components/program-categories"
import { ProgramCard } from "@/app-components/program-card"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"

// Sample program data
const allPrograms = [
  {
    id: "aml-fundamentals",
    title: "AML Fundamentals & Best Practices",
    description:
      "Comprehensive introduction to anti-money laundering principles, regulations, and implementation strategies for financial institutions.",
    category: "AML & Compliance",
    duration: "3 Days",
    format: "Blended",
    maxParticipants: 25,
    level: "Beginner",
    price: "$1,200",
    nextSession: "Mar 15, 2024",
    image: "/placeholder.svg?key=aml1",
  },
  {
    id: "esg-risk-assessment",
    title: "ESG Risk Assessment & Management",
    description:
      "Learn to identify, assess, and manage environmental, social, and governance risks in financial decision-making processes.",
    category: "ESG & Sustainability",
    duration: "5 Days",
    format: "In-Person",
    maxParticipants: 20,
    level: "Intermediate",
    price: "$2,500",
    nextSession: "Apr 8, 2024",
    image: "/placeholder.svg?key=esg1",
  },
  {
    id: "operational-risk",
    title: "Operational Risk Management",
    description:
      "Master the frameworks and tools needed to identify, measure, and mitigate operational risks in banking operations.",
    category: "Risk Management",
    duration: "4 Days",
    format: "Online",
    maxParticipants: 30,
    level: "Advanced",
    price: "$1,800",
    nextSession: "Mar 22, 2024",
    image: "/placeholder.svg?key=risk1",
  },
  {
    id: "customer-experience",
    title: "Digital Customer Experience Excellence",
    description:
      "Transform customer interactions through digital channels while maintaining compliance and security standards.",
    category: "Customer Service",
    duration: "2 Days",
    format: "Blended",
    maxParticipants: 25,
    level: "Intermediate",
    price: "$950",
    nextSession: "Apr 12, 2024",
    image: "/placeholder.svg?key=customer1",
  },
  {
    id: "executive-leadership",
    title: "Executive Leadership in Financial Services",
    description:
      "Develop strategic leadership skills specifically tailored for senior executives in the financial services industry.",
    category: "Leadership & Soft Skills",
    duration: "5 Days",
    format: "In-Person",
    maxParticipants: 15,
    level: "Advanced",
    price: "$3,200",
    nextSession: "May 6, 2024",
    image: "/placeholder.svg?key=leadership1",
  },
  {
    id: "kyc-best-practices",
    title: "KYC & Customer Due Diligence",
    description:
      "Comprehensive training on Know Your Customer procedures, enhanced due diligence, and regulatory compliance.",
    category: "AML & Compliance",
    duration: "3 Days",
    format: "Online",
    maxParticipants: 35,
    level: "Beginner",
    price: "$1,100",
    nextSession: "Mar 29, 2024",
    image: "/placeholder.svg?key=kyc1",
  },
]

export default function ProgramsPage() {
  const [filteredPrograms, setFilteredPrograms] = useState(allPrograms)
  const [showAllPrograms, setShowAllPrograms] = useState(false)

  const handleFilterChange = (filters: {
    search: string
    category: string
    duration: string
    format: string
    industry: string
  }) => {
    let filtered = allPrograms

    if (filters.search) {
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          program.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.category) {
      const categoryMap: { [key: string]: string } = {
        "aml-compliance": "AML & Compliance",
        "esg-sustainability": "ESG & Sustainability",
        "risk-management": "Risk Management",
        "customer-service": "Customer Service",
        leadership: "Leadership & Soft Skills",
      }
      filtered = filtered.filter((program) => program.category === categoryMap[filters.category])
    }

    if (filters.format) {
      const formatMap: { [key: string]: string } = {
        "in-person": "In-Person",
        online: "Online",
        blended: "Blended",
      }
      filtered = filtered.filter((program) => program.format === formatMap[filters.format])
    }

    if (filters.duration) {
      filtered = filtered.filter((program) => {
        const duration = program.duration.toLowerCase()
        switch (filters.duration) {
          case "1-day":
            return duration.includes("1 day")
          case "2-3-days":
            return duration.includes("2 day") || duration.includes("3 day")
          case "4-5-days":
            return duration.includes("4 day") || duration.includes("5 day")
          case "1-week":
            return duration.includes("week") || Number.parseInt(duration) > 5
          default:
            return true
        }
      })
    }

    setFilteredPrograms(filtered)
    setShowAllPrograms(true)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProgramsHero />
      <ProgramFilters onFilterChange={handleFilterChange} />

      {!showAllPrograms && <ProgramCategories />}

      {showAllPrograms && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-primary">Training Programs</h2>
                <p className="text-muted-foreground">
                  {filteredPrograms.length} program{filteredPrograms.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No programs match your current filters.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <CTAStrip />
      <Footer />
    </main>
  )
}

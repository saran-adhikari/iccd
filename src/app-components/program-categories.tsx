import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Button } from "@/app-components/ui/button"
import { Shield, Leaf, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"

export function ProgramCategories() {
  const categories = [
    {
      id: "aml-compliance",
      icon: Shield,
      title: "AML & Compliance",
      description: "Comprehensive anti-money laundering and compliance training programs",
      programCount: 8,
      color: "bg-primary/10 text-primary",
      programs: ["AML Fundamentals", "KYC Best Practices", "Sanctions Compliance", "Transaction Monitoring"],
    },
    {
      id: "esg-sustainability",
      icon: Leaf,
      title: "ESG & Sustainability",
      description: "Environmental, Social, and Governance frameworks for modern banking",
      programCount: 5,
      color: "bg-accent/10 text-accent",
      programs: ["ESG Risk Assessment", "Sustainable Finance", "Climate Risk Management", "ESG Reporting"],
    },
    {
      id: "risk-management",
      icon: TrendingUp,
      title: "Risk Management",
      description: "Operational, credit, and market risk management strategies",
      programCount: 6,
      color: "bg-orange-100 text-orange-600",
      programs: ["Operational Risk", "Credit Risk Analysis", "Market Risk", "Stress Testing"],
    },
    {
      id: "customer-service",
      icon: Users,
      title: "Customer Service",
      description: "Excellence in customer relationship management and service delivery",
      programCount: 4,
      color: "bg-blue-100 text-blue-600",
      programs: ["Customer Experience", "Digital Banking", "Complaint Handling", "Relationship Management"],
    },
    {
      id: "leadership",
      icon: Target,
      title: "Leadership & Soft Skills",
      description: "Leadership development and essential soft skills for financial professionals",
      programCount: 7,
      color: "bg-purple-100 text-purple-600",
      programs: ["Executive Leadership", "Team Management", "Communication Skills", "Change Management"],
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Training Categories</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Specialized programs designed for different aspects of financial services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{category.programCount} Programs</Badge>
                </div>
                <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-sm text-primary">Featured Programs:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.programs.map((program) => (
                      <div key={program} className="text-sm text-muted-foreground">
                        • {program}
                      </div>
                    ))}
                  </div>
                </div>
                <Link href={`/programs/${category.id}`}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    View All Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

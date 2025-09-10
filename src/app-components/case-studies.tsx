import { Card } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Button } from "@/app-components/ui/button"
import { ArrowRight, TrendingUp, Shield, Leaf } from "lucide-react"

export function CaseStudies() {
  const caseStudies = [
    {
      id: "global-bank-aml",
      icon: Shield,
      title: "Global Bank AML Transformation",
      client: "International Banking Group",
      category: "AML & Compliance",
      challenge: "Outdated AML procedures leading to regulatory concerns and inefficient monitoring systems",
      solution: "Comprehensive 6-month AML training program covering 200+ staff across 5 countries",
      results: [
        "85% reduction in false positive alerts",
        "100% regulatory compliance achievement",
        "40% improvement in detection accuracy",
        "Staff confidence increased by 92%",
      ],
      image: "/placeholder.svg?key=case1",
      duration: "6 months",
      participants: "200+ staff",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "regional-bank-esg",
      icon: Leaf,
      title: "ESG Integration Success Story",
      client: "Regional Development Bank",
      category: "ESG & Sustainability",
      challenge: "Need to integrate ESG factors into lending decisions and risk assessment frameworks",
      solution: "Tailored ESG training program with practical workshops and implementation support",
      results: [
        "ESG risk framework implemented",
        "50% of loan portfolio ESG-assessed",
        "Sustainability reporting established",
        "Green finance products launched",
      ],
      image: "/placeholder.svg?key=case2",
      duration: "4 months",
      participants: "150+ staff",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: "commercial-bank-risk",
      icon: TrendingUp,
      title: "Operational Risk Excellence",
      client: "Commercial Banking Corporation",
      category: "Risk Management",
      challenge: "High operational risk incidents and inadequate risk monitoring across business units",
      solution: "Comprehensive risk management training with technology integration and process optimization",
      results: [
        "60% reduction in operational incidents",
        "Risk culture transformation achieved",
        "Automated monitoring systems deployed",
        "Cost savings of $2.3M annually",
      ],
      image: "/placeholder.svg?key=case3",
      duration: "8 months",
      participants: "300+ staff",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Real transformations achieved through our comprehensive training programs
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className={`${study.bgColor} ${study.color} border-current/20`}>{study.category}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${study.bgColor}`}>
                      <study.icon className={`h-6 w-6 ${study.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{study.title}</h3>
                      <p className="text-muted-foreground">{study.client}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-3">Results Achieved</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {study.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-start gap-2">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${study.color === "text-primary" ? "bg-primary" : study.color === "text-accent" ? "bg-accent" : "bg-orange-600"}`}
                            ></div>
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <div>
                          <span className="font-semibold">Duration:</span> {study.duration}
                        </div>
                        <div>
                          <span className="font-semibold">Participants:</span> {study.participants}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

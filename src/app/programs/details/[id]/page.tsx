import { Header } from "@/app-components/header"
import { ProgramDetailHero } from "@/app-components/program-detail-hero"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { CheckCircle, Users, Target, BookOpen } from "lucide-react"

// This would typically come from a database or API
const programData: { [key: string]: any } = {
  "aml-fundamentals": {
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
    image: "/placeholder.svg?key=aml-detail",
    learningOutcomes: [
      "Understand AML regulatory framework and compliance requirements",
      "Implement effective customer due diligence procedures",
      "Develop suspicious activity monitoring and reporting systems",
      "Create comprehensive AML policies and procedures",
      "Conduct risk assessments and manage AML compliance programs",
    ],
    whoShouldAttend: [
      "Compliance Officers",
      "Risk Management Professionals",
      "Banking Operations Staff",
      "Legal and Regulatory Affairs Teams",
      "Senior Management",
    ],
    curriculum: [
      {
        day: "Day 1",
        title: "AML Foundations",
        topics: ["Regulatory landscape", "Money laundering typologies", "Risk-based approach"],
      },
      {
        day: "Day 2",
        title: "Implementation",
        topics: ["KYC procedures", "Transaction monitoring", "Suspicious activity reporting"],
      },
      {
        day: "Day 3",
        title: "Advanced Topics",
        topics: ["Technology solutions", "Case studies", "Best practices"],
      },
    ],
  },
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = programData[params.id]

  if (!program) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Program Not Found</h1>
            <p className="text-muted-foreground">The requested program could not be found.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProgramDetailHero program={program} />

      {/* Program Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Learning Outcomes */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-accent" />
                    <CardTitle className="text-2xl text-primary">Learning Outcomes</CardTitle>
                  </div>
                  <CardDescription>What you'll achieve by completing this program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {program.learningOutcomes.map((outcome: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-accent" />
                    <CardTitle className="text-2xl text-primary">Curriculum</CardTitle>
                  </div>
                  <CardDescription>Detailed breakdown of the training program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {program.curriculum.map((day: any, index: number) => (
                      <div key={index} className="border-l-4 border-accent pl-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-accent/10 text-accent border-accent/20">{day.day}</Badge>
                          <h4 className="text-lg font-semibold text-primary">{day.title}</h4>
                        </div>
                        <div className="space-y-1">
                          {day.topics.map((topic: string, topicIndex: number) => (
                            <div key={topicIndex} className="text-muted-foreground">
                              • {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Who Should Attend */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-accent" />
                    <CardTitle className="text-xl text-primary">Who Should Attend</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.whoShouldAttend.map((role: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-muted-foreground">{role}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Program Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Investment</div>
                    <div className="text-2xl font-bold text-accent">{program.price}</div>
                    <div className="text-sm text-muted-foreground">per participant</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Next Session</div>
                    <div className="font-semibold text-primary">{program.nextSession}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Certificate</div>
                    <div className="font-semibold text-primary">ICCD Completion Certificate</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </main>
  )
}

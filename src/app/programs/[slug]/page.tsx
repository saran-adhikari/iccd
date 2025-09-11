import { notFound } from "next/navigation"
import { Header } from "@/app-components/header"
import { ProgramDetailHero } from "@/app-components/program-detail-hero"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { CheckCircle, Users, Target, BookOpen } from "lucide-react"


import {
  getProgramBySlug,
  getAllProgramSlugs,
  toSlug,
} from "../../../lib/programs"
import type { Program } from "../../../lib/programs"

type CurriculumDay = {
  day: string
  title: string
  topics: string[]
}

interface ProgramView {
  title: string
  description?: string
  category?: string
  duration?: string
  format?: string
  maxParticipants?: number
  level?: string
  price?: string
  nextSession?: string
  image?: string
  learningOutcomes?: string[]
  whoShouldAttend?: string[]
  curriculum?: CurriculumDay[]
}

/** map Program -> this page's view model with safe fallbacks */
function toProgramView(program: Program): ProgramView {
  return {
    title: program.title,
    description: program.summary,
    category: program.category,
    duration: program.durationDays ? `${program.durationDays} Days` : undefined,
    format: "In-person / Virtual",
    maxParticipants: program.maxParticipants,
    level: program.level,
    price: "Request a quote",
    nextSession: "TBA",
    image: program.images.cover ?? "/globe.svg",
    learningOutcomes: program.learningOutcomes ?? program.keyPoints ?? [],
    whoShouldAttend: program.audience ?? [],
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // normalize just in case a non-normalized slug ever lands here
  const normalized = toSlug(slug)
  const jsonProgram = getProgramBySlug(normalized)
  if (!jsonProgram) return notFound()

  const program: ProgramView = toProgramView(jsonProgram)


  return (
    <main className="min-h-screen">
      <Header />

      <ProgramDetailHero
        program={{
          title: program.title,
          description: program.description ?? "",
          category: program.category ?? "",
          duration: program.duration ?? "",
          format: program.format ?? "",
          maxParticipants: program.maxParticipants ?? 0,
          level: program.level ?? "",
          price: program.price ?? "",
          nextSession: program.nextSession ?? "",
          image: program.image ?? "/globe.svg",
        }}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {program.learningOutcomes && program.learningOutcomes.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-accent" />
                      <CardTitle className="text-2xl text-primary">Learning Outcomes</CardTitle>
                    </div>
                    <CardDescription>What you&apos;ll achieve by completing this program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {program.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {program.curriculum && program.curriculum.length > 0 && (
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
                      {program.curriculum.map((day, index) => (
                        <div key={index} className="border-l-4 border-accent pl-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-accent/10 text-accent border-accent/20">{day.day}</Badge>
                            <h4 className="text-lg font-semibold text-primary">{day.title}</h4>
                          </div>
                          <div className="space-y-1">
                            {day.topics.map((topic, topicIndex) => (
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
              )}
            </div>

            <div className="space-y-8">
              {program.whoShouldAttend && program.whoShouldAttend.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-accent" />
                      <CardTitle className="text-xl text-primary">Who Should Attend</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {program.whoShouldAttend.map((role, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="text-muted-foreground">{role}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(program.price || program.nextSession) && (
                <Card className="bg-accent/5 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Program Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {program.price && (
                      <div>
                        <div className="text-sm text-muted-foreground">Investment</div>
                        <div className="text-2xl font-bold text-accent">{program.price}</div>
                        <div className="text-sm text-muted-foreground">per participant</div>
                      </div>
                    )}
                    {program.nextSession && (
                      <div>
                        <div className="text-sm text-muted-foreground">Next Session</div>
                        <div className="font-semibold text-primary">{program.nextSession}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-muted-foreground">Certificate</div>
                      <div className="font-semibold text-primary">ICCD Completion Certificate</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </main>
  )
}

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }))
}


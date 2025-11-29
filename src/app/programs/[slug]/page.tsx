import { notFound } from "next/navigation"
import { Header } from "@/app-components/header"
import { ProgramDetailHero } from "@/app-components/program-detail-hero"
import { CTAStrip } from "@/app-components/cta-strip"
import { MorePrograms } from "@/app-components/more-programs"
import { Footer } from "@/app-components/footer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { CheckCircle, BookOpen } from "lucide-react"


import {
  getProgramBySlug,
  getPrograms,
  toSlug,
} from "@/lib/programs"
import type { Program } from "@/lib/programs"

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
  certification?: string
  maxParticipants?: number
  level?: string
  price?: string
  nextSession?: string
  image?: string
  learningOutcomes?: string[]
  whoShouldAttend?: string[]
  curriculum?: CurriculumDay[]
  longDescription?: string
}

/** map Program -> this page's view model with safe fallbacks */
function toProgramView(program: Program): ProgramView {
  return {
    title: program.title,
    description: program.summary,
    category: program.category,
    duration: program.durationDays ? `${program.durationDays} Days` : undefined,
    format: program.format,
    certification: program.certification,
    maxParticipants: program.maxParticipants,
    level: program.level,
    price: "Request a quote",
    image: program.images.cover ?? "/globe.svg",
    learningOutcomes: program.learningOutcomes ?? program.keyPoints ?? [],
    whoShouldAttend: program.audience ?? [],
    longDescription: program.longDescription ??
      program.summary ??
      "Detailed program information will be available soon.",
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
  const jsonProgram = await getProgramBySlug(normalized)
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
          certification: program.certification ?? "",
          maxParticipants: program.maxParticipants ?? 0,
          level: program.level ?? "",
          price: program.price ?? "",
          nextSession: program.nextSession ?? "",
          image: program.image ?? "/globe.svg",
        }}
      />

      <section className="py-0 bg-background ">
        <div className="w-[80%] mx-auto px-0 sm:px-0 lg:px-0">
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-12">
              {program.longDescription && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-8 w-8 text-primary" />
                      <CardTitle className="text-2xl text-primary">Program Overview</CardTitle>
                    </div>

                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {program.longDescription}
                    </p>
                  </CardContent>
                </Card>
              )}


              {program.curriculum && program.curriculum.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-primary" />
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

            <div className="space-y-4">
              {program.whoShouldAttend && program.whoShouldAttend.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {/* <Users className="h-6 w-6 text-primary" /> */}
                      <CardTitle className="text-xl text-primary">Who Should Attend</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {program.whoShouldAttend.map((role, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{role}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {program.learningOutcomes && program.learningOutcomes.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {/* <Target className="h-6 w-6 text-primary" /> */}
                      <CardTitle className="text-2xl text-primary">Learning Outcomes</CardTitle>
                    </div>
                    <CardDescription>What you&apos;ll achieve by completing this program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {program.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <MorePrograms currentSlug={normalized} programs={await getPrograms()} />
      <CTAStrip />
      <Footer />
    </main>
  )
}

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic'
export const revalidate = 0


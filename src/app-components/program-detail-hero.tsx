import { Badge } from "@/app-components/ui/badge"
import { Button } from "@/app-components/ui/button"
import { Clock, Users, MapPin, Award, Calendar } from "lucide-react"

interface ProgramDetailHeroProps {
  program: {
    title: string
    description: string
    category: string
    duration: string
    format: string
    maxParticipants: number
    level: string
    price: string
    nextSession: string
    image: string
  }
}

export function ProgramDetailHero({ program }: ProgramDetailHeroProps) {
  const formatColors = {
    "In-Person": "bg-primary/10 text-primary border-primary/20",
    Online: "bg-accent/10 text-accent border-accent/20",
    Blended: "bg-orange-100 text-orange-600 border-orange-200",
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{program.category}</Badge>
              <Badge className={formatColors[program.format as keyof typeof formatColors]}>{program.format}</Badge>
              <Badge variant="secondary">{program.level}</Badge>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight text-primary">{program.title}</h1>

            <p className="text-xl text-muted-foreground leading-relaxed">{program.description}</p>

            {/* Program Details */}
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-semibold">{program.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Max Participants</div>
                  <div className="font-semibold">{program.maxParticipants} people</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Format</div>
                  <div className="font-semibold">{program.format}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted-foreground">Certification</div>
                  <div className="font-semibold">Included</div>
                </div>
              </div>
            </div>

            {/* Pricing and CTA */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-3xl font-bold text-accent">{program.price}</div>
                <div className="text-sm text-muted-foreground">per participant</div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Download Brochure
                </Button>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Request Proposal
                </Button>
              </div>
            </div>

            {/* Next Session */}
            <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <Calendar className="h-5 w-5 text-accent" />
              <div>
                <div className="text-sm text-muted-foreground">Next Session</div>
                <div className="font-semibold text-accent">{program.nextSession}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={program.image || "/placeholder.svg"}
              alt={program.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

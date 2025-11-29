import { Badge } from "@/app-components/ui/badge"
import { Button } from "@/app-components/ui/button"
import Link from "next/link"
import { Clock, Users, MapPin, Award, Calendar, ChevronRight } from "lucide-react"

interface ProgramDetailHeroProps {
  program: {
    title: string
    description: string
    category: string
    duration: string
    format: string
    certification?: string
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
    Blended: "bg-orange-100 text-secondary border-secondary/20",
  }

  return (
    <section className="relative bg-background pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">

        {/* Breadcrumb Route Section */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-border" />
          <Link href="/programs" className="hover:text-secondary transition-colors">
            Programs
          </Link>
          <ChevronRight className="w-4 h-4 text-border" />
          <span className="text-primary cursor-pointer font-medium ">{program.title}</span>
        </nav>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">


          <div className="space-y-6">


            <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight text-primary">{program.title}</h1>

            <p className="text-m text-muted-foreground leading-relaxed max-w-2xl">{program.description}</p>

            {/* Program Details */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 py-8 border-y border-border/60">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-0.5">Duration</div>
                  <div className="font-semibold text-foreground">{program.duration}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-0.5">Max Participants</div>
                  <div className="font-semibold text-foreground">{program.maxParticipants} people</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-0.5">Format</div>
                  <div className="font-semibold text-foreground">{program.format}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-0.5">Certification</div>
                  <div className="font-semibold text-foreground">{program.certification || "Included"}</div>
                </div>
              </div>
            </div>

            {/* Tags/Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/10 text-white bg-primary/20 transition-colors rounded-full uppercase">
                {program.category}
              </Badge>
              <Badge className={`px-4 py-1.5 text-sm font-medium rounded-full uppercase ${formatColors[program.format as keyof typeof formatColors] || 'bg-secondary/20 text-white border-secondary/10'}`}>
                {program.format}
              </Badge>
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium border-accent/10 text-white bg-accent/70 transition-colors rounded-full uppercase">
                {program.level}
              </Badge>
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

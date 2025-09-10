import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Button } from "@/app-components/ui/button"
import { Clock, Users, MapPin, Award } from "lucide-react"
import Link from "next/link"

interface ProgramCardProps {
  program: {
    id: string
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

export function ProgramCard({ program }: ProgramCardProps) {
  const formatColors = {
    "In-Person": "bg-primary/10 text-primary border-primary/20",
    Online: "bg-accent/10 text-accent border-accent/20",
    Blended: "bg-orange-100 text-orange-600 border-orange-200",
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge className={formatColors[program.format as keyof typeof formatColors] || "bg-gray-100 text-gray-600"}>
            {program.format}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {program.category}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {program.level}
          </Badge>
        </div>
        <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
          {program.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">{program.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Max {program.maxParticipants}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{program.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>Certificate</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Next Session</div>
            <div className="font-semibold text-primary">{program.nextSession}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">From</div>
            <div className="text-xl font-bold text-accent">{program.price}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/programs/details/${program.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              View Details
            </Button>
          </Link>
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">Request Proposal</Button>
        </div>
      </CardContent>
    </Card>
  )
}

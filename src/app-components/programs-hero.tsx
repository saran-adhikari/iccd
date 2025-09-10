import { Badge } from "@/app-components/ui/badge"

export function ProgramsHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Training Programs</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6">
            <span className="text-primary">Comprehensive Training</span> for{" "}
            <span className="text-accent">Modern Financial Institutions</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover our extensive range of specialized training programs designed to meet the evolving needs of
            compliance professionals, risk managers, and financial leaders worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}

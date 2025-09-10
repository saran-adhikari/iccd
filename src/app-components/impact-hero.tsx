import { Badge } from "@/app-components/ui/badge"

export function ImpactHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Our Impact</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6">
            <span className="text-primary">Measurable Results</span> That{" "}
            <span className="text-accent">Transform Organizations</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover how ICCD&apos;s training programs have strengthened compliance frameworks, reduced risks, and elevated
            professional capabilities across leading financial institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}

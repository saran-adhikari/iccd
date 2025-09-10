import { Badge } from "@/app-components/ui/badge"

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">About ICCD</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6">
            <span className="text-primary">Uniting Stakeholders</span> to Build a{" "}
            <span className="text-accent">Stronger AML/CFT Regime</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            For over a decade, ICCD has been at the forefront of compliance training, bringing together industry
            experts, regulatory specialists, and thought leaders to strengthen financial institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}

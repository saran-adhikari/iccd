import { Target, Eye } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To empower financial institutions and professionals with the knowledge, skills, and tools necessary to
              build robust compliance frameworks, manage risks effectively, and contribute to a stronger, more
              transparent global financial system.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To be the world&apos;s leading center for compliance and development training, recognized for our innovative
              approaches, international standards, and measurable impact on strengthening AML/CFT regimes globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

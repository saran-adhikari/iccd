import { Badge } from "@/app-components/ui/badge"

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Contact Us</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6">
            <span className="text-primary">Ready to Transform</span> Your{" "}
            <span className="text-accent">Compliance Framework?</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Get in touch with our experts to discuss your training needs and discover how ICCD can strengthen your
            organization&apos;s compliance capabilities.
          </p>
        </div>
      </div>
    </section>
  )
}

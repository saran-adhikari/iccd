import { Badge } from "@/app-components/ui/badge"

export function AboutHero() {
  return (
    <section className="relative py-20 lg:py-32">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/e7/20/95/e72095a55814b8092a8d3d667203603b.jpg')" }} // replace with your image
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/40 to-primary/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            About ICCD
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6 text-white">
            <span className="text-white">Uniting Stakeholders</span> to Build a{" "}
            <span className="text-primary">Stronger AML/CFT Regime</span>
          </h1>
          <p className="text-xl text-gray-200 text-pretty leading-relaxed">
            ICCD has been at the forefront of compliance training, bringing
            together industry experts, regulatory specialists, and thought
            leaders to strengthen financial institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}

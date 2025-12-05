import { Badge } from "@/app-components/ui/badge"

export function ImpactHero() {
  return (
    <section className="relative py-20 lg:py-40">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/4c/87/46/4c874690464c6bb1bd0f8e9456a21fa1.jpg')" }} // replace with your image
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/40 to-primary/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 rounded-full">Our Impact</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6 text-white">
            <span className="text-white">Measurable Results</span> That{" "}
            <span className="text-white">Transform Organizations</span>
          </h1>
          <p className="text-xl text-gray-200 text-pretty leading-relaxed">
            Our programs strengthen governance, reduce risk, enhance customer trust, and build long-term institutional resilience.
          </p>
        </div>
      </div>
    </section>
  )
}

import { Badge } from "@/app-components/ui/badge"

export function AboutHero() {
  return (
    <section className="relative py-20 lg:py-40">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/e7/20/95/e72095a55814b8092a8d3d667203603b.jpg')" }} // replace with your image
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/40 to-primary/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            About ICCD
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6 text-white">
            Unveiling <span className="text-white">Our Identity,</span> {" "}
            <span className="text-white">Vision & </span> Values
            

          </h1>
          <p className="text-xl text-gray-200 text-pretty leading-relaxed">
            With a commitment to excellence and forward-looking approach to learning, ICCD aims to be a trusted partner in developing stronger, smarter, and more resilient financial institutions across Nepal and beyond.
          </p>
        </div>
      </div>
    </section>
  )
}

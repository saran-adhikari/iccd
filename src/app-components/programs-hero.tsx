import { Badge } from "@/app-components/ui/badge"

export function ProgramsHero() {
  return (
    <section className="relative py-20 lg:py-40">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3a/aa/09/3aaa0958a76daad0ed0ce89772db75f8.jpg')" }} // replace with your image
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/40 to-primary/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 rounded-full">Training Programs</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance text-white leading-tight mb-6">
            <span className="text-white">Comprehensive </span> Training for{" "}
            <span className="text-white">Modern Financial Institutions</span>
          </h1>
          <p className="text-xl text-gray-200 text-pretty leading-relaxed">
            Explore industry-leading training programs designed to strengthen skills, enhance compliance, and equip financial professionals for the challenges of tomorrow.
          </p>
        </div>
      </div>
    </section>
  )
}

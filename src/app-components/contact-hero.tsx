import { Badge } from "@/app-components/ui/badge"

export function ContactHero() {
  return (
    <section className="relative  py-20 lg:py-40">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/43/5e/b6/435eb64e7d4d427a7266c2abdf61c72a.jpg')" }} // replace with your image
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-black/40 to-primary/30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">Contact Us</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-balance text-white leading-tight mb-6">
            <span className="text-white">Ready to Transform</span> Your{" "}
            <span className="text-white">Compliance Framework?</span>
          </h1>
          <p className="text-xl text-gray-200 text-pretty leading-relaxed">
            Get in touch with our experts to discuss your training needs and discover how ICCD can strengthen your
            organization&apos;s compliance capabilities.
          </p>
        </div>
      </div>
    </section>
  )
}

import { ProgramsHero } from "@/app-components/programs-hero"
import { Header } from "@/app-components/header"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import { getPrograms } from "@/lib/programs"
import { ProgramsList } from "@/app-components/programs-list"

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <>
      <Header />
      <ProgramsHero />

      <section className="relative bg-background py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
              Explore Our <span className="text-white">Programs</span>
            </h2>
            <p className="text-lg text-slate-600">
              Elevate your expertise with our industry-leading curriculums designed for modern financial professionals.
            </p>
          </div>

          <ProgramsList programs={programs} />
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </>
  )
}

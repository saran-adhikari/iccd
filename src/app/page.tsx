import { Header } from "@/app-components/header"
import { HeroSection } from "@/app-components/hero-section"
import { TrustedPartners } from "@/app-components/trusted-partners"
import { CoreValues } from "@/app-components/core-values"
import { WhoWeAre } from "@/app-components/who-we-are"
import { ImpactNumbers } from "@/app-components/impact-numbers"
import FeaturedProgram from "@/app-components/featured-program"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import WhyICCD from "@/app-components/why-iccd"
import HeroTrainMyTeam from "@/app-components/herotrainmyteam"
import CompanyInfo from "@/app-components/company-info"
import ECLCalculator from "@/app-components/ECLCalculator"
import { Testimonials } from "@/app-components/testimonials"
import { getPrograms } from "@/lib/programs"

import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

// Force dynamic rendering for real-time updates
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const [programs, partners, impactMetrics, testimonials] = await Promise.all([
    getPrograms(),
    prisma.partner.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.impactMetric.findMany({ orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })
  ])

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustedPartners partners={partners} />
      <CoreValues />
      <WhoWeAre />
      <ImpactNumbers metrics={impactMetrics} />
      {/* <WhyICCD/> */}
      {/* <CompanyInfo/> */}
      <FeaturedProgram programs={programs} />
      <Testimonials testimonials={testimonials} />
      <ECLCalculator />
      
      {/* <IndustryTestimonials /> */}
      <HeroTrainMyTeam />

      {/* <CTAStrip /> */}
      <Footer />
    </main>
  )
}

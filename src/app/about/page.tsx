import { Header } from "@/app-components/header"
import { AboutHero } from "@/app-components/about-hero"
import { AboutStory } from "@/app-components/about-story"
import { MissionVision } from "@/app-components/mission-vision"
import { LeadershipTeam } from "@/app-components/leadership-team"
import { Testimonials } from "@/app-components/testimonials"
import { Accreditation } from "@/app-components/accreditation"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import { ImpactNumbers } from "@/app-components/impact-numbers"
import CompanyInfo from "@/app-components/company-info"
import WhyICCD_Toggle from "@/app-components/why-iccd"
import { CaseStudies } from "@/app-components/case-studies"
import { IndustryTestimonials } from "@/app-components/industry-testimonials"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      {/* <AboutStory /> */}
      <MissionVision />
      <WhyICCD_Toggle/>
      {/* <CompanyInfo/> */}
      {/* <LeadershipTeam /> */}
      {/* <ImpactNumbers/> */}
      {/* <Testimonials /> */}
      <IndustryTestimonials />
      {/* <Accreditation /> */}
      
      <CTAStrip />
      <Footer />
    </main>
  )
}

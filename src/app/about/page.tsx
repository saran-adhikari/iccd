import { Header } from "@/app-components/header"
import { AboutHero } from "@/app-components/about-hero"
import { MissionVision } from "@/app-components/mission-vision"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import WhyICCD_Toggle from "@/app-components/why-iccd"
import CompanyInfo from "@/app-components/company-info"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      {/* <AboutStory /> */}
      <MissionVision />
      <CompanyInfo />
      <WhyICCD_Toggle />

      {/* <LeadershipTeam /> */}
      {/* <ImpactNumbers/> */}
      {/* <Testimonials /> */}
      {/* <IndustryTestimonials /> */}
      {/* <Accreditation /> */}

      <CTAStrip />
      <Footer />
    </main>
  )
}

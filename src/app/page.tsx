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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustedPartners />
      <CoreValues  />
      <WhoWeAre />
      <HeroTrainMyTeam/>
      <WhyICCD/>
      {/* <ImpactNumbers /> */}
      <FeaturedProgram />
      <CTAStrip />
      <Footer />
    </main>
  )
}

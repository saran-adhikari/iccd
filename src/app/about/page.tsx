import { Header } from "@/app-components/header"
import { AboutHero } from "@/app-components/about-hero"
import { MissionVision } from "@/app-components/mission-vision"
import { CTAStrip } from "@/app-components/cta-strip"
import { Footer } from "@/app-components/footer"
import WhyICCD_Toggle from "@/app-components/why-iccd"
import CompanyInfo from "@/app-components/company-info"
import { ImgGallery } from "@/app-components/img-gallery"
import { getGalleryImages } from "@/actions/gallery-actions"
import MoreAboutUs from "@/app-components/more-about-us"

export default async function AboutPage() {
  const { data: images } = await getGalleryImages()

  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      
      {/* <AboutStory /> */}
      <MissionVision />
      <MoreAboutUs />
      <CompanyInfo />
      
      <WhyICCD_Toggle />
      <ImgGallery images={images || []} />

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

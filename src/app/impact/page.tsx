import { CTAStrip } from "@/app-components/cta-strip"
import ECLCalculator from "@/app-components/ECLCalculator"
import { Footer } from "@/app-components/footer"
import { Header } from "@/app-components/header"
import HeroTrainMyTeam from "@/app-components/herotrainmyteam"
import { ImpactHero } from "@/app-components/impact-hero"
import { ImpactInfographic } from "@/app-components/impact-infographic"
import { ImpactMetrics } from "@/app-components/impact-metrics"
import { ImpactNumbers } from "@/app-components/impact-numbers"
import { IndustryTestimonials } from "@/app-components/industry-testimonials"
import { Testimonials } from "@/app-components/testimonials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function ImpactPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <main className="min-h-screen">
            <Header />
            <ImpactHero />
            <ImpactMetrics />
            <ECLCalculator />
            {/* <ImpactNumbers/> */}
            {/* <IndustryTestimonials /> */}
            {/* <HeroTrainMyTeam /> */}
            <Testimonials testimonials={testimonials} />
            <CTAStrip />
            <Footer />
        </main>
    )
}
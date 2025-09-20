"use client"

import { CTAStrip } from "@/app-components/cta-strip"
import {Footer} from "@/app-components/footer"
import { Header } from "@/app-components/header"
import { ImpactHero } from "@/app-components/impact-hero"

import { ImpactMetrics } from "@/app-components/impact-metrics"
import { ImpactNumbers } from "@/app-components/impact-numbers"
import { IndustryTestimonials } from "@/app-components/industry-testimonials"
import { Testimonials } from "@/app-components/testimonials"

export default function ImpactPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <ImpactHero />
            <ImpactMetrics />
            <IndustryTestimonials />
            {/* <Testimonials /> */}
            <CTAStrip />
            <Footer />
        </main>
    )
}
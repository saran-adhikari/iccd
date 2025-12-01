import { Header } from "@/app-components/header"
import { ContactHero } from "@/app-components/contact-hero"
import { ContactForm } from "@/app-components/contact-form"
import { Footer } from "@/app-components/footer"
import { Testimonials } from "@/app-components/testimonials"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function ContactPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactForm />
      <Testimonials testimonials={testimonials} />
      {/* <ContactMap /> */}
      <Footer />
    </main>
  )
}

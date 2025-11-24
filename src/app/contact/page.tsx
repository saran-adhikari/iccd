import { Header } from "@/app-components/header"
import { ContactHero } from "@/app-components/contact-hero"
import { ContactForm } from "@/app-components/contact-form"
import { ContactMap } from "@/app-components/contact-map"
import { Footer } from "@/app-components/footer"
import { Testimonials } from "@/app-components/testimonials"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactForm /> 
      <Testimonials />
      {/* <ContactMap /> */}
      <Footer />
    </main>
  )
}

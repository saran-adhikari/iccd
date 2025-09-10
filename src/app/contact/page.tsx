import { Header } from "@/app-components/header"
import { ContactHero } from "@/app-components/contact-hero"
import { ContactForm } from "@/app-components/contact-form"
import { ContactInfo } from "@/app-components/contact-info"
import { ContactMap } from "@/app-components/contact-map"
import { Footer } from "@/app-components/footer"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />

      {/* Contact Form and Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactMap />
        </div>
      </section>

      <Footer />
    </main>
  )
}

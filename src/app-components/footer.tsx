
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube, Mail } from "lucide-react"
import { getPrograms } from "@/lib/programs"
import { ScrollToTop } from "@/app-components/scroll-to-top"

export async function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Legal", href: "/legal" },
    { name: "Impact", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ]

  const programs = await getPrograms()
  const footerPrograms = programs.slice(0, 4).map((p) => ({
    name: p.title,
    href: `/programs/${p.slug}`,
  }))

  return (
    <footer className="bg-black text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div>
                  <div className="text-3xl font-bold">ICCD</div>
                  <div className="text-xs text-primary-foreground/80">
                    International Centre for Capacity<br /> Development
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-secondary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-primary">Training Programs</h4>
              <ul className="space-y-3">
                {footerPrograms.map((program) => (
                  <li key={program.href}>
                    <Link
                      href={program.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                    >
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay Connected */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-primary">Stay Connected</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Send us an email and stay connected with ICCD for insights and updates.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=iccdnepal@gmail.com&su=Stay%20Connected%20with%20ICCD&body=Hello%20ICCD%20Team,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-secondary/20 hover:bg-primary text-white border border-secondary/20 rounded-full px-6 py-1 uppercase"
                  >
                    Send Email
                  </a>
                </div>
                <p className="text-xs text-primary-foreground/60">
                  By reaching out, you consent to receive responses from ICCD.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © ICCD - International Centre for Capacity Development,  {new Date().getFullYear()}.
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  )
}

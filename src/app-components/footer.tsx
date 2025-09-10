import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, Mail } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Why Choose ICCD", href: "/why-choose" },
    { name: "Impact", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ]

  const programs = [
    { name: "AML & Compliance", href: "/programs/aml-compliance" },
    { name: "ESG & Sustainability", href: "/programs/esg-sustainability" },
    { name: "Risk Management", href: "/programs/risk-management" },
    { name: "Leadership Training", href: "/programs/leadership" },
  ]

  const policies = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Cookie Policy", href: "/cookies" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-accent-foreground font-bold text-xl">I</span>
                </div>
                <div>
                  <div className="text-xl font-bold">ICCD</div>
                  <div className="text-xs text-primary-foreground/80">
                    International Centre for Compliance & Development
                  </div>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Uniting Stakeholders to Build a Stronger AML/CFT Regime
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Youtube className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Training Programs</h4>
              <ul className="space-y-3">
                {programs.map((program) => (
                  <li key={program.name}>
                    <Link
                      href={program.href}
                      className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                    >
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Subscribe to our newsletter for the latest insights on compliance and training.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-primary-foreground/60">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from ICCD.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © 2024 International Centre for Compliance and Development. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              {policies.map((policy) => (
                <Link
                  key={policy.name}
                  href={policy.href}
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {policy.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

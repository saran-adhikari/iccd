"use client"

import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, Mail } from "lucide-react"
import Image from "next/image"
import { getAllProgramSlugs, getProgramBySlug } from "@/lib/programs"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Legal", href: "/legal" },
    { name: "Impact", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ]

  // generate programs dynamically from lib/programs
  const programSlugs = getAllProgramSlugs()
  const programs = programSlugs.map((slug) => {
    const program = getProgramBySlug(slug)
    return {
      name: program?.title ?? slug, // fallback to slug if no title
      href: `/programs/${slug}`,
    }
  })

  

  return (
    <footer className="bg-black text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                {/* <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-accent-foreground font-bold text-xl">I</span>
                </div> */}

                 {/* <div className="w-10 h-30 bg-none rounded-lg flex">
                                <Image
                                    src="/Images/Logo/5.png" // update with your logo path
                                    alt="ICCD Logo"
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                  />
                    </div> */}

                <div>
                  <div className="text-3xl font-bold">ICCD</div>
                  <div className="text-xs text-primary-foreground/80">
                    International Centre for Capacity<br/> Development
                  </div>
                </div>
              </div>
              {/* <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Uniting Stakeholders to Build a Stronger AML/CFT Regime
              </p> */}
              {/* <div className="flex space-x-4">
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors">
                  <Youtube className="h-5 w-5" />
                </button>
              </div> */}
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
                {programs.slice(0, 4).map((program) => (
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
                      className="flex items-center justify-center bg-secondary/20 hover:bg-primary text-white border border-secondary/20 rounded-md px-6 py-1 uppercase"
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
      {/* Back to top button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-primary border-secondary/40 text-white-foreground p-3 rounded-full shadow-lg hover:bg-secondary hover:border-secondary transition-colors duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

    </footer>
  )
}

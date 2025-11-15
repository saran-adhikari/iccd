"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    // { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    // { name: "Why Choose ICCD", href: "/why-choose" },
    // { name: "Events", href: "/events" },
    // { name: "Our Impact", href: "/impact" },
    // { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-40 h-30 bg-none rounded-lg flex items-center">
                <Image
                    src="/Images/Logo/1.png" // update with your logo path
                    alt="ICCD Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
              </div>
              {/* <div className="ml">
                <div className="text-xl font-bold text-primary">ICCD</div>
                <div className="text-xs text-muted-foreground">International Centre for Compliance & Development</div>
              </div> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button className="bg-primary hover:bg-secondary text-white cursor-pointer">REQUEST PROPOSAL</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-secondary text-white">Request Proposal</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

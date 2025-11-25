"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header if scrolling up or at the top
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (Math.abs(currentScrollY - lastScrollY) > 10) {
        // Only update if scroll difference is significant
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navigation = [
    // { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    // { name: "Why Choose ICCD", href: "/why-choose" },
    // { name: "Events", href: "/events" },
    { name: "Impact", href: "/impact" },
    // { name: "Blog", href: "/blog" },
    { name: "Legal", href: "/legal" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`bg-background border-b border-border sticky top-0 z-50 shadow-md transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
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
                className="text-foreground hover:text-secondary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link href="/request-proposal">
              <Button className="bg-secondary/20 border-secondary/40 hover:bg-secondary text-white cursor-pointer">REQUEST PROPOSAL</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer hover:bg-secondary hover:text-white">
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
                  className="block px-3 py-2 text-foreground hover:text-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link href="/request-proposal" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-secondary/20 border-secondary/40 hover:bg-secondary text-white cursor-pointer"> REQUEST PROPOSAL</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

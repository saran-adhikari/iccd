"use client"
import Link from "next/link"
import { useNepaliNews } from "@/app-components/news/useNepaliNews"
import { ScrollToTop } from "@/app-components/scroll-to-top"

export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Legal", href: "/legal" },
    { name: "Impact", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ]

  // const { news, loading, refresh } = useNepaliNews({ refreshInterval: 300000 })

  return (
    <footer className="bg-black text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            

            {/* Company Info + Stay Connected */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left min-h-full">
              <div className="mb-6">
                <div className="text-3xl font-bold">ICCD</div>
                <div className="text-xs text-primary-foreground/80">
                  International Center for Capacity<br /> Development Pvt. Ltd.
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-4">
              <h4 className="text-lg font-semibold mb-6 text-primary">Quick Links</h4>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>


            {/* Recent News */}
            {/* <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-primary">Recent News</h4>
                <button
                  onClick={() => refresh()}
                  className="text-xs px-3 py-1 border border-secondary/40 rounded-full hover:bg-secondary/20 hover:border-secondary/40 cursor-pointer text-white transition-colors"
                  aria-label="Refresh news"
                >
                  Refresh
                </button>
              </div>
              {loading ? (
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-3 border border-primary/20 rounded-lg animate-pulse h-20 bg-primary/5" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {news.slice(0, 10).map((n) => (
                    <article
                      key={n.id || n.link}
                      className="p-3 border border-primary/40 rounded-lg bg-none shadow-sm hover:bg-primary/10 transition-colors"
                    >
                      <a
                        href={n.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-white text-sm line-clamp-2 hover:text-secondary transition-colors"
                      >
                        {n.title}
                      </a>
                      <div className="text-xs text-primary-foreground/60 mt-1">
                        {n.source} {n.date ? `· ${new Date(n.date).toLocaleDateString()}` : ""}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div> */}
            {/* Stay Connected */}
            <div className="lg:col-span-4">
              <h4 className="text-lg font-semibold mb-6 text-primary">Stay Connected</h4>
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your email"
                    className="flex-1 px-4 py-1 rounded-full border border-primary/40 bg-none text-white placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary "
                  />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=iccdnepal@gmail.com&su=Stay%20Connected%20with%20ICCD&body=Hello%20ICCD%20Team,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-secondary/20 hover:bg-primary text-white border border-secondary/20 rounded-full px-3 py-1 uppercase text-sm"
                  >
                    Send Email
                  </a>
                </div>
                {/* <p className="text-primary-foreground/80 text-sm mt-4">
                  Send us an email and stay connected with ICCD for insights and updates.
                </p> */}
                <div className="space-y-3">
                  <p className="text-xs text-primary-foreground/60 mt-4 max-w-[300px]">
                    By reaching out, you consent to receive responses from ICCD.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <svg className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-primary-foreground/80">
                    <p>Baluwatar-04, Kathmandu</p>
                    {/* <p>Kathmandu, BA 4600 NPL</p> */}
                  </div>
                  <br />
                  <svg className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:iccdnepal@gmail.com" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    iccdnepal@gmail.com
                  </a>
                </div>
              </div>

            

          </div>      
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © ICCD - International Center for Capacity Development Pvt. Ltd., {new Date().getFullYear()}.
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  )
}
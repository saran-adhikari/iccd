"use client"

import Image from "next/image"

export function TrustedPartners() {
  const partners = [
    { name: "Mahalaxmi Bank", logo: "/Images/Partners/mahalaxmi.png" },
    { name: "Nabil Bank", logo: "/Images/Partners/nabil.png" },
    { name: "Kumari Bank", logo: "/Images/Partners/kbl.jpg" },
    { name: "Himalayan Bank", logo: "/Images/Partners/hbl.jpg" },
    { name: "Siddhartha Capital Ltd.", logo: "/Images/Partners/siddharthalogo.png" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Trusted by Leading Financial Institutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Partnering with banks and institutions worldwide to strengthen compliance frameworks
          </p>
        </div>

        {/* Marquee container */}
        <div className="overflow-hidden relative">
          <div className="flex space-x-8 animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={partner.name + i}
                className="flex items-center justify-center p-2 flex-shrink-0"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={150}
                  height={80}
                  className="object-contain opacity-70 hover:opacity-100 transition duration-200 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

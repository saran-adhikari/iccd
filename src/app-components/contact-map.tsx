// app-components/contact-map.tsx
export function ContactMap() {
  return (
    <div className="w-[80%] mx-auto space-y-10 py-20">
      {/* Title and subtitle */}
      <div className="text-center">
        <h3 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-black">Visit our <span className="text-primary">office</span></h3>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">In the heart of Kathmandu&apos;s financial district</p>
      </div>

      {/* Map section */}
      <div className="relative rounded-2xl overflow-hidden border bg-card shadow-md">
        <div className="aspect-[16/9] w-full">
          <iframe
            title="ICCD Headquarters Map"
            className="w-full h-full"
            // loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9939.432067590346!2d-0.095!3d51.514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760352e2c8d0c1%3A0x0000000000000000!2sCity%20of%20London!5e0!3m2!1sen!2suk!4v0000000000000"
          />
        </div>

        {/* Overlay with location info */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
        <div className="absolute left-6 bottom-6 bg-background/95 backdrop-blur-md rounded-xl p-5 shadow-lg border">
          <h4 className="font-semibold text-primary text-lg">ICCD Headquarters</h4>
          <p className="text-sm text-muted-foreground mt-1">
            123 Financial District, London, UK EC2V 8RF
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Nearest stations: Bank, Liverpool Street, Moorgate
          </p>
        </div>
      </div>

      {/* Transport and car cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-primary rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
          <h5 className="font-semibold text-white mb-3">BY PUBLIC TRANSPORT</h5>
          <ul className="space-y-1 text-gray-200 text-sm">
            <li>Bank Station — 3 min walk</li>
            <li>Liverpool Street — 8 min walk</li>
            <li>Moorgate — 5 min walk</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
          <h5 className="font-semibold text-primary mb-3">BY PERSONAL VEHICLE</h5>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>Limited street parking</li>
            <li>NCP car parks nearby</li>
            <li>Congestion charge applies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

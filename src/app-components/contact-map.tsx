// app-components/contact-map.tsx
export function ContactMap() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">Visit our office</h3>
        <p className="text-muted-foreground">In the heart of London’s financial district</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden border bg-card">
        {/* Accessible map with graceful fallback */}
        <div className="aspect-[16/9] w-full">
          <iframe
            title="ICCD Headquarters Map"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9939.432067590346!2d-0.095!3d51.514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760352e2c8d0c1%3A0x0000000000000000!2sCity%20of%20London!5e0!3m2!1sen!2suk!4v0000000000000"
          />
        </div>

        {/* Marker overlay cue */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
        <div className="absolute left-6 bottom-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
          <h4 className="font-semibold text-primary">ICCD Headquarters</h4>
          <p className="text-sm text-muted-foreground">123 Financial District, London, UK EC2V 8RF</p>
          <p className="text-xs text-muted-foreground mt-1">Nearest stations: Bank, Liverpool Street, Moorgate</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-card rounded-lg border">
          <h5 className="font-semibold text-primary mb-2">By public transport</h5>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Bank Station — 3 min walk</li>
            <li>• Liverpool Street — 8 min walk</li>
            <li>• Moorgate — 5 min walk</li>
          </ul>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <h5 className="font-semibold text-primary mb-2">By car</h5>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Limited street parking</li>
            <li>• NCP car parks nearby</li>
            <li>• Congestion charge applies</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

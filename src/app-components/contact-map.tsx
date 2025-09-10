export function ContactMap() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">Visit Our Office</h3>
        <p className="text-muted-foreground">Located in the heart of London&apos;s financial district</p>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-96 bg-muted rounded-2xl overflow-hidden">
        <img
          src="/placeholder.svg?key=map-london"
          alt="ICCD Office Location Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>

        {/* Office Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-accent rounded-full border-4 border-background shadow-lg animate-pulse"></div>
        </div>

        {/* Office Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-primary mb-1">ICCD Headquarters</h4>
            <p className="text-sm text-muted-foreground">123 Financial District, London, UK EC2V 8RF</p>
            <p className="text-xs text-muted-foreground mt-2">Nearest stations: Bank, Liverpool Street, Moorgate</p>
          </div>
        </div>
      </div>

      {/* Directions */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-card rounded-lg">
          <h5 className="font-semibold text-primary mb-2">By Public Transport</h5>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Bank Station: 3 min walk</li>
            <li>• Liverpool Street: 8 min walk</li>
            <li>• Moorgate: 5 min walk</li>
          </ul>
        </div>
        <div className="p-4 bg-card rounded-lg">
          <h5 className="font-semibold text-primary mb-2">By Car</h5>
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

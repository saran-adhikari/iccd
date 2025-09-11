import { Badge } from "@/app-components/ui/badge"
import { Award, Shield, Globe, CheckCircle } from "lucide-react"

export function Accreditation() {
  const accreditations = [
    {
      icon: Award,
      title: "ISO 21500 Certified",
      description: "Project Management Excellence",
      status: "Certified",
    },
    {
      icon: Shield,
      title: "ACAMS Partnership",
      description: "Association of Certified Anti-Money Laundering Specialists",
      status: "Partner",
    },
    {
      icon: Globe,
      title: "FATF Guidelines",
      description: "Aligned with Financial Action Task Force Standards",
      status: "Compliant",
    },
    {
      icon: CheckCircle,
      title: "Basel Committee",
      description: "Following Basel Committee on Banking Supervision Guidelines",
      status: "Aligned",
    },
  ]

  const partnerships = [
    { name: "World Bank Group", logo: "/placeholder.svg?key=wb" },
    { name: "IMF Institute", logo: "/placeholder.svg?key=imf" },
    { name: "ACAMS", logo: "/placeholder.svg?key=acams" },
    { name: "IFC", logo: "/placeholder.svg?key=ifc" },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-primary">Accreditations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognized by leading international bodies and regulatory organizations
          </p>
        </div>

        {/* Accreditations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {accreditations.map((item, index) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-2xl hover:shadow-md transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <item.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <Badge className="bg-accent/10 text-accent border-accent/20">{item.status}</Badge>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

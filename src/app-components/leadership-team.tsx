import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Linkedin, Mail } from "lucide-react"

export function LeadershipTeam() {
  const leaders = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      expertise: "AML/CFT Strategy",
      bio: "Former regulatory advisor with 20+ years in financial compliance. Led AML initiatives at major international banks.",
      image: "/placeholder.svg?key=leader1",
      credentials: ["PhD Economics", "CAMS", "CFE"],
    },
    {
      name: "Michael Chen",
      role: "Head of Training Programs",
      expertise: "Risk Management",
      bio: "Expert in operational risk and regulatory compliance with extensive experience in Asia-Pacific markets.",
      image: "/placeholder.svg?key=leader2",
      credentials: ["MBA Finance", "FRM", "PRM"],
    },
    {
      name: "Dr. Amara Okafor",
      role: "Director of ESG Programs",
      expertise: "Sustainable Finance",
      bio: "Leading authority on ESG integration in financial services with focus on emerging markets.",
      image: "/placeholder.svg?key=leader3",
      credentials: ["PhD Environmental Economics", "CFA", "ESG Certified"],
    },
    {
      name: "James Rodriguez",
      role: "Senior Compliance Advisor",
      expertise: "Regulatory Affairs",
      bio: "Former banking regulator with deep expertise in international compliance standards and frameworks.",
      image: "/placeholder.svg?key=leader4",
      credentials: ["JD Law", "CRCM", "ACAMS"],
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Leadership Team</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Our team brings together decades of experience from regulatory bodies, leading financial institutions, and
            academic research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <Card key={leader.name} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full"></div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-1">{leader.name}</h3>
                  <p className="text-accent font-semibold mb-2">{leader.role}</p>
                  <Badge variant="secondary" className="mb-4">
                    {leader.expertise}
                  </Badge>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{leader.bio}</p>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-primary">Credentials</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {leader.credentials.map((credential) => (
                        <Badge key={credential} variant="outline" className="text-xs">
                          {credential}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

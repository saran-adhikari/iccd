import { Card, CardContent } from "@/app-components/ui/card"
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+44 20 7123 4567"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@iccd.org", "training@iccd.org"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["123 Financial District", "London, UK EC2V 8RF"],
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "GMT (London Time)"],
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2">Get in Touch</h3>
        <p className="text-muted-foreground">Multiple ways to reach our expert team</p>
      </div>

      <div className="grid gap-6">
        {contactDetails.map((detail, index) => (
          <Card key={detail.title} className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${detail.bgColor}`}>
                  <detail.icon className={`h-6 w-6 ${detail.color}`} />
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${detail.color}`}>{detail.title}</h4>
                  <div className="space-y-1">
                    {detail.details.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-muted-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10">
              <Globe className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-accent">Global Presence</h4>
              <p className="text-muted-foreground text-sm">
                We serve clients across 15+ countries with regional offices in London, Dubai, and Nairobi. Our team can
                provide training in multiple languages and time zones.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

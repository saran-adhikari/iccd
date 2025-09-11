"use client"

import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Linkedin, Mail } from "lucide-react"

export function LeadershipTeam() {
  const leaders = [
    {
      name: "Dr. Starc Mitchell",
      role: "Chief Executive Officer",
      expertise: "AML/CFT Strategy",
      
      image: "https://i.pinimg.com/1200x/a4/ad/e3/a4ade34601af89c976de99b6c1cb42a5.jpg",
      credentials: ["PhD Economics", "CAMS", "CFE"],
    },
    {
      name: "Michael Chen",
      role: "Head of Training Programs",
      expertise: "Risk Management",
      
      image: "https://i.pinimg.com/736x/dc/cc/38/dccc38357920c5e9b3ace4692c6419a9.jpg",
      credentials: ["MBA Finance", "FRM", "PRM"],
    },
    
    {
      name: "James Rodriguez",
      role: "Senior Compliance Advisor",
      expertise: "Regulatory Affairs",
      
      image: "https://i.pinimg.com/736x/6d/5e/05/6d5e05772a65bc525497fe65d82bdea4.jpg",
      credentials: ["JD Law", "CRCM", "ACAMS"],
    },
  ]

  

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-primary">Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our team brings together decades of experience from regulatory bodies, leading financial institutions, and
            academic research.
          </p>
        </div>

        {/* 3-column layout like the reference */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {leaders.map((leader, index) => (
            <Card
              key={leader.name}
              className="group border-0 shadow-none bg-transparent text-center hover:shadow-none"
            >
              <CardContent className="p-0 flex flex-col items-center ">
                {/* circular photo with colored gradient ring */}
                <div
                  
                >
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-50 h-50 rounded-full object-contain shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* name & role (subtitle) similar to the reference */}
                <h3 className="text-2xl font-semibold text-gray-900">{leader.name}</h3>
                <p className="text-gray-600 mt-1">{leader.role}</p>

                {/* subtle expertise badge (kept from your flow) */}
                <Badge variant="secondary" className="mt-3">
                  {leader.expertise}
                </Badge>

                {/* social icons (flow preserved) */}
                <div className="flex justify-center gap-2 mt-4">
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4 cursor-pointer"/>
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4 cursor-pointer" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { TrendingUp, Users, Globe, Award } from "lucide-react"

export function ImpactInfographic() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Global Impact Overview</h2>
          <p className="text-xl text-primary-foreground/80 text-pretty">
            A comprehensive view of our worldwide influence on financial compliance
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Training Reach */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-sm mb-4">Professionals Trained</div>
              <div className="space-y-2 text-xs text-primary-foreground/80">
                <div>• 45% Compliance Officers</div>
                <div>• 30% Risk Managers</div>
                <div>• 25% Senior Leadership</div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Reach */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm mb-4">Countries Served</div>
              <div className="space-y-2 text-xs text-primary-foreground/80">
                <div>• Africa: 6 countries</div>
                <div>• Asia: 5 countries</div>
                <div>• Americas: 4 countries</div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2">78%</div>
              <div className="text-sm mb-4">Avg. Improvement</div>
              <div className="space-y-2 text-xs text-primary-foreground/80">
                <div>• Compliance Scores</div>
                <div>• Risk Detection</div>
                <div>• Process Efficiency</div>
              </div>
            </CardContent>
          </Card>

          {/* Recognition */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-sm mb-4">Client Satisfaction</div>
              <div className="space-y-2 text-xs text-primary-foreground/80">
                <div>• Training Quality</div>
                <div>• Expert Knowledge</div>
                <div>• Practical Application</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">Our Journey of Impact</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent"></div>
            <div className="space-y-12">
              {[
                { year: "2010", milestone: "Founded ICCD", description: "Started with AML training focus" },
                { year: "2015", milestone: "Regional Expansion", description: "Extended services across Africa" },
                {
                  year: "2018",
                  milestone: "Digital Transformation",
                  description: "Launched online training platforms",
                },
                { year: "2020", milestone: "Global Recognition", description: "Achieved international accreditation" },
                { year: "2024", milestone: "Industry Leadership", description: "Leading compliance training provider" },
              ].map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <Badge className="mb-2 bg-accent text-accent-foreground">{item.year}</Badge>
                    <h4 className="text-lg font-bold mb-1">{item.milestone}</h4>
                    <p className="text-sm text-primary-foreground/80">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-primary z-10"></div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

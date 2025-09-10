import { Button } from "@/app-components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Clock, Users, Award } from "lucide-react"

export function FeaturedProgram() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Featured Program</Badge>
          <h2 className="text-4xl font-bold text-primary mb-4">ESG & Sustainability Training</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Master Environmental, Social, and Governance frameworks with our comprehensive training program designed for
            modern financial institutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Program Details */}
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Comprehensive ESG Training</CardTitle>
              <CardDescription className="text-lg">
                Navigate the evolving landscape of sustainable finance and ESG compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm">5 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-sm">Max 20</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-sm">Certified</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Key Learning Outcomes:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    ESG risk assessment and management frameworks
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    Sustainable finance regulations and compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    ESG reporting and disclosure requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    Integration of ESG factors in investment decisions
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Request Program Details
              </Button>
            </CardContent>
          </Card>

          {/* Program Image */}
          <div className="relative">
            <img
              src="https://i.pinimg.com/736x/76/aa/9a/76aa9ab4c6455e367f512e6fb57f4e63.jpg"
              alt="ESG Training Workshop"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="text-sm font-semibold text-primary">Next Session</div>
              <div className="text-xs text-muted-foreground">March 15-19, 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

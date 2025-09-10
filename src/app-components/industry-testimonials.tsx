import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { Star, Quote, Linkedin } from "lucide-react"

export function IndustryTestimonials() {
  const testimonials = [
    {
      quote:
        "ICCD's AML training program was transformative for our organization. The practical approach and real-world case studies helped our team implement robust compliance frameworks that exceeded regulatory expectations.",
      author: "Dr. Sarah Chen",
      role: "Chief Compliance Officer",
      company: "Global Banking Corporation",
      industry: "International Banking",
      image: "/placeholder.svg?key=testimonial-leader1",
      rating: 5,
      impact: "85% improvement in compliance scores",
    },
    {
      quote:
        "The ESG training provided by ICCD was exactly what we needed to integrate sustainability into our core business strategy. The expertise and practical guidance were exceptional.",
      author: "Michael Rodriguez",
      role: "Head of Sustainable Finance",
      company: "Regional Development Bank",
      industry: "Development Banking",
      image: "/placeholder.svg?key=testimonial-leader2",
      rating: 5,
      impact: "Launched 5 new green finance products",
    },
    {
      quote:
        "Outstanding training delivery and content quality. ICCD's programs have become an integral part of our staff development initiatives, with measurable improvements in risk management capabilities.",
      author: "Dr. Amina Al-Rashid",
      role: "Director of Risk Management",
      company: "Middle East Banking Group",
      industry: "Regional Banking",
      image: "/placeholder.svg?key=testimonial-leader3",
      rating: 5,
      impact: "60% reduction in operational risk incidents",
    },
    {
      quote:
        "The leadership development program exceeded our expectations. Our senior management team gained valuable insights that directly translated into improved decision-making and strategic planning.",
      author: "James Thompson",
      role: "CEO",
      company: "Community Financial Services",
      industry: "Community Banking",
      image: "/placeholder.svg?key=testimonial-leader4",
      rating: 5,
      impact: "92% increase in leadership effectiveness scores",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Industry Leaders Speak</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Testimonials from senior executives and compliance professionals worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border-2 border-transparent hover:border-accent/20 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                  <Badge className="ml-3 bg-accent/10 text-accent border-accent/20">{testimonial.industry}</Badge>
                </div>

                {/* Quote */}
                <div className="relative mb-8">
                  <Quote className="h-8 w-8 text-accent/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6 text-lg">"{testimonial.quote}"</p>
                </div>

                {/* Impact */}
                <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="text-sm font-semibold text-accent mb-1">Measurable Impact</div>
                  <div className="text-primary font-semibold">{testimonial.impact}</div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-bold text-primary text-lg">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-accent font-semibold">{testimonial.company}</div>
                    </div>
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
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

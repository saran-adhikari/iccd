import { Card, CardContent } from "@/app-components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "ICCD's AML training program transformed our compliance framework. The practical approach and real-world case studies made all the difference.",
      author: "Maria Santos",
      role: "Chief Compliance Officer",
      company: "Global Banking Corp",
      rating: 5,
      image: "https://i.pinimg.com/736x/a9/67/27/a96727d343d319c458c757cef37a1379.jpg",
    },
    {
      quote:
        "The ESG training provided by ICCD helped us integrate sustainability into our core business strategy. Exceptional quality and expertise.",
      author: "David Kim",
      role: "Risk Management Director",
      company: "International Finance Ltd",
      rating: 5,
      image: "https://i.pinimg.com/736x/6c/c5/19/6cc519f013abcf2ad6168a126ee877db.jpg",
    },
    {
      quote:
        "Outstanding training delivery and content. ICCD's programs are now an integral part of our staff development initiatives.",
      author: "Dr. Fatim Al-Rashid",
      role: "Head of Learning & Development",
      company: "Middle East Banking Group",
      rating: 5,
      image: "https://i.pinimg.com/1200x/11/64/93/116493296260208f256202748cbbccc2.jpg",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-primary">What Our Partners Say</h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by compliance professionals and institutions worldwide
          </p> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border-2 border-transparent hover:border-accent/20 transition-colors duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-accent/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6">&quot;{testimonial.quote}&quot;</p>
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-contain mr-4"
                  />
                  <div>
                    <div className="font-semibold text-primary">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-accent">{testimonial.company}</div>
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

import { Card, CardContent } from "@/app-components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The customer service training for our team staff made a noticeable difference in our approach towards enhancing customer satisfaction. We learned how to communicate with empathy, handle challenging guests, and create memorable service experiences. ",
      rating: 5,
      
    },
    {
      quote:
        "ICCD’s approach was interactive and practical, exactly what frontline teams need.   ",
      rating: 5,
      
    },
    {
      quote:
        "This training has enhanced our internal reporting and decision-making. With evolving reporting standards, we would benefit greatly from regular advanced refreshers in the future.",
    
      rating: 5,
      
    },
    {
      quote:
        "ECL training simplified a complex topic, gave us much needed clarity regarding various things and gave us tools we could apply immediately. A must-have program for all credit and risk teams",
     
      rating: 5,
      
    },
    {
      quote:
        "The learning was impactful, and ongoing refresher programs would help sustain and build on this momentum.",
      
      rating: 5,
      
    },
    {
      quote:
        "Comprehensive session, more sessions should be organized which would be very helpful.",
      
      rating: 5,
     
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">What Our Partners Say</h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by compliance professionals and institutions worldwide
          </p> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background border-2 border-transparent transition-colors duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6">&quot;{testimonial.quote}&quot;</p>
                </div>

                {/* <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-contain mr-4"
                  />
                  <div>
                    <div className="font-semibold text-primary">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground/70">{testimonial.company}</div>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


import { Card, CardContent } from "@/app-components/ui/card"
import { Star, Quote } from "lucide-react"
interface Testimonial {
  id: string
  quote: string
  rating: number
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-6 leading-tight text-white">Participant Reviews</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

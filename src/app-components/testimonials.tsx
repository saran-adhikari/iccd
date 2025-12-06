"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app-components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  rating: number
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const getCardStyle = (index: number) => {
    // Calculate circular difference
    let diff = index - currentIndex
    if (diff > testimonials.length / 2) {
      diff -= testimonials.length
    } else if (diff < -testimonials.length / 2) {
      diff += testimonials.length
    }
    
    if (diff === 0) {
      // Center card - full scale and opacity
      return "scale-105 opacity-100 z-20 translate-x-0"
    } else if (diff === 1 || diff === -(testimonials.length - 1)) {
      // Right card
      return "scale-85 opacity-50 z-10 translate-x-[70%]"
    } else if (diff === -1 || diff === testimonials.length - 1) {
      // Left card
      return "scale-85 opacity-50 z-10 -translate-x-[70%]"
    } else {
      // Hidden cards
      return "scale-75 opacity-0 z-0"
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-6 leading-tight text-white">
            Participant Reviews
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full border border-secondary/20 bg-secondary/20 hover:bg-secondary/40 transition-colors z-30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <div className="relative w-full max-w-2xl h-80 flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute transition-all duration-500 ease-out w-full ${getCardStyle(index)}`}
                >
                  <Card className="bg-background border-2 rounded-2xl border-secondary/20 bg-gradient-to-br from-gray-900 to-gray-800 
                                border border-gray-700/50 transition-all duration-500 ">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                        ))}
                      </div>
                      <div className="relative mb-6">
                        <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground leading-relaxed italic pl-6">
                          &quot;{testimonial.quote}&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors z-30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-secondary" : "w-2 bg-secondary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
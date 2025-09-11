import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTAStrip() {
  return (
    <section className="py-20 w-[85%] mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-balance text-primary">
            Build Your Brand <br /> Customize Training Solutions
          </h2>
          <p className="text-xl mb-10 text-pretty max-w-3xl mx-auto text-muted-foreground">
            Partner with ICCD to develop tailored training programs that align with your
            institution&apos;s specific needs and regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary text-lg font-semibold px-8 py-6 text-white hover:bg-primary/90 cursor-pointer"
            >
              SCHEDULE CONSULTATION
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

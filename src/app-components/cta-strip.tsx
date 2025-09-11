import { Button } from "@/app-components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTAStrip() {
  return (
    <section className="py-16 bg-gradient-to-r from-accent to-accent/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-accent-foreground">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Build Your Brand <br/>Customize Training Solutions
          </h2>
          <p className="text-xl mb-8 text-accent-foreground/90 text-pretty max-w-2xl mx-auto">
            Partner with ICCD to develop tailored training programs that align with your institution&apos;s specific needs
            and regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-background text-black hover:bg-background/90 cursor-pointer">
              SCHEDULE CONSULTATION
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-accent-foreground text-primary-foreground hover:bg-accent-foreground hover:text-accent bg-transparent"
            >
              Download Brochure
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}

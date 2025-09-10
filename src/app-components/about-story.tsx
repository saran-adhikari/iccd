export function AboutStory() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2010, the International Centre for Compliance and Development (ICCD) emerged from a critical
                need to address the growing complexity of financial crimes and regulatory requirements in the global
                banking sector.
              </p>
              <p>
                What started as a small initiative to provide specialized AML training has evolved into a comprehensive
                institution offering world-class programs in compliance, risk management, ESG, and leadership
                development.
              </p>
              <p>
                Today, ICCD stands as a trusted partner to over 85 financial institutions across 15 countries, having
                trained more than 2,500 professionals who now lead compliance efforts in their respective organizations.
              </p>
              <p>
                Our commitment to excellence and innovation continues to drive us forward as we adapt to emerging
                challenges and regulatory changes in the financial services industry.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent"></div>

              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-foreground rounded-full"></div>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm font-semibold text-accent">2010</div>
                    <div className="text-lg font-semibold text-primary">Foundation</div>
                    <div className="text-muted-foreground">ICCD established with focus on AML training</div>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-foreground rounded-full"></div>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm font-semibold text-accent">2015</div>
                    <div className="text-lg font-semibold text-primary">Expansion</div>
                    <div className="text-muted-foreground">Added Risk Management and ESG programs</div>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-foreground rounded-full"></div>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm font-semibold text-accent">2020</div>
                    <div className="text-lg font-semibold text-primary">Digital Transformation</div>
                    <div className="text-muted-foreground">Launched online and hybrid training formats</div>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                  </div>
                  <div className="ml-6">
                    <div className="text-sm font-semibold text-primary">2024</div>
                    <div className="text-lg font-semibold text-primary">Global Leadership</div>
                    <div className="text-muted-foreground">Recognized as leading compliance training provider</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

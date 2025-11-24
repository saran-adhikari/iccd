'use client';

import Link from 'next/link';
import { Badge } from '@/app-components/ui/badge';

export default function HeroTrainMyTeam() {

  return (
    <section
      className="relative isolate max-w-7xl mx-auto rounded-4xl overflow-hidden my-12"
      aria-labelledby="hero-title"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/Images/Stocks/bg.png"
          alt=""
          className="h-full w-full object-cover object-left"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-primary/90 to-primary" /> */}
      </div>

      {/* Content */}
      <div className="relative px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left max-w-2xl">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 mb-3"
          >
            For HR leaders
          </Badge>

          <h1
            id="hero-title"
            className="text-3xl md:text-4xl font-bold leading-tight text-white mb-2"
          >
            Scale Training Across Your Institution
          </h1>

          <p className="text-primary-foreground/90 text-base md:text-lg max-w-xl">
            Unlock the full potential of your teams with a comprehensive
            learning program built for compliance, capability and culture.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/programs"
            className="group relative inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-secondary hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-primary"
          >
            Train My Team
          </Link>
        </div>
      </div>
    </section>

  );
}

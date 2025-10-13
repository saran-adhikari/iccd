'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/app-components/ui/badge';

export default function HeroTrainMyTeam() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    const onScroll = () => {
      const shift = window.scrollY * -0.25; // adjust speed
      node.style.transform = `translateY(${shift}px)`; // move the actual image
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
  className="relative isolate max-w-[80%] mx-auto rounded-3xl overflow-hidden p-2 bg-[url('/Images/Stocks/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed my-16"
  aria-labelledby="hero-title"
> 
  {/* Content */}
  <div className="mx-auto max-w-6xl px-6 sm:px-6">
    <div className="relative flex min-h-[30vh] items-start justify-start py-12 sm:py-6">
      <div className="relative z-10 text-start">
        <Badge
          variant="secondary"
          className="bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit py-0.5 px-4 text-2sm"
        >
          For HR leaders
        </Badge>

        <h1
          id="hero-title"
          className="text-4xl lg:text-5xl font-extrabold mb-2 leading-tight text-white"
        >
          Scale Training Across Your Institution
        </h1>

        <p className="mt-2 max-w-2xl text-pretty text-base text-white sm:text-lg">
          Unlock the full potential of your teams with a comprehensive
          learning program built for compliance, capability and culture.
        </p>

        <div className="mt-8 flex items-center justify-end">
          <Link
            href="/programs"
            className="group relative inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-40 bg-[radial-gradient(45%_60%_at_50%_50%,theme(colors.primary/40),transparent_70%)]" />
            Train My Team
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

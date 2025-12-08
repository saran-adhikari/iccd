'use client'

import { useEffect, useRef, useState } from 'react'
import { ProgramCard } from '@/app-components/program-card'
import type { Program } from '../lib/programs'
import { Button } from '@/app-components/ui/button'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedProgram({ programs }: { programs: Program[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [cardPx, setCardPx] = useState(0) // px width of one card
  const [pagePx, setPagePx] = useState(0) // px width of one page (3 cards)
  const [pageIndex, setPageIndex] = useState(0)
  const visibleCards = 3

  // Measure container and compute widths
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return

      const style = window.getComputedStyle(track)
      // read gap (may be like "24px")
      const gapStr = style.gap || style.columnGap || '0px'
      const gap = parseFloat(gapStr) || 0

      // Get available width inside track's parent (the visible viewport)
      // We will use the parent element that has overflow hidden (containerRef)
      const container = containerRef.current ?? track
      const containerWidth = container.clientWidth

      // total gap width between visibleCards: there are visibleCards-1 gaps
      const totalGaps = gap * (visibleCards - 1)

      // compute card width so that exactly 3 cards fit inside container (no overflow)
      const single = Math.floor((containerWidth - totalGaps) / visibleCards)

      // page width is exactly containerWidth (we scroll by full visible area)
      const page = single * visibleCards + totalGaps

      setCardPx(single)
      setPagePx(page)
      // adjust scroll position if needed (snap to nearest page)
      if (track) {
        const currentLeft = track.scrollLeft
        const nearestPage = Math.round(currentLeft / page)
        track.scrollTo({ left: nearestPage * page, behavior: 'auto' })
        setPageIndex(Math.max(0, Math.min(nearestPage, Math.ceil(programs.length / visibleCards) - 1)))
      }
    }

    measure()

    // Use ResizeObserver for robust resizing
    let ro: ResizeObserver | undefined
    try {
      ro = new ResizeObserver(measure)
      if (containerRef.current) ro.observe(containerRef.current)
      if (trackRef.current) ro.observe(trackRef.current)
    } catch (e) {
      // fallback
      window.addEventListener('resize', measure)
    }

    return () => {
      if (ro) {
        if (containerRef.current) ro.unobserve(containerRef.current)
        if (trackRef.current) ro.unobserve(trackRef.current)
      } else {
        window.removeEventListener('resize', measure)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programs.length])

  const pagesCount = Math.max(1, Math.ceil(programs.length / visibleCards))

  const goToPage = (p: number) => {
    const track = trackRef.current
    if (!track) return
    const newPage = (p + pagesCount) % pagesCount
    setPageIndex(newPage)
    track.scrollTo({ left: newPage * pagePx, behavior: 'smooth' })
  }

  const next = () => {
    goToPage(pageIndex + 1)
  }

  const prev = () => {
    goToPage(pageIndex - 1)
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-[80%] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Our <span className="text-white"> Featured Programs</span>
          </h2>

          <Button
            asChild
            size="lg"
            className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-semibold px-8"
          >
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Slider viewport (overflow hidden) */}
        <div
          ref={containerRef}
          className="py-10 overflow-hidden"
          style={{ width: '100%' }}
        >
          {/* Track: the scrolling element */}
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 overflow-x-auto scroll-smooth touch-pan-x"
            style={{
              // hide native scrollbar visually but keep scroll capability
              scrollbarWidth: 'none' /* firefox */,
              msOverflowStyle: 'none' /* IE 10+ */,
              scrollSnapType: 'x mandatory',
            }}
            // optional: pointer events for dragging if you want (kept default)
          >
            {/* hide scrollbar for webkit browsers */}
            <style>{`
              /* hide scrollbar for webkit */
              .track-hide-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            {programs.map((program, idx) => {
              // ensure width for each card is exact px measured
              // when programs.length < visibleCards, make each fill proportionally
              const effectiveVisible = Math.min(visibleCards, programs.length)
              const widthPx = effectiveVisible < visibleCards
                ? Math.floor((pagePx - (6 * (effectiveVisible - 1))) / effectiveVisible)
                : cardPx

              return (
                <div
                  key={program.id}
                  className="track-hide-scroll"
                  style={{
                    flex: `0 0 ${widthPx}px`,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <ProgramCard program={program} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            className="bg-secondary/20 hover:bg-secondary/40 p-3 rounded-full"
            aria-label="Previous programs"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex gap-2 items-center">
            {/* page indicators */}
            {Array.from({ length: pagesCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full ${i === pageIndex ? 'bg-secondary' : 'bg-white/30'}`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="bg-secondary/20 hover:bg-secondary/40 p-3 rounded-full"
            aria-label="Next programs"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
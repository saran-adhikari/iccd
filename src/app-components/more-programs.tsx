'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/app-components/ui/card'
import { Badge } from '@/app-components/ui/badge'
import { Button } from '@/app-components/ui/button'
import { type Program } from '@/lib/programs'
import { useRef, useState, useEffect } from 'react'

interface MoreProgramsProps {
    currentSlug: string
    programs: Program[]
}

export function MorePrograms({ currentSlug, programs }: MoreProgramsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    // Filter out the current program
    const otherPrograms = programs.filter((p) => p.slug !== currentSlug)

    // Check scroll position to enable/disable buttons
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        checkScroll()
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', checkScroll)
            window.addEventListener('resize', checkScroll)
            return () => {
                container.removeEventListener('scroll', checkScroll)
                window.removeEventListener('resize', checkScroll)
            }
        }
    }, [otherPrograms])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            })
        }
    }

    if (otherPrograms.length === 0) return null

    return (
        <section className="w-[90%] mx-auto py-24 border-t border-border/40 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left justify-between mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
                            Explore More Programs
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Continue your professional development with our other specialized training programs designed for banking excellence.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 shrink-0">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="w-12 h-12 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center hover:bg-gradient-to-br from-secondary/80 to-secondary transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-secondary/20"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="w-12 h-12 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center hover:bg-gradient-to-br from-secondary/80 to-secondary transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-secondary/20"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {/* Horizontal Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto pb-12 -mx-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar pt-4"
                    >
                        {otherPrograms.map((program, index) => (
                            <motion.div
                                key={program.id}
                                className="min-w-[320px] md:min-w-[380px] snap-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            >
                                <Link href={`/programs/${program.slug}`} className="block h-full">
                                    <Card className="group relative h-[450px] flex flex-col overflow-hidden border-none bg-slate-900 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-3xl">
                                        {/* Full Background Image */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={program.images.cover}
                                                alt={program.title}
                                                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-300" />
                                        </div>

                                        {/* Content Overlay */}
                                        <CardContent className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
                                            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <Badge className="bg-secondary/20 hover:bg-white/30 text-white backdrop-blur-md border-none">
                                                        {program.level}
                                                    </Badge>
                                                    <Badge variant="secondary" className="bg-primary/80 hover:bg-primary text-white border-none">
                                                        {program.category}
                                                    </Badge>
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                                                    {program.title}
                                                </h3>

                                                <p className="text-gray-200 text-sm leading-relaxed line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                                                    {program.summary}
                                                </p>

                                                <div className="flex items-center text-primary-foreground font-semibold text-sm mt-2">
                                                    Explore Program
                                                    <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    )
}

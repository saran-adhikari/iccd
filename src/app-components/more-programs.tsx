'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/app-components/ui/card'
import { Badge } from '@/app-components/ui/badge'
import { Button } from '@/app-components/ui/button'
import { programData } from '@/lib/programs'

interface MoreProgramsProps {
    currentSlug: string
}

export function MorePrograms({ currentSlug }: MoreProgramsProps) {
    // Filter out the current program
    const otherPrograms = programData.filter((p) => p.slug !== currentSlug)

    if (otherPrograms.length === 0) return null

    return (
        <section className="w-[90%] mx-auto py-24 border-t border-border/40 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="flex flex-col items-center text-center justify-center mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
                            Explore More Programs
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Continue your professional development with our other specialized training programs designed for banking excellence.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto pb-12 -mx-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar pt-4">
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

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Program } from "@/lib/programs"

interface ProgramCardProps {
    program: Program
    index?: number
}

export function ProgramCard({ program, index = 0 }: ProgramCardProps) {
    return (
        <Link href={`/programs?id=${program.slug}`} className="block h-full">
            <Card className="group relative h-[500px] flex flex-col overflow-hidden border-none bg-slate-900 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-3xl">
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
                            <Badge className="bg-secondary/20 hover:bg-white/30 text-white backdrop-blur-md border-none rounded-full">
                                {program.level}
                            </Badge>
                            <Badge variant="secondary" className="bg-primary/80 hover:bg-primary text-white border-none rounded-full">
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
    )
}

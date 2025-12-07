'use client'

import { useMemo, useRef, useState, type ComponentType, type SVGProps, type KeyboardEvent, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/app-components/ui/button'
import { Badge } from '@/app-components/ui/badge'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Leaf,
    ShieldCheck,
    BarChart3,
    GraduationCap,
    Globe2,
    Building2,
    Handshake,
    ArrowRight,
    Clock,
    Users,
    MapPin,
    Award,
    BookOpen,
    CheckCircle,
} from 'lucide-react'
import type { Program } from '../lib/programs'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app-components/ui/card"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

function iconForProgram(category: string, i: number): IconType {
    const byCategory: Record<string, IconType> = {
        'ESG & Sustainability': Leaf,
        'Risk & Compliance': ShieldCheck,
        'Fraud & Forensics': BarChart3,
        'Service Excellence': Handshake,
        Global: Globe2,
        'Risk & Finance': Building2,
    }
    const fallbacks: IconType[] = [Leaf, ShieldCheck, BarChart3, GraduationCap, Globe2, Building2]
    return byCategory[category] ?? fallbacks[i % fallbacks.length]
}

// Helper to map Program to View Model
interface ProgramView {
    title: string
    description: string
    category: string
    duration: string
    format: string
    certification?: string
    maxParticipants: number
    level: string
    price: string
    nextSession: string
    image: string
    learningOutcomes: string[]
    whoShouldAttend: string[]
    longDescription: string
    keyPoints: string[]
}

function toProgramView(program: Program): ProgramView {
    return {
        title: program.title,
        description: program.summary,
        category: program.category,
        duration: program.durationDays ? `${program.durationDays} Days` : "",
        format: program.format,
        certification: program.certification || undefined,
        maxParticipants: program.maxParticipants,
        level: program.level,
        price: "Request a quote",
        nextSession: "", // Not in schema currently
        image: program.images.cover,
        learningOutcomes: program.learningOutcomes ?? [],
        whoShouldAttend: program.audience ?? [],
        longDescription: program.longDescription || program.summary,
        keyPoints: program.keyPoints ?? []
    }
}

export function ProgramsExplorer({ programs }: { programs: Program[] }) {
    const [index, _setIndex] = useState(0)
    const prevIndexRef = useRef(0)
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialSlug = searchParams.get('id')

    // Effect to handle initial selection from URL
    useEffect(() => {
        if (initialSlug && programs.length > 0) {
            const foundIndex = programs.findIndex(p => p.slug === initialSlug)
            if (foundIndex !== -1 && foundIndex !== index) {
                _setIndex(foundIndex)
                prevIndexRef.current = foundIndex
            }
        }
    }, [initialSlug, programs, index])

    const setIndex = (nextIdx: number) => {
        prevIndexRef.current = nextIdx
        _setIndex(nextIdx)
        const p = programs[nextIdx]
        router.replace(`/programs?id=${p.slug}`, { scroll: false })
    }

    const current = programs[index]
    const view = current ? toProgramView(current) : null

    if (!current || !view) return null

    return (
        <div className="w-full min-h-screen bg-background flex flex-col">

            {/* NAVIGATION HEADER - Compact Split Layout */}
            {/* NAVIGATION HEADER – COMPACT WITH RIGHT-SIDE PROGRAM LIST */}
<section className="border-b border-secondary/20 py-6 px-6 relative overflow-hidden">
    
    {/* Soft background accents */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

        {/* LEFT — Title + intro (smaller & cleaner) */}
        <div className="space-y-2">
            <h1 className="text-2xl lg:text-4xl text-white tracking-tight">
                Our <span className="text-white">Programs</span>
            </h1>
            
        </div>

        {/* RIGHT — Program list pushed completely to the right side */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3 items-end">

            {programs.map((p, i) => {
                const active = i === index
                return (
                    <button
                        key={p.id}
                        onClick={() => setIndex(i)}
                        className={`group flex items-center gap-2 w-fit transition-all
                            ${active ? 'opacity-100 translate-x-1' : 'opacity-60 hover:opacity-90'}
                        `}
                    >
                        <span className={`text-right text-sm lg:text-base font-medium 
                            ${active ? 'text-white' : 'text-slate-300'}
                        `}>
                            {p.title}
                        </span>

                        {active && (
                            <motion.div
                                layoutId="active-nav-dot"
                                className="h-1.5 w-1.5 rounded-full bg-secondary"
                            />
                        )}
                    </button>
                )
            })}

        </div>
    </div>
</section>


            {/* MAIN CONTENT - Detail View (Restored to Original Design) */}
            <div className="flex-1 bg-background relative pb-20">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-full"
                    >
                        {/* Original Hero Design */}
                        <div className="relative w-full h-[300px] lg:h-[300px]">
                            <div className="absolute inset-0">
                                <img src={view.image} alt={view.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 lg:p-4">
                                <div className="w-[90%] mx-auto">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <Badge className="bg-secondary text-white hover:bg-secondary/90 rounded-full border-none">
                                            {view.category}
                                        </Badge>
                                        <Badge variant="outline" className={`bg-black/20 text-white rounded-full border-white/20 backdrop-blur-sm`}>
                                            {view.level}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        {view.title}
                                    </h1>
                                    <p className="text-lg text-slate-200 max-w-3xl line-clamp-2">
                                        {view.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="max-w-[90%] mx-auto px-6 lg:px-4 py-8">
                            {/* Quick Stats Grid (Restored) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                                            <Clock className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Duration</div>
                                            <div className="font-semibold text-white">{view.duration || 'Flexible'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                                            <Users className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Max Participants</div>
                                            <div className="font-semibold text-white">{view.maxParticipants} Max</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                                            <MapPin className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Format</div>
                                            <div className="font-semibold text-white">{view.format}</div>
                                        </div>
                                    </div>
                                </div>
                                {view.certification && (
                                    <div className="space-y-1">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                                                <Award className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 mb-0.5">Certification</div>
                                                <div className="font-semibold text-white truncate" title={view.certification}>{view.certification}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Long Description */}
                                    <Card className="bg-slate-900/50 border-white/10 rounded-2xl">
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <BookOpen className="h-6 w-6 text-primary" />
                                                <CardTitle className="text-xl text-primary">Program Overview</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                                {view.longDescription}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Key Points (fallback if no outcomes) */}
                                    {view.keyPoints.length > 0 && view.learningOutcomes.length === 0 && (
                                        <Card className="bg-slate-900/50 border-white/10 rounded-2xl">
                                            <CardHeader>
                                                <CardTitle className="text-xl text-primary">Key Highlights</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {view.keyPoints.map((pt, k) => (
                                                        <li key={k} className="flex gap-3 text-slate-300">
                                                            <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                                                            <span>{pt}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* Side Widgets */}
                                <div className="space-y-6">
                                    {/* Who Should Attend */}
                                    {view.whoShouldAttend.length > 0 && (
                                        <Card className="bg-slate-900/50 border-white/10 rounded-2xl">
                                            <CardHeader>
                                                <CardTitle className="text-lg text-primary">Who Should Attend</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2">
                                                    {view.whoShouldAttend.map((role, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                                            <span>{role}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Learning Outcomes */}
                                    {view.learningOutcomes.length > 0 && (
                                        <Card className="bg-slate-900/50 border-white/10 rounded-2xl">
                                            <CardHeader>
                                                <CardTitle className="text-lg text-primary">Learning Outcomes</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {view.learningOutcomes.map((outcome, index) => (
                                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                                                            <span>{outcome}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

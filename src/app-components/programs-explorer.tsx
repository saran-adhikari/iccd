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
    ChevronDown,
} from 'lucide-react'
import type { Program } from '../lib/programs'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app-components/ui/card"
import { CTAStrip } from './cta-strip'

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
    const detailViewRef = useRef<HTMLDivElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    // Scroll listener for sticky nav styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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

        // UX Improvement: Scroll to top of content if below fold
        if (detailViewRef.current) {
            const yOffset = -80;
            const element = detailViewRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            if (window.scrollY > 400) {
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }

    const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            setIndex((index + 1) % programs.length)
        }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            setIndex((index - 1 + programs.length) % programs.length)
        }
    }

    const current = programs[index]
    const view = current ? toProgramView(current) : null

    if (!current || !view) return null

    return (
        <>
            <div className="w-full min-h-screen bg-background flex flex-col pt-32 lg:pt-0">

                {/* HEADER SECTION (Refined Sizing + Sticky Nav) */}
                <section className="relative px-6 z-40">
                    {/* Background lines */}
                    <div className="absolute bottom-0 left-0 w-full h-px lg:top-auto lg:bottom-10" />

                    <div className="max-w-[90%] mx-auto w-full flex flex-col lg:flex-row justify-between items-start gap-8 py-10 lg:pt-32 lg:pb-24">

                        {/* LEFT — Title (Refined size: 5xl) */}
                        <div className="space-y-4 lg:max-w-lg">
                            <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                                Our <span className="text-white">Programs</span>
                            </h1>
                        </div>

                        {/* RIGHT — Sticky/Fixed Navigation (Refined Sizes: text-base) */}
                        <div
                            className={`
                            flex flex-col items-end space-y-2 w-full lg:w-auto
                            lg:fixed lg:top-0 lg:right-0 lg:h-auto lg:p-8 lg:z-50
                            transition-all duration-300
                            ${isScrolled
                                    ? 'lg:bg-slate-900/95 lg:backdrop-blur-md lg:border-l lg:border-b lg:border-white/10 lg:pl-10 lg:rounded-bl-[2.5rem] lg:shadow-2xl lg:translate-x-0'
                                    : 'lg:bg-transparent lg:border-transparent lg:pl-0 lg:pt-28'
                                }
                        `}
                            role="tablist"
                            tabIndex={0}
                            onKeyDown={onRailKey}
                        >

                            {programs.map((p, i) => {
                                const active = i === index
                                return (
                                    <button
                                        key={p.id}
                                        role="tab"
                                        aria-selected={active}
                                        onClick={() => setIndex(i)}
                                        // Adjusted padding and font size
                                        className={`group relative flex items-center justify-end gap-3 w-fit transition-all outline-none py-1
                                        ${active ? 'opacity-100' : 'opacity-60 hover:opacity-90'}
                                    `}
                                    >
                                        <span className={`text-right text-sm lg:text-base font-medium transition-colors duration-300
                                        ${active ? 'text-white' : 'text-slate-300'}
                                    `}>
                                            {p.title}
                                        </span>

                                        {/* Active Pill Indicator */}
                                        <div className="relative flex items-center justify-center w-4 h-4">
                                            {active && (
                                                <motion.div
                                                    layoutId="active-indicator"
                                                    className="absolute inset-0 bg-secondary rounded-full"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            {active && <div className="absolute w-1.5 h-1.5 bg-white rounded-full z-10" />}
                                        </div>
                                    </button>
                                )
                            })}

                        </div>
                    </div>
                </section>


                {/* MAIN CONTENT - Detail View */}
                <div className="flex-1 bg-background relative pb-20 mt-8" ref={detailViewRef}>
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
                                {/* Quick Stats Grid */}
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
            <CTAStrip />
        </>
    )
}

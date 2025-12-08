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
    Menu,
    X,
    Bookmark,
    Wallet,
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
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    // Scroll listener for sticky nav styling
    useEffect(() => {
        const handleScroll = () => {
            // Collapse nav if user scrolls down and it was open? optional.
            // For now just toggle layout mode.
            setIsScrolled(window.scrollY > 150)
            if (window.scrollY <= 150) setIsNavExpanded(false)
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

        // Auto-close overlay if open
        setIsNavExpanded(false)
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
            <div className="w-full min-h-screen bg-secondary/5 flex flex-col">

                {/* HEADER SECTION */}
                <section className="relative px-4 z-40">
                    {/* Background lines */}
                    <div className="absolute bottom-0 left-0 w-full h-px lg:top-auto lg:bottom-10" />

                    <div className="max-w-[90%] mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-8 py-10">

                        {/* LEFT — Title */}
                        <div className="space-y-4  flex items-center">
                            <h1 className="text-3xl lg:text-5xl text-white tracking-tight leading-tight">
                                Our <span className="text-white">Programs</span>
                            </h1>
                        </div>

                        {/* RIGHT — Adaptive Navigation */}
                        <div className="w-full lg:w-auto flex flex-col items-end">

                            {/* 
                            STATE 1: Full List (Not Scrolled) 
                            Only visible when NOT scrolled. Fade out when scrolled.
                        */}
                            <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none hidden lg:block' : 'opacity-100'} hidden lg:block`}>
                                <div className="flex flex-col items-end space-y-2">
                                    {programs.map((p, i) => {
                                        const active = i === index
                                        return (
                                            <button
                                                key={p.id}
                                                onClick={() => setIndex(i)}
                                                className={`group relative flex items-center justify-end gap-3 w-fit transition-all outline-none py-1
                                                ${active ? 'opacity-100' : 'opacity-60 hover:opacity-90'}
                                            `}
                                            >
                                                <span className={`text-right text-base font-medium transition-colors duration-300 ${active ? 'text-white' : 'text-slate-300'}`}>
                                                    {p.title}
                                                </span>
                                                <div className="relative flex items-center justify-center w-4 h-4">
                                                    {active && (
                                                        <motion.div
                                                            layoutId="active-indicator-static"
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

                            {/* 
                            STATE 2: Bookmark/Toggle Bar (Scrolled)
                            Fixed to top right when scrolled.
                       */}
                            <AnimatePresence>
                                {isScrolled && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="fixed top-6 right-6 lg:right-12 z-50 flex items-center gap-4"
                                    >
                                        {/* Current Program Label (Optional context) */}
                                        {!isNavExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="hidden lg:block px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur border border-white/10 text-sm text-slate-300"
                                            >
                                                <span className="text-secondary mr-2">Viewing:</span> {current.title}
                                            </motion.div>
                                        )}

                                        {/* Bookmark Toggle Button */}
                                        <button
                                            onClick={() => setIsNavExpanded(!isNavExpanded)}
                                            className="h-12 w-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                                        >
                                            {isNavExpanded ? <X className="w-5 h-5" /> : <div className="flex flex-col items-center gap-0.5"><Wallet className="w-5 h-5" /></div>}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 
                            STATE 3: Expanded Overlay List (When Toggled)
                            This mimics the "original" sticky list but displayed on demand.
                        */}
                            <AnimatePresence>
                                {isScrolled && isNavExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                        className="fixed top-24 right-6 lg:right-12 z-40 max-h-[80vh] overflow-y-auto"
                                    >
                                        <div
                                            className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col items-end space-y-2 min-w-[250px]"
                                            role="tablist"
                                            tabIndex={0}
                                            onKeyDown={onRailKey}
                                        >
                                            <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 w-full text-right border-b border-white/5 pb-2">Select Program</div>
                                            {programs.map((p, i) => {
                                                const active = i === index
                                                return (
                                                    <button
                                                        key={p.id}
                                                        role="tab"
                                                        aria-selected={active}
                                                        onClick={() => setIndex(i)}
                                                        className={`group relative flex items-center justify-end gap-3 w-full transition-all outline-none py-2 px-2 rounded-lg
                                                        ${active ? 'bg-white/5' : 'hover:bg-white/5'}
                                                    `}
                                                    >
                                                        <span className={`text-right text-sm lg:text-base font-medium transition-colors duration-300
                                                        ${active ? 'text-white' : 'text-slate-300'}
                                                    `}>
                                                            {p.title}
                                                        </span>

                                                        {/* Active Pill Indicator */}
                                                        <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                                                            {active && (
                                                                <motion.div
                                                                    layoutId="active-indicator-overlay"
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
                                    </motion.div>
                                )}
                            </AnimatePresence>

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

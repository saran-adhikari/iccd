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

    const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((index + 1) % programs.length) }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((index - 1 + programs.length) % programs.length) }
    }

    const current = programs[index]
    const view = current ? toProgramView(current) : null

    const formatColors = {
        "In-Person": "bg-primary/10 text-primary border-primary/20",
        Online: "bg-accent/10 text-accent border-accent/20",
        Blended: "bg-orange-100 text-secondary border-secondary/20",
    }

    if (!current || !view) return null

    return (
        <div className="w-full flex flex-col md:flex-row min-h-screen bg-background">

            {/* LEFT SIDEBAR - List - Sticky on Desktop */}
            <div
                className="w-full md:w-[320px] lg:w-[380px] shrink-0 border-r border-white/10 bg-slate-900/50 flex flex-col md:sticky md:top-20 md:h-[calc(100vh-5rem)]"
            >
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">All Programs</h2>
                    <p className="text-sm text-slate-400 mt-1">Select a program to view details</p>
                </div>

                <div
                    className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar"
                    role="tablist"
                    onKeyDown={onRailKey}
                    tabIndex={0}
                >
                    {programs.map((p, i) => {
                        const Icon = iconForProgram(p.category, i)
                        const active = i === index
                        return (
                            <button
                                key={p.id}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setIndex(i)}
                                className={`w-full text-left transition-all duration-200 rounded-xl p-3 group border border-transparent ${active
                                        ? 'bg-secondary/10 border-secondary/20'
                                        : 'hover:bg-white/5 hover:border-white/5'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${active ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white'
                                        }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold text-sm leading-snug mb-1 ${active ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                            {p.title}
                                        </h3>
                                        <Badge variant="outline" className={`text-[10px] h-5 px-1.5 ${active ? 'text-secondary border-secondary/30' : 'text-slate-500 border-slate-700'
                                            }`}>
                                            {p.category}
                                        </Badge>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* RIGHT PANEL - Detail View - Grows with content */}
            <div className="flex-1 bg-background relative">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="min-h-full pb-20"
                    >
                        {/* Hero Section embedded */}
                        <div className="relative w-full h-[300px] lg:h-[400px]">
                            <div className="absolute inset-0">
                                <img src={view.image} alt={view.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                                <div className="max-w-4xl">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <Badge className="bg-secondary text-white hover:bg-secondary/90 border-none">
                                            {view.category}
                                        </Badge>
                                        <Badge variant="outline" className={`bg-black/20 text-white border-white/20 backdrop-blur-sm`}>
                                            {view.level}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        {view.title}
                                    </h1>
                                    <p className="text-lg text-slate-200 max-w-2xl line-clamp-2">
                                        {view.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="px-6 py-8 lg:px-12 lg:py-12 max-w-6xl">

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Duration</div>
                                            <div className="font-semibold text-white">{view.duration || 'Flexible'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Max Participants</div>
                                            <div className="font-semibold text-white">{view.maxParticipants}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-0.5">Format</div>
                                            <div className="font-semibold text-white">{view.format}</div>
                                        </div>
                                    </div>
                                </div>
                                {view.certification ? (
                                    <div className="space-y-1">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                                <Award className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 mb-0.5">Certification</div>
                                                <div className="font-semibold text-white truncate" title={view.certification}>{view.certification}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1 hidden md:block" />
                                )}
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Long Description */}
                                    <Card className="bg-slate-900/50 border-white/10">
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
                                        <Card className="bg-slate-900/50 border-white/10">
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
                                        <Card className="bg-slate-900/50 border-white/10">
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
                                        <Card className="bg-slate-900/50 border-white/10">
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

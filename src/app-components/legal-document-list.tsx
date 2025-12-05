'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LegalDocument {
    id: string

    title: string
    titleNe?: string | null
    slug: string
    fileUrl: string
    type: string
}

export function LegalDocumentList({ initialDocs }: { initialDocs: LegalDocument[] }) {
    const [filter, setFilter] = useState('All')

    // Extract unique types and sort them
    const types = ['All', ...Array.from(new Set(initialDocs.map(doc => doc.type))).sort()]

    const filteredDocs = filter === 'All'
        ? initialDocs
        : initialDocs.filter(doc => doc.type === filter)

    return (
        <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-left gap-2">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={cn(
                            "px-4 py-2 rounded-none text-sm font-medium transition-all duration-300",
                            filter === type
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                : "bg-none border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer hover:scale-105"
                        )}
                    >
                        {type === 'All' ? 'All Documents' : type}
                    </button>
                ))}
            </div>

            {/* Document Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc, index) => {

                    // Clean and extract filename only
                    const fileName =
                        doc.fileUrl
                            .split('/').pop()        // get last part
                            ?.split('?')[0]          // remove query params
                            .split('#')[0]           // remove hash params
                            .replace(/\.[^/.]+$/, "") // remove extension
                            .replace(/-\d+(?:-\d+)*$/, "") // remove version number
                        || "Document"

                    return (
                        <Link key={doc.id} href={`/legal/${doc.slug}`} className="block">
                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-primary/50 transition-all duration-500 group overflow-hidden cursor-pointer h-full">

                                {/* Animated background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[3rem] transition-all duration-500 group-hover:w-24 group-hover:h-24" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <FileText className="w-7 h-7 text-white" />
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full mt-[-10px]">
                                                {doc.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Cleaned Filename - Hidden or Simplified */}
                                    {/* <p className="text-lg text-gray-400 leading-relaxed font-bold truncate">
                                        {fileName}
                                    </p> */}

                                    {/* Title */}
                                    <h2 className="text-lg font-bold mb-1 text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                                        {doc.titleNe || doc.title}
                                    </h2>
                                    {doc.titleNe && (
                                        <p className="text-sm text-gray-400 font-light">
                                            {doc.title}
                                        </p>
                                    )}
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>
                    )
                })}

                {filteredDocs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No documents found for this category.
                    </div>
                )}
            </div>
        </div>
    )
}

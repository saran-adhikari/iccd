"use client"

import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-primary border-secondary/40 text-white-foreground p-3 rounded-full shadow-lg hover:bg-secondary hover:border-secondary transition-colors duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Back to top"
            >
                <ArrowUp className="h-6 w-6" />
            </button>
        </div>
    )
}

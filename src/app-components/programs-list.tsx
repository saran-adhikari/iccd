"use client"

import { motion } from "framer-motion"
import { ProgramCard } from "@/app-components/program-card"
import type { Program } from "@/lib/programs"

export function ProgramsList({ programs }: { programs: Program[] }) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
                <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                    <ProgramCard program={program} index={i} />
                </motion.div>
            ))}
        </div>
    )
}

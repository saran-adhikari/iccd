"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BriefcaseBusiness, Cog, UserRound, HandHeart, ChevronDown } from "lucide-react"
import clsx from "clsx"

type WhyItem = {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const items: WhyItem[] = [
  { title: "Experienced Industry Leaders", description: "Over two decades of commitment to AML/CFT education and awareness", icon: BriefcaseBusiness },
  { title: "Industry Expert", description: "Over two decades of commitment to AML/CFT education and awareness", icon: Cog },
  { title: "Personalized Service", description: "Over two decades of commitment to AML/CFT education and awareness", icon: UserRound },
  { title: "Rapid Value Creation", description: "Over two decades of commitment to AML/CFT education and awareness", icon: HandHeart },
]

export default function WhyICCD_Toggle() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.section
      className="relative overflow-hidden "
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-100px,theme(colors.primary/10),transparent_60%)]" />
        <div className="absolute -inset-x-10 -bottom-10 h-44 bg-gradient-to-t from-muted/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-4">
        {/* Title on top */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-black">
            Why <span className="text-primary">ICCD</span> ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tap each heading to show or hide the description instantly.
          </p>
        </div>

        {/* Grid: two per row on sm+ */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.06 }}
            >
              <AccordionCard
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function AccordionCard({
  item,
  isOpen,
  onToggle,
}: {
  item: WhyItem
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = item.icon
  return (
    <div
      className={clsx(
        "group relative rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm",
        "shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
      )}
    >
      {/* header */}
      <button
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-xl ring-1 ring-border/70 bg-muted/40 p-3">
            <Icon className="h-6 w-6" />
          </span>
          <span className="text-lg font-semibold">{item.title}</span>
        </span>
        <ChevronDown className={clsx("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {/* content — instant show/hide (no variants, no motion) */}
      {isOpen && (
        <div className="overflow-hidden px-6 pb-6">
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      )}
    </div>
  )
}

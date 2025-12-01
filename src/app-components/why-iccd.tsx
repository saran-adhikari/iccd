"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BriefcaseBusiness, Cog, UserRound, HandHeart, ChevronDown } from "lucide-react"
import clsx from "clsx"

type WhyItem = {
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const items: WhyItem[] = [
  {
    title: "Experienced Industry Leaders",
    description: "Our team has members with over 10 years of experience in Training Nepal's BFI's",
    icon: BriefcaseBusiness
  },
  {
    title: "Industry Expert",
    description: "Our experts combine academic knowledge with real-world experience across the banking industry. This ensures our programs are practical, relevant, and adaptable to today's compliance challenges. By anticipating trends, we empower professionals to stay ahead of complex regulatory requirements.",
    icon: Cog
  },
  {
    title: "Personalized Service",
    description: "Every organization is unique, and so are its compliance needs. We work closely with clients to create tailored solutions that match their goals and challenges.",
    icon: UserRound
  },
  {
    title: "Rapid Value Creation",
    description: "Our approach delivers quick, measurable results. Using case studies, interactive learning, and proven frameworks, we are committed to create value for your organization. From better decision-making to stronger risk management, we focus on impact that lasts.",
    icon: HandHeart
  },
]

export default function WhyICCD_Toggle() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.section
      className="relative overflow-hidden py-15"
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-4">
        {/* Title on top */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">
            Why <span className="text-white">ICCD</span>
          </h2>

        </div>

        {/* Grid */}
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
         
          <span className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Icon className="h-6 w-6 text-white" />
          </span>
          <span className="text-lg font-semibold">{item.title}</span>
        </span>
        <ChevronDown className={clsx("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {/* content — smoother toggle via height: auto */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-6"
          >
            <p className="text-sm text-muted-foreground pb-6">{item.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
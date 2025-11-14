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
    description: "ICCD is a trusted authority in AML/CFT education and awareness. Our leadership has guided institutions and regulators with proven strategies that blend expertise and innovation. We not only deliver training but also help shape ethical and sustainable compliance standards.", 
    icon: BriefcaseBusiness 
  },
  { 
    title: "Industry Expert", 
    description: "Our experts combine academic knowledge with real-world experience across industries such as banking and fintech. This ensures our programs are practical, relevant, and adaptable to today's compliance challenges. By anticipating trends, we empower professionals to stay ahead of complex regulatory requirements.", 
    icon: Cog 
  },
  { 
    title: "Personalized Service", 
    description: "Every organization is unique, and so are its compliance needs. We work closely with clients to create tailored solutions that match their goals and challenges. From one-on-one mentoring to customized training, we ensure measurable value for both individuals and organizations.", 
    icon: UserRound 
  },
  { 
    title: "Rapid Value Creation", 
    description: "Our approach delivers quick, measurable results. Using case studies, interactive learning, and proven frameworks, organizations can see cultural and operational improvements within weeks. From better decision-making to stronger risk management, we focus on impact that lasts.", 
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
            Why <span className="text-primary">ICCD</span> 
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
          <span className="inline-flex items-center justify-center rounded-xl ring-1 ring-border/70 bg-muted/40 p-3">
            <Icon className="h-6 w-6" />
          </span>
          <span className="text-lg font-semibold">{item.title}</span>
        </span>
        <ChevronDown className={clsx("h-5 w-5 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {/* content — smoother toggle via max-height */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 500, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden px-6 pb-6"
          >
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
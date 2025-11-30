"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Award, Users, Lightbulb, Heart } from "lucide-react"

const values = [
    {
        icon: ShieldCheck,
        title: "Integrity",
        description: "Ethical and transparent conduct in all our programs and partnerships."
    },
    {
        icon: Award,
        title: "Excellence",
        description: "Consistently delivering high-quality, impactful learning experiences."
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working closely with industry experts, local and international institutions, and learners."
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Adopting new tools, technologies, and training methodologies."
    },
    {
        icon: Heart,
        title: "Inclusion",
        description: "Making professional development accessible to individuals at all levels of the financial industry."
    }
]

const MoreAboutUs = () => {
    return (
        <section className="w-[80%] mx-auto py-20 lg:px-0 bg-background text-foreground overflow-hidden">
            <div className="grid lg:grid-cols-1 gap-16 items-start">
                {/* Left side - About Us content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-center">
                            Beyond Training
                        </h2>
                        {/* <div className="h-1 w-20 bg-primary rounded-full mb-6" /> */}
                    </div>

                    <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-5xl mx-auto">
                        In a financial landscape shaped by rapid technological change, global competition,
                        and evolving regulations, we exist to equip professionals with practical skills
                        and up-to-date knowledge. Our programs are designed to prepare individuals to
                        perform confidently and contribute to a stronger, more resilient financial ecosystem.
                    </p>
                </motion.div>

                {/* Right side - Our Values */}
                <div className="space-y-4">
                    {/* First row - 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                        {values.slice(0, 2).map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-secondary/50 transition-all duration-500 group overflow-hidden"
                            >
                                {/* Animated background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-[3rem] transition-all duration-500 group-hover:w-24 group-hover:h-24" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-secondary/50 group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Second row - 3 columns */}
                    <div className="grid grid-cols-3 gap-4">
                        {values.slice(2).map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index + 2) * 0.1 }}
                                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-secondary/50 transition-all duration-500 group overflow-hidden"
                            >
                                {/* Animated background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/10 rounded-bl-[3rem] transition-all duration-500 group-hover:w-24 group-hover:h-24" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                                            {String(index + 3).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-secondary transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-secondary/50 group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoreAboutUs

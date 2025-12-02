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

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-center">
                        Beyond Training
                    </h2>

                    <p className="text-lg text-center text-muted-foreground leading-relaxed max-w-5xl mx-auto">
                        In a financial landscape shaped by rapid technological change, global competition,
                        and evolving regulations, we equip professionals with practical skills and knowledge.
                    </p>
                </motion.div>

                {/* Values Cards */}
                <div className="space-y-4">

                    {/* First Row (2 cards) */}
                    <div className="grid grid-cols-2 gap-3">
                        {values.slice(0, 2).map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                                border border-gray-700/50 hover:border-primary/50 
                                transition-all duration-500 group overflow-hidden"
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 
                                        flex items-center justify-center shadow-lg shadow-primary/30 
                                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 
                                group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Second Row (3 cards) */}
                    <div className="grid grid-cols-3 gap-3">
                        {values.slice(2).map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index + 2) * 0.1 }}
                                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 
                                border border-gray-700/50 hover:border-primary/50 
                                transition-all duration-500 group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 
                                        flex items-center justify-center shadow-lg shadow-primary/30 
                                        group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 
                                group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default MoreAboutUs

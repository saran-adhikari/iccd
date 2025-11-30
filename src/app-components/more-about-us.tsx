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
        <section className="w-full py-20 px-6 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            More About Us
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full mb-8" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        In a financial landscape shaped by rapid technological change, global competition,
                        and evolving regulations, we exist to equip professionals with practical skills
                        and up-to-date knowledge. Our programs are designed to prepare individuals to
                        perform confidently and contribute to a stronger, more resilient financial ecosystem.
                    </motion.p>
                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold">Our Values</h3>
                        <p className="text-muted-foreground mt-2">The core principles that guide our mission.</p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {values.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] p-6 rounded-2xl border border-border/50 bg-secondary/5 hover:bg-secondary/10 transition-colors duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MoreAboutUs

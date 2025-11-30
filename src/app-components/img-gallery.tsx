"use client"

import { GalleryImage } from "@prisma/client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

export function ImgGallery({ images }: { images: GalleryImage[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

    if (!images || images.length === 0) return null

    return (
        <section className="py-20 bg-background mx-auto relative overflow-hidden w-[80%]">
            

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white">Life at ICCD</h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        Glimpses of our training sessions, workshops, and community events.
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image.imageUrl}
                                alt={image.alt}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.imageUrl}
                            alt={selectedImage.alt}
                            fill
                            className="object-contain"
                        />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 bg-black/50 p-2 rounded-lg backdrop-blur-sm mx-auto max-w-md">
                            {selectedImage.alt}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}

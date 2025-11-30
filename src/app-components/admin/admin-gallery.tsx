"use client"

import { useState, useTransition } from "react"
import { GalleryImage } from "@prisma/client"
import { addGalleryImage, deleteGalleryImage } from "@/actions/gallery-actions"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Label } from "@/app-components/ui/label"
import { Trash2, Plus, Loader2, Image as ImageIcon, Upload } from "lucide-react"
import { toast } from "react-toastify"
import Image from "next/image"

export function AdminGallery({ initialImages }: { initialImages: GalleryImage[] }) {
    const [images, setImages] = useState(initialImages)
    const [isPending, startTransition] = useTransition()
    const [isUploading, setIsUploading] = useState(false)
    const [newImage, setNewImage] = useState({ alt: "" })
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file || !newImage.alt) return

        setIsUploading(true)
        try {
            // 1. Upload File
            const formData = new FormData()
            formData.append("file", file)

            const uploadRes = await fetch("/api/upload/gallery", {
                method: "POST",
                body: formData,
            })

            if (!uploadRes.ok) throw new Error("Upload failed")

            const { fileUrl } = await uploadRes.json()

            // 2. Save to DB
            startTransition(async () => {
                const result = await addGalleryImage({ imageUrl: fileUrl, alt: newImage.alt })
                if (result.success && result.data) {
                    setImages([...images, result.data])
                    setNewImage({ alt: "" })
                    setFile(null)
                    // Reset file input manually if needed, or rely on key
                    toast.success("Image added successfully")
                } else {
                    toast.error("Failed to save image data")
                }
            })
        } catch (error) {
            console.error(error)
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return

        startTransition(async () => {
            const result = await deleteGalleryImage(id)
            if (result.success) {
                setImages(images.filter(img => img.id !== id))
                toast.success("Image deleted successfully")
            } else {
                toast.error("Failed to delete image")
            }
        })
    }

    return (
        <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Add New Image
                </h2>
                <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] items-end">
                    <div className="space-y-2">
                        <Label>Select Image</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="cursor-pointer file:cursor-pointer file:text-primary file:border-0 file:bg-transparent file:font-medium"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Alt Text</Label>
                        <Input
                            placeholder="Description of image"
                            value={newImage.alt}
                            onChange={e => setNewImage({ ...newImage, alt: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isPending || isUploading}>
                        {isPending || isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Upload className="w-4 h-4 mr-2" /> Upload</>}
                    </Button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="group relative aspect-video bg-muted rounded-xl overflow-hidden border border-border">
                        <Image
                            src={image.imageUrl}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(image.id)}
                                disabled={isPending}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate">
                            {image.alt}
                        </div>
                    </div>
                ))}
                {images.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                        <p>No images in gallery yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

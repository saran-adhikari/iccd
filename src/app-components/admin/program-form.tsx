"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Textarea } from "@/app-components/ui/textarea"
import { Label } from "@/app-components/ui/label"
import { Loader2, Plus, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"

// Define a type that matches the Prisma model roughly
type ProgramData = {
    id?: string
    slug: string
    title: string
    category: string
    summary: string
    keyPoints: string[]
    durationDays: number
    level: string
    maxParticipants: number
    format: string
    certification?: string
    audience: string[]
    instructorName: string
    instructorExpertise: string[]
    learningOutcomes: string[]
    location: string
    lastUpdated: string
    tags: string[]
    imageCover: string
    imageIcon: string
    language: string
    longDescription: string
}

export function ProgramForm({ initialData }: { initialData?: ProgramData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ProgramData>(
        initialData || {
            slug: "",
            title: "",
            category: "",
            summary: "",
            keyPoints: [""],
            durationDays: 1,
            level: "Intermediate",
            maxParticipants: 20,
            format: "On-site",
            certification: "",
            audience: [""],
            instructorName: "",
            instructorExpertise: [""],
            learningOutcomes: [""],
            location: "Kathmandu",
            lastUpdated: new Date().toISOString().split('T')[0],
            tags: [""],
            imageCover: "",
            imageIcon: "",
            language: "English",
            longDescription: "",
        }
    )

    const handleChange = (field: keyof ProgramData, value: string | number | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleArrayChange = (field: keyof ProgramData, index: number, value: string) => {
        const newArray = [...(formData[field] as string[])]
        newArray[index] = value
        setFormData((prev) => ({ ...prev, [field]: newArray }))
    }

    const addArrayItem = (field: keyof ProgramData) => {
        setFormData((prev) => ({ ...prev, [field]: [...(prev[field] as string[]), ""] }))
    }

    const removeArrayItem = (field: keyof ProgramData, index: number) => {
        const newArray = [...(formData[field] as string[])]
        newArray.splice(index, 1)
        setFormData((prev) => ({ ...prev, [field]: newArray }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/programs", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            router.push("/admin/programs")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-background backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-primary/10 text-white">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-gray-200">Title</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Slug (URL)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Category</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.category} onChange={(e) => handleChange("category", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Duration (Days)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" type="number" value={formData.durationDays} onChange={(e) => handleChange("durationDays", parseInt(e.target.value))} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Level</Label>
                    <Select value={formData.level} onValueChange={(val) => handleChange("level", val)}>
                        <SelectTrigger className="bg-secondary/5 border-secondary/20 text-white focus:ring-primary/50 mt-2">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-secondary/20 text-white">
                            <SelectItem value="Foundation" className="focus:bg-secondary/20 focus:text-white">Foundation</SelectItem>
                            <SelectItem value="Intermediate" className="focus:bg-secondary/20 focus:text-white">Intermediate</SelectItem>
                            <SelectItem value="Advanced" className="focus:bg-secondary/20 focus:text-white">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Max Participants</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" type="number" value={formData.maxParticipants} onChange={(e) => handleChange("maxParticipants", parseInt(e.target.value))} required />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-gray-200">Format</Label>
                    <Select value={formData.format} onValueChange={(val) => handleChange("format", val)}>
                        <SelectTrigger className="bg-secondary/5 border-secondary/20 text-white focus:ring-primary/50 mt-2">
                            <SelectValue placeholder="Select Format" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-secondary/20 text-white">
                            <SelectItem value="On-site" className="focus:bg-secondary/20 focus:text-white">On-site</SelectItem>
                            <SelectItem value="Online" className="focus:bg-secondary/20 focus:text-white">Online</SelectItem>
                            <SelectItem value="Blended" className="focus:bg-secondary/20 focus:text-white">Blended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Certification (Optional)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.certification} onChange={(e) => handleChange("certification", e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-gray-200">Summary</Label>
                <Textarea className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.summary} onChange={(e) => handleChange("summary", e.target.value)} required />
            </div>

            <div className="space-y-2">
                <Label className="text-gray-200">Long Description</Label>
                <Textarea className="min-h-[200px] bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.longDescription} onChange={(e) => handleChange("longDescription", e.target.value)} required />
            </div>

            {/* Array Fields */}
            {["keyPoints", "audience", "learningOutcomes", "tags"].map((field) => (
                <div key={field} className="space-y-2">
                    <Label className="capitalize text-gray-200">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    {(formData[field as keyof ProgramData] as string[]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={item} onChange={(e) => handleArrayChange(field as keyof ProgramData, index, e.target.value)} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(field as keyof ProgramData, index)} className="text-gray-400 hover:text-white hover:bg-white/10">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(field as keyof ProgramData)} className="border-secondary/20 text-secondary hover:bg-secondary/10 hover:text-secondary-foreground">
                        <Plus className="mr-1 h-4 w-4" /> Add Item
                    </Button>
                </div>
            ))}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-gray-200">Instructor Name</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.instructorName} onChange={(e) => handleChange("instructorName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Location</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Cover Image URL</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.imageCover} onChange={(e) => handleChange("imageCover", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Icon Name (Lucide)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.imageIcon} onChange={(e) => handleChange("imageIcon", e.target.value)} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="border-white/10 text-white hover:bg-white/10 hover:text-white">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Program
                </Button>
            </div>
        </form>
    )
}

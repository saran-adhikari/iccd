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
    certification: string
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
            certification: "Certificate of Completion",
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
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={formData.title} onChange={(e) => handleChange("title", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={formData.category} onChange={(e) => handleChange("category", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Duration (Days)</Label>
                    <Input type="number" value={formData.durationDays} onChange={(e) => handleChange("durationDays", parseInt(e.target.value))} required />
                </div>
                <div className="space-y-2">
                    <Label>Level</Label>
                    <Select value={formData.level} onValueChange={(val) => handleChange("level", val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Foundation">Foundation</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Max Participants</Label>
                    <Input type="number" value={formData.maxParticipants} onChange={(e) => handleChange("maxParticipants", parseInt(e.target.value))} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea value={formData.summary} onChange={(e) => handleChange("summary", e.target.value)} required />
            </div>

            <div className="space-y-2">
                <Label>Long Description</Label>
                <Textarea className="min-h-[200px]" value={formData.longDescription} onChange={(e) => handleChange("longDescription", e.target.value)} required />
            </div>

            {/* Array Fields */}
            {["keyPoints", "audience", "learningOutcomes", "tags"].map((field) => (
                <div key={field} className="space-y-2">
                    <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    {(formData[field as keyof ProgramData] as string[]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <Input value={item} onChange={(e) => handleArrayChange(field as keyof ProgramData, index, e.target.value)} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(field as keyof ProgramData, index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(field as keyof ProgramData)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            ))}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Instructor Name</Label>
                    <Input value={formData.instructorName} onChange={(e) => handleChange("instructorName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={formData.location} onChange={(e) => handleChange("location", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Cover Image URL</Label>
                    <Input value={formData.imageCover} onChange={(e) => handleChange("imageCover", e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Icon Name (Lucide)</Label>
                    <Input value={formData.imageIcon} onChange={(e) => handleChange("imageIcon", e.target.value)} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Program
                </Button>
            </div>
        </form>
    )
}

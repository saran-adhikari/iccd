"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Input } from "@/app-components/ui/input"
import { Textarea } from "@/app-components/ui/textarea"
import { Label } from "@/app-components/ui/label"
import { Loader2 } from "lucide-react"

type TestimonialData = {
    id?: string
    quote: string
    author: string
    role: string
    company: string
    rating: number
    image: string
}

export function TestimonialForm({ initialData }: { initialData?: TestimonialData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<TestimonialData>(
        initialData || {
            quote: "",
            author: "",
            role: "",
            company: "",
            rating: 5,
            image: "",
        }
    )

    const handleChange = (field: keyof TestimonialData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/testimonials", {
                method: initialData ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            router.push("/admin/testimonials")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-background backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-secondary/20 text-white">
            <div className="space-y-2">
                <Label className="text-gray-200">Quote</Label>
                <Textarea className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.quote} onChange={(e) => handleChange("quote", e.target.value)} required />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-gray-200">Author Name (Optional)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.author} onChange={(e) => handleChange("author", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Role (Optional)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.role} onChange={(e) => handleChange("role", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Company (Optional)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-200">Rating (1-5)</Label>
                    <Input className="bg-secondary/5 border-secondary/20 text-white placeholder:text-gray-500 focus-visible:ring-primary/50 mt-2" type="number" min="1" max="5" value={formData.rating} onChange={(e) => handleChange("rating", parseInt(e.target.value))} required />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="border-white/10 text-white hover:bg-white/10 hover:text-white">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Testimonial
                </Button>
            </div>
        </form>
    )
}

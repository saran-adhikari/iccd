import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Plus } from "lucide-react"
import { TestimonialItem } from "@/app-components/admin/testimonial-item"

const prisma = new PrismaClient()

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    })



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
                <Link href="/admin/testimonials/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </Button>
                </Link>
            </div>

            <div className="bg-card shadow-sm rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase">
                        <tr>
                            <th className="px-6 py-3">Quote</th>
                            <th className="px-6 py-3">Rating</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {testimonials.map((t) => (
                            <TestimonialItem key={t.id} t={t} />
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No testimonials found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

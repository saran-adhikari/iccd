import { PrismaClient } from "@prisma/client"
import { TestimonialForm } from "@/app-components/admin/testimonial-form"

const prisma = new PrismaClient()

export default async function TestimonialEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let testimonial = null

    if (id !== "new") {
        testimonial = await prisma.testimonial.findUnique({
            where: { id },
        })
    }

    const formattedTestimonial = testimonial ? {
        ...testimonial,
        author: testimonial.author || "",
        role: testimonial.role || "",
        company: testimonial.company || "",
        image: testimonial.image || ""
    } : undefined

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{id === "new" ? "Create Testimonial" : "Edit Testimonial"}</h2>
            <TestimonialForm initialData={formattedTestimonial} />
        </div>
    )
}

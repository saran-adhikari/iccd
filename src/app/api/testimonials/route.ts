import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        const { id, ...data } = body

        const testimonial = await prisma.testimonial.create({
            data,
        })

        // Revalidate the testimonials list page
        const { revalidatePath } = await import('next/cache')
        revalidatePath('/admin/testimonials')

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        const { id, ...data } = body

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data,
        })

        // Revalidate the testimonials list page
        const { revalidatePath } = await import('next/cache')
        revalidatePath('/admin/testimonials')

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

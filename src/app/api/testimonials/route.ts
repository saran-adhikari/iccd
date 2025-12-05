import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = body

        const testimonial = await prisma.testimonial.create({
            data,
        })

        // Revalidate admin and public pages
        revalidatePath('/admin/testimonials')
        revalidatePath('/')

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

        // Revalidate admin and public pages
        revalidatePath('/admin/testimonials')
        revalidatePath('/')

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) return new NextResponse("ID required", { status: 400 })

        await prisma.testimonial.delete({
            where: { id }
        })

        revalidatePath('/admin/testimonials')
        revalidatePath('/')

        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
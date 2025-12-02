import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache" // Add this import

const prisma = new PrismaClient()

export async function GET() {
    try {
        const metrics = await prisma.impactMetric.findMany({
            orderBy: { order: 'asc' }
        })
        return NextResponse.json(metrics)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        const { label, value, suffix, description, icon, order } = body

        const metric = await prisma.impactMetric.create({
            data: {
                label,
                value,
                suffix,
                description,
                icon,
                order: parseInt(order) || 0
            }
        })

        revalidatePath('/admin/impact') // Add this
        revalidatePath('/') // Add this

        return NextResponse.json(metric)
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

        if (data.order) data.order = parseInt(data.order)

        const metric = await prisma.impactMetric.update({
            where: { id },
            data
        })

        revalidatePath('/admin/impact') // Add this
        revalidatePath('/') // Add this

        return NextResponse.json(metric)
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

        await prisma.impactMetric.delete({
            where: { id }
        })

        revalidatePath('/admin/impact') // Add this
        revalidatePath('/') // Add this

        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
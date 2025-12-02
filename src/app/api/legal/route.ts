import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache" // Add this import

const prisma = new PrismaClient()

export async function GET() {
    try {
        const docs = await prisma.legalDocument.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(docs)
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
        const { title, slug, fileUrl, type } = body

        const doc = await prisma.legalDocument.create({
            data: {
                title,
                slug,
                fileUrl,
                type
            }
        })

        revalidatePath('/admin/legal') // Add this
        revalidatePath('/legal') // Add this
        revalidatePath('/') // Add this

        return NextResponse.json(doc)
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

        const doc = await prisma.legalDocument.update({
            where: { id },
            data
        })

        revalidatePath('/admin/legal') // Add this
        revalidatePath('/legal') // Add this
        revalidatePath('/') // Add this

        return NextResponse.json(doc)
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

        await prisma.legalDocument.delete({
            where: { id }
        })

        revalidatePath('/admin/legal') // Add this
        revalidatePath('/legal') // Add this
        revalidatePath('/') // Add this

        return new NextResponse("Deleted", { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache" // Add this import at the top

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const body = await req.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = body

        // Ensure unique slug
        const existing = await prisma.program.findUnique({ where: { slug: data.slug } })
        if (existing) {
            return new NextResponse("Slug already exists", { status: 400 })
        }

        const program = await prisma.program.create({
            data,
        })

        // Revalidate admin and public pages
        revalidatePath('/admin/programs')
        revalidatePath('/programs')
        revalidatePath('/')

        return NextResponse.json(program)
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

        const program = await prisma.program.update({
            where: { id },
            data,
        })

        // Revalidate admin and public pages
        revalidatePath('/admin/programs')
        revalidatePath('/programs')
        revalidatePath('/')

        return NextResponse.json(program)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
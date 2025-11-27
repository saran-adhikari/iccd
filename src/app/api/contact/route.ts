import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const contact = await prisma.contactRequest.create({
            data: {
                name: body.name,
                email: body.email,
                org: body.org,
                role: body.role,
                interest: body.interest,
                message: body.message,
            },
        })

        return NextResponse.json(contact)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { status } = body

        const proposal = await prisma.proposalRequest.update({
            where: { id },
            data: { status },
        })

        return NextResponse.json(proposal)
    } catch (error) {
        console.error("Error updating proposal:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

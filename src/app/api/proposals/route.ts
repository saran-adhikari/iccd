import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Basic validation could go here

        const proposal = await prisma.proposalRequest.create({
            data: {
                institutionName: body.institutionName,
                size: body.size,
                department: body.department,
                location: body.location,
                country: body.country,
                programs: body.programs,
                programDetails: body.programDetails,
                timing: body.timing,
                format: body.format,
                duration: body.duration,
                goals: body.goals,
                budget: body.budget,
                name: body.name,
                email: body.email,
                phone: body.phone,
                position: body.position,
                proposalType: body.proposalType,
            },
        })

        return NextResponse.json(proposal)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

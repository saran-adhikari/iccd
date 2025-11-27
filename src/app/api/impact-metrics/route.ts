import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

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

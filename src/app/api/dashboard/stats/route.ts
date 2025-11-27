import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

const prisma = new PrismaClient()

export async function GET() {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const [
            programCount,
            testimonialCount,
            proposalCount,
            contactCount,
            partnerCount,
            impactMetricCount,
            legalDocCount,
            recentProposals,
            recentContacts
        ] = await Promise.all([
            prisma.program.count(),
            prisma.testimonial.count(),
            prisma.proposalRequest.count(),
            prisma.contactRequest.count(),
            prisma.partner.count(),
            prisma.impactMetric.count(),
            prisma.legalDocument.count(),
            prisma.proposalRequest.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                }
            }),
            prisma.contactRequest.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                }
            })
        ])

        return NextResponse.json({
            programCount,
            testimonialCount,
            proposalCount,
            contactCount,
            partnerCount,
            impactMetricCount,
            legalDocCount,
            recentProposals,
            recentContacts
        })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

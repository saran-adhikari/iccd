import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        // Fetch recent activities from different tables
        const [recentPrograms, recentTestimonials, recentPartners, recentImpactMetrics, recentLegalDocs, recentGalleryImages] = await Promise.all([
            prisma.program.findMany({
                orderBy: { updatedAt: 'desc' },
                take: 2,
                select: { title: true, updatedAt: true, createdAt: true }
            }),
            prisma.testimonial.findMany({
                orderBy: { createdAt: 'desc' },
                take: 2,
                select: { author: true, company: true, createdAt: true }
            }),
            prisma.partner.findMany({
                orderBy: { updatedAt: 'desc' },
                take: 1,
                select: { name: true, updatedAt: true, createdAt: true }
            }),
            prisma.impactMetric.findMany({
                orderBy: { updatedAt: 'desc' },
                take: 1,
                select: { label: true, updatedAt: true, createdAt: true }
            }),
            prisma.legalDocument.findMany({
                orderBy: { updatedAt: 'desc' },
                take: 1,
                select: { title: true, updatedAt: true, createdAt: true }
            }),
            prisma.galleryImage.findMany({
                orderBy: { createdAt: 'desc' },
                take: 2,
                select: { alt: true, updatedAt: true, createdAt: true }
            })
        ])

        // Combine and format activities
        interface Activity {
            type: 'program' | 'testimonial' | 'partner' | 'impact' | 'legal' | 'gallery'
            action: 'created' | 'updated'
            title: string
            timestamp: Date
        }

        const activities: Activity[] = []

        // Add program activities
        recentPrograms.forEach(program => {
            const isNew = new Date(program.createdAt).getTime() === new Date(program.updatedAt).getTime()
            activities.push({
                type: 'program',
                action: isNew ? 'created' : 'updated',
                title: program.title,
                timestamp: program.updatedAt
            })
        })

        // Add testimonial activities
        recentTestimonials.forEach(testimonial => {
            const name = testimonial.author || testimonial.company || 'Anonymous'
            activities.push({
                type: 'testimonial',
                action: 'created',
                title: name,
                timestamp: testimonial.createdAt
            })
        })

        // Add partner activities
        recentPartners.forEach(partner => {
            const isNew = new Date(partner.createdAt).getTime() === new Date(partner.updatedAt).getTime()
            activities.push({
                type: 'partner',
                action: isNew ? 'created' : 'updated',
                title: partner.name,
                timestamp: partner.updatedAt
            })
        })

        // Add impact metric activities
        recentImpactMetrics.forEach(metric => {
            const isNew = new Date(metric.createdAt).getTime() === new Date(metric.updatedAt).getTime()
            activities.push({
                type: 'impact',
                action: isNew ? 'created' : 'updated',
                title: metric.label,
                timestamp: metric.updatedAt
            })
        })

        // Add legal doc activities
        recentLegalDocs.forEach(doc => {
            const isNew = new Date(doc.createdAt).getTime() === new Date(doc.updatedAt).getTime()
            activities.push({
                type: 'legal',
                action: isNew ? 'created' : 'updated',
                title: doc.title,
                timestamp: doc.updatedAt
            })
        })

        // Add gallery activities
        recentGalleryImages.forEach(image => {
            activities.push({
                type: 'gallery',
                action: 'created',
                title: image.alt,
                timestamp: image.createdAt
            })
        })

        // Sort by timestamp and take top 5
        const sortedActivities = activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5)

        return NextResponse.json(sortedActivities)
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

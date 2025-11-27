import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { ImpactMetricForm } from "@/app-components/admin/impact-form"

const prisma = new PrismaClient()

export default async function EditImpactMetricPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const metric = await prisma.impactMetric.findUnique({
        where: { id }
    })

    if (!metric) return notFound()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Impact Metric</h1>
            <ImpactMetricForm initialData={metric} />
        </div>
    )
}

import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { PartnerForm } from "@/app-components/admin/partner-form"

const prisma = new PrismaClient()

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const partner = await prisma.partner.findUnique({
        where: { id }
    })

    if (!partner) return notFound()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Partner</h1>
            <PartnerForm initialData={partner} />
        </div>
    )
}

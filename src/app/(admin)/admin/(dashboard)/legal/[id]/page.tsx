import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { LegalDocumentForm } from "@/app-components/admin/legal-form"

const prisma = new PrismaClient()

export default async function EditLegalDocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const doc = await prisma.legalDocument.findUnique({
        where: { id }
    })

    if (!doc) return notFound()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Legal Document</h1>
            <LegalDocumentForm initialData={doc} />
        </div>
    )
}

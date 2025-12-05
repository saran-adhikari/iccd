import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus } from "lucide-react"
import { LegalItem } from "@/app-components/admin/legal-item"

const prisma = new PrismaClient()

export default async function LegalPage() {
    const docs = await prisma.legalDocument.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Legal Documents</h1>
                <Link href="/admin/legal/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Document
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc) => (
                    <LegalItem key={doc.id} doc={doc} />
                ))}

                {docs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No legal documents found. Click &quot;Add Document&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    )
}

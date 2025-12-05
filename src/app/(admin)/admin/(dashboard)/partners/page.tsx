import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus } from "lucide-react"
import { PartnerItem } from "@/app-components/admin/partner-item"

const prisma = new PrismaClient()

export default async function PartnersPage() {
    const partners = await prisma.partner.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Partners</h1>
                <Link href="/admin/partners/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Partner
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner) => (
                    <PartnerItem key={partner.id} partner={partner} />
                ))}

                {partners.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No partners found. Click &quot;Add Partner&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    )
}

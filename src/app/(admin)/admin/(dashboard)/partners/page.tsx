import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"

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
                    <Card key={partner.id} className="overflow-hidden">
                        <div className="h-32 bg-secondary/5 flex items-center justify-center p-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{partner.name}</h3>
                                    {partner.website && (
                                        <a
                                            href={partner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                                        >
                                            Visit Website <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Link href={`/admin/partners/${partner.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    const prisma = new PrismaClient()
                                    await prisma.partner.delete({ where: { id: partner.id } })
                                }}>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
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

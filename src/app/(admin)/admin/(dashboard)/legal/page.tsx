import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"

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
                    <Card key={doc.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground">{doc.title}</h3>
                                    <p className="text-sm text-muted-foreground">/{doc.slug}</p>
                                    <span className="inline-block mt-2 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md uppercase font-bold">
                                        {doc.type}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Link href={`/admin/legal/${doc.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    const prisma = new PrismaClient()
                                    await prisma.legalDocument.delete({ where: { id: doc.id } })
                                }}>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
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

import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"

const prisma = new PrismaClient()

export default async function ImpactPage() {
    const metrics = await prisma.impactMetric.findMany({
        orderBy: { order: 'asc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-foreground">Impact Metrics</h1>
                <Link href="/admin/impact/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Metric
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric) => (
                    <Card key={metric.id}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-3xl font-bold text-primary">
                                        {metric.value}{metric.suffix}
                                    </div>
                                    <h3 className="font-semibold text-lg text-foreground">{metric.label}</h3>
                                    {metric.description && (
                                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                                    )}
                                </div>
                                <div className="bg-secondary/10 p-2 rounded-full text-secondary font-bold">
                                    #{metric.order}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Link href={`/admin/impact/${metric.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    const prisma = new PrismaClient()
                                    await prisma.impactMetric.delete({ where: { id: metric.id } })
                                }}>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {metrics.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No impact metrics found. Click &quot;Add Metric&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    )
}

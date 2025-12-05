import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/app-components/ui/button"
import { Plus } from "lucide-react"
import { ImpactItem } from "@/app-components/admin/impact-item"

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
                        <Plus className="w-4 h-4 mr-2 " />
                        Add Metric
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric) => (
                    <ImpactItem key={metric.id} metric={metric} />
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

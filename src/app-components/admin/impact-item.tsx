'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { toast } from "react-toastify"

interface ImpactMetric {
    id: string
    label: string
    value: string
    suffix?: string | null
    description?: string | null
    order: number
}

export function ImpactItem({ metric }: { metric: ImpactMetric }) {
    const router = useRouter()

    async function handleDelete() {
        const res = await fetch(`/api/impact?id=${metric.id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error('Failed to delete')
        }

        toast.success('Metric deleted')
        router.refresh()
    }

    return (
        <Card>
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
                    <DeleteConfirmDialog onConfirm={handleDelete} title={`Delete ${metric.label}?`}>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </DeleteConfirmDialog>
                </div>
            </CardContent>
        </Card>
    )
}

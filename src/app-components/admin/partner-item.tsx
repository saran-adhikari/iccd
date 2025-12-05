'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { toast } from "react-toastify"

interface Partner {
    id: string
    name: string
    logo: string | null
    website?: string | null
}

export function PartnerItem({ partner }: { partner: Partner }) {
    const router = useRouter()

    async function handleDelete() {
        const res = await fetch(`/api/partners?id=${partner.id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error('Failed to delete')
        }

        toast.success('Partner deleted')
        router.refresh()
    }

    return (
        <Card className="overflow-hidden">
            <div className="h-32 bg-secondary/5 flex items-center justify-center p-6 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {partner.logo ? (
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    <span className="text-xl font-bold text-muted-foreground">{partner.name}</span>
                )}
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
                    <DeleteConfirmDialog onConfirm={handleDelete} title={`Delete ${partner.name}?`}>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </DeleteConfirmDialog>
                </div>
            </CardContent>
        </Card>
    )
}

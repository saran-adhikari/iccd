'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Pencil, Trash2, FileText } from "lucide-react"
import { Card, CardContent } from "@/app-components/ui/card"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { toast } from "react-toastify"

interface LegalDocument {
    id: string
    title: string
    titleNe?: string | null
    slug: string
    fileUrl: string
    type: string
}

export function LegalItem({ doc }: { doc: LegalDocument }) {
    const router = useRouter()

    async function handleDelete() {
        const res = await fetch(`/api/legal?id=${doc.id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error('Failed to delete')
        }

        toast.success('Document deleted')
        router.refresh()
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground">{doc.titleNe || doc.title}</h3>
                        {doc.titleNe && <p className="text-sm text-muted-foreground">{doc.title}</p>}
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

                    <DeleteConfirmDialog onConfirm={handleDelete} title={`Delete ${doc.title}?`}>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </DeleteConfirmDialog>
                </div>
            </CardContent>
        </Card>
    )
}

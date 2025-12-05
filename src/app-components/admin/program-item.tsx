'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app-components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { toast } from "react-toastify"

interface Program {
    id: string
    title: string
    category: string
    level: string
}

export function ProgramItem({ program }: { program: Program }) {
    const router = useRouter()

    async function handleDelete() {
        const res = await fetch(`/api/programs?id=${program.id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error('Failed to delete')
        }

        toast.success('Program deleted')
        router.refresh()
    }

    return (
        <tr className="hover:bg-muted/50 transition-colors">
            <td className="px-6 py-4 font-medium text-foreground">{program.title}</td>
            <td className="px-6 py-4 text-muted-foreground">{program.category}</td>
            <td className="px-6 py-4 text-muted-foreground">{program.level}</td>
            <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Link href={`/admin/programs/${program.id}`}>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="h-4 w-4" />
                    </Button>
                </Link>
                <DeleteConfirmDialog onConfirm={handleDelete} title={`Delete ${program.title}?`}>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </DeleteConfirmDialog>
            </td>
        </tr>
    )
}

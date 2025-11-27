import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/app-components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export default async function ProgramsPage() {
    const programs = await prisma.program.findMany({
        orderBy: { createdAt: 'desc' }
    })

    async function deleteProgram(formData: FormData) {
        "use server"
        const id = formData.get("id") as string
        await prisma.program.delete({ where: { id } })
        revalidatePath("/admin/programs")
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
                <Link href="/admin/programs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Program
                    </Button>
                </Link>
            </div>

            <div className="bg-card shadow-sm rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Level</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {programs.map((program) => (
                            <tr key={program.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{program.title}</td>
                                <td className="px-6 py-4 text-muted-foreground">{program.category}</td>
                                <td className="px-6 py-4 text-muted-foreground">{program.level}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link href={`/admin/programs/${program.id}`}>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <form action={deleteProgram}>
                                        <input type="hidden" name="id" value={program.id} />
                                        <Button variant="destructive" size="sm" type="submit" className="h-8 w-8 p-0">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {programs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No programs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

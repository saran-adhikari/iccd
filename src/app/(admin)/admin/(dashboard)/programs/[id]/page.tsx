import { PrismaClient } from "@prisma/client"
import { ProgramForm } from "@/app-components/admin/program-form"

const prisma = new PrismaClient()

export default async function ProgramEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let program = null

    if (id !== "new") {
        program = await prisma.program.findUnique({
            where: { id },
        })
    }

    const formattedProgram = program ? {
        ...program,
        imageIcon: program.imageIcon || "",
        level: program.level as string,
        keyPoints: program.keyPoints as string[],
        audience: program.audience as string[],
        instructorExpertise: program.instructorExpertise as string[],
        learningOutcomes: program.learningOutcomes as string[],
        tags: program.tags as string[],
        lastUpdated: program.lastUpdated
    } : undefined

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{id === "new" ? "Create Program" : "Edit Program"}</h2>
            <ProgramForm initialData={formattedProgram} />
        </div>
    )
}

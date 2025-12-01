import { PrismaClient } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card"
import { format } from "date-fns"
import StatusSelect from "./status-select"

const prisma = new PrismaClient()

export default async function ProposalsPage() {
    const proposals = await prisma.proposalRequest.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Proposal Requests</h2>
                <div className="text-sm text-muted-foreground">
                    Total: {proposals.length}
                </div>
            </div>

            <div className="grid gap-6">
                {proposals.map((proposal) => (
                    <Card key={proposal.id} className="overflow-hidden border-l-4 border-l-primary">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 bg-muted/30 border-b border-border/50">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold text-primary">{proposal.institutionName}</CardTitle>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">{proposal.name}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{proposal.email}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{proposal.phone || "No phone"}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <StatusSelect id={proposal.id} currentStatus={proposal.status} />
                                <span className="text-xs text-muted-foreground">{format(proposal.createdAt, 'PPP p')}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 grid md:grid-cols-3 gap-6 text-sm">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-foreground border-b pb-1">Organization</h4>
                                <div className="grid grid-cols-[100px_1fr] gap-1">
                                    <span className="text-muted-foreground">Department:</span>
                                    <span>{proposal.department || '-'}</span>
                                    <span className="text-muted-foreground">Size:</span>
                                    <span>{proposal.size || '-'}</span>
                                    <span className="text-muted-foreground">Location:</span>
                                    <span>{proposal.location}, {proposal.country}</span>
                                    <span className="text-muted-foreground">Position:</span>
                                    <span>{proposal.position || '-'}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-foreground border-b pb-1">Training Details</h4>
                                <div className="grid grid-cols-[100px_1fr] gap-1">
                                    <span className="text-muted-foreground">Programs:</span>
                                    <span className="font-medium">{proposal.programs.join(", ")}</span>
                                    <span className="text-muted-foreground">Timing:</span>
                                    <span>{proposal.timing || 'Not specified'}</span>
                                    <span className="text-muted-foreground">Format:</span>
                                    <span>{proposal.format}</span>
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span>{proposal.duration}</span>
                                </div>
                                {proposal.programDetails && Object.keys(proposal.programDetails as object).length > 0 && (
                                    <div className="mt-2 bg-muted/30 p-2 rounded text-xs">
                                        <p className="font-semibold mb-1">Specific Roles:</p>
                                        {Object.entries(proposal.programDetails as Record<string, { roles: string }>).map(([key, value]) => (
                                            <div key={key} className="flex gap-2">
                                                <span className="uppercase font-bold text-xs text-muted-foreground w-10">{key}:</span>
                                                <span>{value.roles || '-'}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-foreground border-b pb-1">Goals & Budget</h4>
                                <div>
                                    <span className="text-muted-foreground block mb-1">Key Goals:</span>
                                    <p className="bg-muted/30 p-3 rounded-md text-muted-foreground italic leading-relaxed">
                                        &quot;{proposal.goals}&quot;
                                    </p>
                                </div>
                                {proposal.budget ? (
                                    <div className="mt-2">
                                        <span className="text-muted-foreground">Budget: </span>
                                        <span className="font-medium">${proposal.budget.toLocaleString()}</span>
                                    </div>
                                ) : (
                                    <div className="mt-2 text-muted-foreground text-xs">No budget specified</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {proposals.length === 0 && (
                    <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed">
                        <p className="text-muted-foreground">No proposals received yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

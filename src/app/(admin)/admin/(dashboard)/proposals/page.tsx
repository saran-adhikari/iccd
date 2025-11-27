import { PrismaClient } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { format } from "date-fns"

const prisma = new PrismaClient()

export default async function ProposalsPage() {
    const proposals = await prisma.proposalRequest.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Proposal Requests</h2>

            <div className="grid gap-6">
                {proposals.map((proposal) => (
                    <Card key={proposal.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/50 border-b border-border">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-semibold">{proposal.institutionName}</CardTitle>
                                <p className="text-sm text-muted-foreground">{proposal.name} ({proposal.email})</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant={proposal.status === 'pending' ? 'secondary' : 'default'}>
                                    {proposal.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{format(proposal.createdAt, 'PPP')}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p><strong className="text-foreground">Department:</strong> <span className="text-muted-foreground">{proposal.department || '-'}</span></p>
                                <p><strong className="text-foreground">Location:</strong> <span className="text-muted-foreground">{proposal.location}, {proposal.country}</span></p>
                                <p><strong className="text-foreground">Size:</strong> <span className="text-muted-foreground">{proposal.size}</span></p>
                                <p><strong className="text-foreground">Budget:</strong> <span className="text-muted-foreground">${proposal.budget?.toLocaleString()}</span></p>
                            </div>
                            <div>
                                <p><strong className="text-foreground">Timing:</strong> <span className="text-muted-foreground">{proposal.timing}</span></p>
                                <p><strong className="text-foreground">Format:</strong> <span className="text-muted-foreground">{proposal.format} ({proposal.duration})</span></p>
                                <p><strong className="text-foreground">Programs:</strong> <span className="text-muted-foreground">{proposal.programs.join(", ")}</span></p>
                            </div>
                            <div className="md:col-span-2 mt-2">
                                <p><strong className="text-foreground">Goals:</strong></p>
                                <p className="bg-muted/30 p-3 rounded-md mt-1 text-muted-foreground">{proposal.goals}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {proposals.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">No proposals received yet.</p>
                )}
            </div>
        </div>
    )
}

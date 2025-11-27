import { PrismaClient } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/app-components/ui/card"
import { Badge } from "@/app-components/ui/badge"
import { format } from "date-fns"

const prisma = new PrismaClient()

export default async function ContactPage() {
    const messages = await prisma.contactRequest.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Contact Messages</h2>

            <div className="grid gap-6">
                {messages.map((msg) => (
                    <Card key={msg.id} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/50 border-b border-border">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-semibold">{msg.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{msg.email}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant="outline">{msg.interest}</Badge>
                                <span className="text-xs text-muted-foreground">{format(msg.createdAt, 'PPP')}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 text-sm">
                            <div className="mb-4">
                                <p><strong className="text-foreground">Organization:</strong> <span className="text-muted-foreground">{msg.org}</span></p>
                                <p><strong className="text-foreground">Role:</strong> <span className="text-muted-foreground">{msg.role}</span></p>
                            </div>
                            <div>
                                <p><strong className="text-foreground">Message:</strong></p>
                                <p className="bg-muted/30 p-3 rounded-md mt-1 whitespace-pre-wrap text-muted-foreground">{msg.message}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {messages.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">No messages received yet.</p>
                )}
            </div>
        </div>
    )
}

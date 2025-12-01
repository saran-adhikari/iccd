"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"
import { toast } from "react-toastify"

interface StatusSelectProps {
    id: string
    currentStatus: string
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-500/20 text-yellow-600 border-yellow-500/40 hover:bg-yellow-500/30"
        case "received":
            return "bg-blue-500/20 text-blue-600 border-blue-500/40 hover:bg-blue-500/30"
        case "sent_quotation":
            return "bg-green-500/20 text-green-600 border-green-500/40 hover:bg-green-500/30"
        default:
            return "bg-background"
    }
}

export default function StatusSelect({ id, currentStatus }: StatusSelectProps) {
    const [status, setStatus] = useState(currentStatus)
    const [loading, setLoading] = useState(false)

    const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus)
        setLoading(true)

        try {
            const res = await fetch(`/api/proposals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!res.ok) throw new Error("Failed to update status")

            toast.success("Status updated successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update status")
            // Revert on error
            setStatus(currentStatus)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
            <SelectTrigger className={`w-[180px] h-8 text-xs font-medium ${getStatusColor(status)}`}>
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="sent_quotation">Sent Quotation</SelectItem>
            </SelectContent>
        </Select>
    )
}

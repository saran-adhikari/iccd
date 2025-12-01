"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app-components/ui/select"
import { toast } from "react-toastify"

interface StatusSelectProps {
    id: string
    currentStatus: string
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
            <SelectTrigger className="w-[180px] h-8 text-xs bg-background">
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

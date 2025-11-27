'use client'

import { LogOut } from "lucide-react"
import { Button } from "@/app-components/ui/button"
import { logout } from "@/app/lib/actions"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export function SignOutButton() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => {
                startTransition(async () => {
                    await logout()
                })
            }}
            disabled={isPending}
        >
            <LogOut className="w-5 h-5 mr-2" />
            {isPending ? "Signing Out..." : "Sign Out"}
        </Button>
    )
}

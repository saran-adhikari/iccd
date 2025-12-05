'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app-components/ui/button'
import { Input } from '@/app-components/ui/input'
import { Label } from '@/app-components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface Partner {
    id: string
    name: string
    logo: string | null
    website: string | null
}

export function PartnerForm({ initialData }: { initialData?: Partner }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            id: initialData?.id,
            name: formData.get('name'),
            logo: formData.get('logo'),
            website: formData.get('website'),
        }

        try {
            const res = await fetch('/api/partners', {
                method: initialData ? 'PUT' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(initialData ? 'Partner updated!' : 'Partner created!')
            router.push('/admin/partners')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="name">Partner Name</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={initialData?.name}
                    required
                    placeholder="e.g. Mahalaxmi Bank"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="logo">Logo URL (Optional)</Label>
                <Input
                    id="logo"
                    name="logo"
                    defaultValue={initialData?.logo || ''}
                    placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                    Provide a direct URL to the logo image.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="website">Website URL (Optional)</Label>
                <Input
                    id="website"
                    name="website"
                    defaultValue={initialData?.website || ''}
                    placeholder="https://..."
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Partner' : 'Create Partner'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}

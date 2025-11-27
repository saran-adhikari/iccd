'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app-components/ui/button'
import { Input } from '@/app-components/ui/input'
import { Label } from '@/app-components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface ImpactMetric {
    id: string
    label: string
    value: string
    suffix: string | null
    description: string | null
    icon: string | null
    order: number
}

export function ImpactMetricForm({ initialData }: { initialData?: ImpactMetric }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            id: initialData?.id,
            label: formData.get('label'),
            value: formData.get('value'),
            suffix: formData.get('suffix'),
            description: formData.get('description'),
            icon: formData.get('icon'),
            order: formData.get('order'),
        }

        try {
            const res = await fetch('/api/impact', {
                method: initialData ? 'PUT' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(initialData ? 'Metric updated!' : 'Metric created!')
            router.push('/admin/impact')
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
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Input
                        id="label"
                        name="label"
                        defaultValue={initialData?.label}
                        required
                        placeholder="e.g. Graduates"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                        id="value"
                        name="value"
                        defaultValue={initialData?.value}
                        required
                        placeholder="e.g. 5000"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="suffix">Suffix (Optional)</Label>
                    <Input
                        id="suffix"
                        name="suffix"
                        defaultValue={initialData?.suffix || ''}
                        placeholder="e.g. +"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                        id="order"
                        name="order"
                        type="number"
                        defaultValue={initialData?.order || 0}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                    id="description"
                    name="description"
                    defaultValue={initialData?.description || ''}
                    placeholder="Short description"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="icon">Icon Name (Lucide React)</Label>
                <Input
                    id="icon"
                    name="icon"
                    defaultValue={initialData?.icon || ''}
                    placeholder="e.g. Users, GraduationCap"
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Metric' : 'Create Metric'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}

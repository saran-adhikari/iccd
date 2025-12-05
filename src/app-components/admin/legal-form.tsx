'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app-components/ui/button'
import { Input } from '@/app-components/ui/input'
import { Label } from '@/app-components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app-components/ui/select"

interface LegalDocument {
    id: string
    title: string
    titleNe?: string | null
    slug: string
    fileUrl: string
    type: string
}

export function LegalDocumentForm({ initialData }: { initialData?: LegalDocument }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [type, setType] = useState(initialData?.type || 'Act')
    const [customType, setCustomType] = useState('')

    // Initialize custom type if initialData has a type that is not Act or Rule
    useState(() => {
        if (initialData?.type && !['Act', 'Rule'].includes(initialData.type)) {
            setType('Other')
            setCustomType(initialData.type)
        }
    })

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const file = formData.get('file') as File
        let fileUrl = initialData?.fileUrl

        try {
            // Upload file if selected
            if (file && file.size > 0) {
                setUploading(true)
                const uploadData = new FormData()
                uploadData.append('file', file)

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData
                })

                if (!uploadRes.ok) throw new Error('Upload failed')
                const { fileUrl: url } = await uploadRes.json()
                fileUrl = url
                setUploading(false)
            }

            if (!fileUrl) throw new Error('File is required')

            const finalType = type === 'Other' ? customType : type

            const data = {
                id: initialData?.id,
                title: formData.get('title'),
                titleNe: formData.get('titleNe'),
                slug: formData.get('slug'),
                fileUrl,
                type: finalType,
            }

            const res = await fetch('/api/legal', {
                method: initialData ? 'PUT' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(initialData ? 'Document updated!' : 'Document created!')
            router.push('/admin/legal')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong.')
        } finally {
            setIsSubmitting(false)
            setUploading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={initialData?.title}
                        required
                        placeholder="e.g. Privacy Policy"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="titleNe">Nepali Title (Optional)</Label>
                    <Input
                        id="titleNe"
                        name="titleNe"
                        defaultValue={initialData?.titleNe || ''}
                        placeholder="e.g. गोपनीयता नीति"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={initialData?.slug}
                        required
                        placeholder="e.g. privacy-policy"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Act">Acts</SelectItem>
                            <SelectItem value="Rule">Rules</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {type === 'Other' && (
                    <div className="space-y-2">
                        <Label htmlFor="customType">Custom Category</Label>
                        <Input
                            id="customType"
                            value={customType}
                            onChange={(e) => setCustomType(e.target.value)}
                            required
                            placeholder="e.g. Policy"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">PDF File</Label>
                <Input
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf"
                    required={!initialData?.fileUrl}
                />
                {initialData?.fileUrl && (
                    <p className="text-sm text-muted-foreground">
                        Current file: <a href={initialData.fileUrl} target="_blank" className="text-primary hover:underline">View PDF</a>
                    </p>
                )}
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting || uploading}>
                    {(isSubmitting || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Document' : 'Create Document'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}

import { LegalDocumentForm } from "@/app-components/admin/legal-form"

export default function NewLegalDocumentPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Add New Legal Document</h1>
            <LegalDocumentForm />
        </div>
    )
}

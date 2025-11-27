import { PartnerForm } from "@/app-components/admin/partner-form"

export default function NewPartnerPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Add New Partner</h1>
            <PartnerForm />
        </div>
    )
}

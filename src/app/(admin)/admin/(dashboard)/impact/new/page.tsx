import { ImpactMetricForm } from "@/app-components/admin/impact-form"

export default function NewImpactMetricPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Add New Impact Metric</h1>
            <ImpactMetricForm />
        </div>
    )
}

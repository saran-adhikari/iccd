import { getGalleryImages } from "@/actions/gallery-actions"
import { AdminGallery } from "@/app-components/admin/admin-gallery"

export default async function GalleryPage() {
    const { data: images } = await getGalleryImages()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
                
            </div>

            <AdminGallery initialImages={images || []} />
        </div>
    )
}

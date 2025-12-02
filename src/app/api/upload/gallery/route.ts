import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache" // Add this import
import { uploadToSupabase } from "@/lib/supabase"

export async function POST(req: Request) {
    const session = await auth()
    if (!session) return new NextResponse("Unauthorized", { status: 401 })

    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.name.endsWith('.png') ? '.png' : '.jpg'
        const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + extension

        // Upload to Supabase Storage
        const fileUrl = await uploadToSupabase(buffer, "gallery", filename)

        // Revalidate pages that might display gallery images
        revalidatePath('/admin/gallery')
        revalidatePath('/gallery')
        revalidatePath('/')

        return NextResponse.json({ fileUrl })

    } catch (error) {
        console.error("Upload error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
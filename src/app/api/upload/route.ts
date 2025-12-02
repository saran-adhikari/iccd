import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { uploadToCloudinary } from "@/lib/cloudinary"

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

        // Upload to Cloudinary
        const fileUrl = await uploadToCloudinary(buffer, "legal", "raw")

        return NextResponse.json({ fileUrl })

    } catch (error) {
        console.error("Upload error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

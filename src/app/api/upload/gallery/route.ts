import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

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

        // Ensure directory exists
        const uploadDir = join(process.cwd(), "public", "uploads", "gallery")
        await mkdir(uploadDir, { recursive: true })

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + (file.name.endsWith('.png') ? '.png' : '.jpg') // Simple extension handling, can be improved
        const filepath = join(uploadDir, filename)

        // Write file
        await writeFile(filepath, buffer)

        // Return public URL
        const fileUrl = `/uploads/gallery/${filename}`
        return NextResponse.json({ fileUrl })

    } catch (error) {
        console.error("Upload error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

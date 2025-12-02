import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload a file to Cloudinary
 * @param buffer - File buffer
 * @param folder - Cloudinary folder (e.g., 'legal', 'gallery')
 * @param resourceType - 'image' for images, 'raw' for PDFs and other files
 * @returns Secure URL of the uploaded file
 */
export async function uploadToCloudinary(
    buffer: Buffer,
    folder: string,
    resourceType: 'image' | 'raw' = 'image'
): Promise<string> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    reject(error)
                } else if (result) {
                    resolve(result.secure_url)
                } else {
                    reject(new Error('Upload failed'))
                }
            }
        )

        uploadStream.end(buffer)
    })
}

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

/**
 * Upload a file to Supabase Storage
 * @param buffer - File buffer
 * @param bucket - Storage bucket name (e.g., 'legal', 'gallery')
 * @param filename - File name with extension
 * @returns Public URL of the uploaded file
 */
export async function uploadToSupabase(
    buffer: Buffer,
    bucket: string,
    filename: string
): Promise<string> {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, buffer, {
            contentType: 'auto',
            upsert: false
        })

    if (error) {
        console.error('Supabase upload error:', error)
        throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return publicUrl
}

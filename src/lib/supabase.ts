import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Initialize Supabase client (will be validated at runtime)
export const supabase = supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null

// Helper to ensure Supabase is configured
function ensureSupabaseConfigured() {
    if (!supabase) {
        throw new Error(
            'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment variables.'
        )
    }
    return supabase
}

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
    const client = ensureSupabaseConfigured()

    // Upload file to Supabase Storage
    const { data, error } = await client.storage
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
    const { data: { publicUrl } } = client.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return publicUrl
}


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
 * Sanitize filename to remove Unicode characters and special characters
 * Supabase Storage only accepts ASCII characters in filenames
 */
function sanitizeFilename(filename: string): string {
    // Remove file extension
    const ext = filename.substring(filename.lastIndexOf('.'))
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'))

    // Convert to ASCII by removing non-ASCII characters
    // Replace spaces and special chars with hyphens
    const sanitized = nameWithoutExt
        .normalize('NFD') // Decompose Unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters
        .replace(/[^a-zA-Z0-9-_]/g, '-') // Replace special chars with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
        .toLowerCase()

    // If sanitized name is empty, use a default
    const finalName = sanitized || 'file'

    return finalName + ext
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

    // Sanitize filename to remove Unicode characters
    const sanitizedFilename = sanitizeFilename(filename)

    // Upload file to Supabase Storage
    const { data, error } = await client.storage
        .from(bucket)
        .upload(sanitizedFilename, buffer, {
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


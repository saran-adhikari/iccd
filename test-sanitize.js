
function sanitizeFilename(filename) {
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

const uniqueSuffix = '123456789'
const originalName = 'नेपाली.pdf'
const filenameInRoute = originalName.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.pdf'

console.log('Original:', originalName)
console.log('Filename in Route:', filenameInRoute)
console.log('Sanitized:', sanitizeFilename(filenameInRoute))

const mixedName = 'Report-नेपाली-2024.pdf'
const mixedInRoute = mixedName.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.pdf'
console.log('Mixed Original:', mixedName)
console.log('Mixed In Route:', mixedInRoute)
console.log('Mixed Sanitized:', sanitizeFilename(mixedInRoute))

import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Environment variables for OLD Supabase
const OLD_SUPABASE_URL = process.env.OLD_SUPABASE_URL || '';
const OLD_SUPABASE_KEY = process.env.OLD_SUPABASE_SERVICE_KEY || '';

// Environment variables for NEW Supabase
const NEW_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const NEW_SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validate environment variables
if (!OLD_SUPABASE_URL || !OLD_SUPABASE_KEY) {
    console.error('❌ OLD_SUPABASE_URL and OLD_SUPABASE_SERVICE_KEY must be set');
    process.exit(1);
}
if (!NEW_SUPABASE_URL || !NEW_SUPABASE_KEY) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    process.exit(1);
}

// Initialize Supabase clients
const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

// Initialize Prisma
const prisma = new PrismaClient();

interface MigrationStats {
    bucket: string;
    filesDownloaded: number;
    filesUploaded: number;
    filesFailed: number;
    urlsUpdated: number;
}

async function migrateBucket(bucketName: string): Promise<MigrationStats> {
    console.log(`\n📦 Migrating bucket: ${bucketName}`);
    console.log('='.repeat(50));

    const stats: MigrationStats = {
        bucket: bucketName,
        filesDownloaded: 0,
        filesUploaded: 0,
        filesFailed: 0,
        urlsUpdated: 0,
    };

    try {
        // List all files in old bucket
        console.log(`📋 Listing files in old ${bucketName} bucket...`);
        const { data: files, error: listError } = await oldSupabase.storage
            .from(bucketName)
            .list();

        if (listError) {
            throw new Error(`Failed to list files: ${listError.message}`);
        }

        if (!files || files.length === 0) {
            console.log(`   ⚠️  No files found in ${bucketName} bucket`);
            return stats;
        }

        console.log(`   ✓ Found ${files.length} files\n`);

        // Create temp directory for downloads
        const tempDir = path.join(process.cwd(), 'temp-migration', bucketName);
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Process each file
        for (const file of files) {
            try {
                console.log(`   📥 Downloading: ${file.name}`);

                // Download file from old bucket
                const { data: fileData, error: downloadError } = await oldSupabase.storage
                    .from(bucketName)
                    .download(file.name);

                if (downloadError || !fileData) {
                    throw new Error(`Download failed: ${downloadError?.message || 'No data'}`);
                }

                stats.filesDownloaded++;

                // Convert Blob to Buffer
                const arrayBuffer = await fileData.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Save temporarily
                const tempPath = path.join(tempDir, file.name);
                fs.writeFileSync(tempPath, buffer);

                console.log(`   📤 Uploading to new bucket: ${file.name}`);

                // Upload to new bucket
                const { data: uploadData, error: uploadError } = await newSupabase.storage
                    .from(bucketName)
                    .upload(file.name, buffer, {
                        contentType: fileData.type || 'application/octet-stream',
                        upsert: true,
                    });

                if (uploadError) {
                    throw new Error(`Upload failed: ${uploadError.message}`);
                }

                stats.filesUploaded++;

                // Get old and new public URLs
                const { data: { publicUrl: oldUrl } } = oldSupabase.storage
                    .from(bucketName)
                    .getPublicUrl(file.name);

                const { data: { publicUrl: newUrl } } = newSupabase.storage
                    .from(bucketName)
                    .getPublicUrl(uploadData.path);

                console.log(`   ✓ Uploaded successfully`);
                console.log(`   Old URL: ${oldUrl}`);
                console.log(`   New URL: ${newUrl}\n`);

                // Update database URLs
                if (bucketName === 'legal') {
                    const updated = await prisma.legalDocument.updateMany({
                        where: { fileUrl: oldUrl },
                        data: { fileUrl: newUrl },
                    });
                    stats.urlsUpdated += updated.count;
                } else if (bucketName === 'gallery') {
                    const updated = await prisma.galleryImage.updateMany({
                        where: { imageUrl: oldUrl },
                        data: { imageUrl: newUrl },
                    });
                    stats.urlsUpdated += updated.count;
                }

            } catch (error) {
                console.error(`   ❌ Failed to migrate ${file.name}:`, error);
                stats.filesFailed++;
            }
        }

        // Clean up temp directory
        fs.rmSync(tempDir, { recursive: true, force: true });

        return stats;

    } catch (error) {
        console.error(`❌ Bucket migration failed:`, error);
        throw error;
    }
}

async function migrateStorage() {
    console.log('🚀 Starting Supabase Storage Migration\n');
    console.log('Old Supabase:', OLD_SUPABASE_URL);
    console.log('New Supabase:', NEW_SUPABASE_URL);
    console.log('\n');

    const allStats: MigrationStats[] = [];

    try {
        // Migrate legal bucket
        const legalStats = await migrateBucket('legal');
        allStats.push(legalStats);

        // Migrate gallery bucket
        const galleryStats = await migrateBucket('gallery');
        allStats.push(galleryStats);

        // Print summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 MIGRATION SUMMARY');
        console.log('='.repeat(50));

        let totalDownloaded = 0;
        let totalUploaded = 0;
        let totalFailed = 0;
        let totalUrlsUpdated = 0;

        allStats.forEach((stats) => {
            console.log(`\n${stats.bucket.toUpperCase()} Bucket:`);
            console.log(`  Files Downloaded: ${stats.filesDownloaded}`);
            console.log(`  Files Uploaded:   ${stats.filesUploaded}`);
            console.log(`  Files Failed:     ${stats.filesFailed}`);
            console.log(`  URLs Updated:     ${stats.urlsUpdated}`);

            totalDownloaded += stats.filesDownloaded;
            totalUploaded += stats.filesUploaded;
            totalFailed += stats.filesFailed;
            totalUrlsUpdated += stats.urlsUpdated;
        });

        console.log('\n' + '-'.repeat(50));
        console.log('TOTAL:');
        console.log(`  Files Downloaded: ${totalDownloaded}`);
        console.log(`  Files Uploaded:   ${totalUploaded}`);
        console.log(`  Files Failed:     ${totalFailed}`);
        console.log(`  URLs Updated:     ${totalUrlsUpdated}`);
        console.log('='.repeat(50));

        if (totalFailed === 0) {
            console.log('\n✅ Storage migration completed successfully!\n');
        } else {
            console.log(`\n⚠️  Migration completed with ${totalFailed} failures\n`);
        }

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run migration
migrateStorage()
    .then(() => {
        console.log('Migration process completed.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration process failed:', error);
        process.exit(1);
    });

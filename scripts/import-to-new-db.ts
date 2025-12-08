import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function importData() {
    console.log('📥 Starting data import to NEW database...\n');
    console.log('⚠️  Make sure DATABASE_URL in .env points to the NEW database!\n');

    try {
        // Find latest backup
        const backupDir = path.join(process.cwd(), 'backups');
        const dates = fs.readdirSync(backupDir);
        const latestDate = dates.sort().reverse()[0];
        const backupPath = path.join(backupDir, latestDate);
        const files = fs.readdirSync(backupPath);
        const backupFile = files.find(f => f.startsWith('backup-') && f.endsWith('.json'));

        if (!backupFile) {
            throw new Error('Backup file not found!');
        }

        console.log(`📂 Loading backup: ${backupFile}\n`);
        const backupData = JSON.parse(fs.readFileSync(path.join(backupPath, backupFile), 'utf-8'));
        const data = backupData.tables;

        // Import Users
        console.log('📦 Importing Users...');
        for (const user of data.users) {
            await prisma.user.upsert({
                where: { id: user.id },
                update: user,
                create: user,
            });
        }
        console.log(`   ✓ Imported ${data.users.length} users`);

        // Import Programs
        console.log('📦 Importing Programs...');
        for (const program of data.programs) {
            await prisma.program.upsert({
                where: { id: program.id },
                update: program,
                create: program,
            });
        }
        console.log(`   ✓ Imported ${data.programs.length} programs`);

        // Import Testimonials
        console.log('📦 Importing Testimonials...');
        for (const testimonial of data.testimonials) {
            await prisma.testimonial.upsert({
                where: { id: testimonial.id },
                update: testimonial,
                create: testimonial,
            });
        }
        console.log(`   ✓ Imported ${data.testimonials.length} testimonials`);

        // Import Partners
        console.log('📦 Importing Partners...');
        for (const partner of data.partners) {
            await prisma.partner.upsert({
                where: { id: partner.id },
                update: partner,
                create: partner,
            });
        }
        console.log(`   ✓ Imported ${data.partners.length} partners`);

        // Import Impact Metrics
        console.log('📦 Importing Impact Metrics...');
        for (const metric of data.impactMetrics) {
            await prisma.impactMetric.upsert({
                where: { id: metric.id },
                update: metric,
                create: metric,
            });
        }
        console.log(`   ✓ Imported ${data.impactMetrics.length} impact metrics`);

        // Import Legal Documents
        console.log('📦 Importing Legal Documents...');
        for (const doc of data.legalDocuments) {
            await prisma.legalDocument.upsert({
                where: { id: doc.id },
                update: doc,
                create: doc,
            });
        }
        console.log(`   ✓ Imported ${data.legalDocuments.length} legal documents`);

        // Import Gallery Images
        console.log('📦 Importing Gallery Images...');
        for (const image of data.galleryImages) {
            await prisma.galleryImage.upsert({
                where: { id: image.id },
                update: image,
                create: image,
            });
        }
        console.log(`   ✓ Imported ${data.galleryImages.length} gallery images`);

        // Import Proposal Requests
        console.log('📦 Importing Proposal Requests...');
        for (const proposal of data.proposalRequests) {
            const { programDetails, ...rest } = proposal;
            await prisma.proposalRequest.upsert({
                where: { id: proposal.id },
                update: {
                    ...rest,
                    programDetails: programDetails as Prisma.InputJsonValue,
                },
                create: {
                    ...rest,
                    programDetails: programDetails as Prisma.InputJsonValue,
                },
            });
        }
        console.log(`   ✓ Imported ${data.proposalRequests.length} proposal requests`);

        // Import Contact Requests
        console.log('📦 Importing Contact Requests...');
        for (const contact of data.contactRequests) {
            await prisma.contactRequest.upsert({
                where: { id: contact.id },
                update: contact,
                create: contact,
            });
        }
        console.log(`   ✓ Imported ${data.contactRequests.length} contact requests`);

        console.log('\n✅ Data import completed successfully!');
        console.log('📊 Total records imported:');
        console.log(`   - Users: ${data.users.length}`);
        console.log(`   - Programs: ${data.programs.length}`);
        console.log(`   - Testimonials: ${data.testimonials.length}`);
        console.log(`   - Partners: ${data.partners.length}`);
        console.log(`   - Impact Metrics: ${data.impactMetrics.length}`);
        console.log(`   - Legal Documents: ${data.legalDocuments.length}`);
        console.log(`   - Gallery Images: ${data.galleryImages.length}`);
        console.log(`   - Proposal Requests: ${data.proposalRequests.length}`);
        console.log(`   - Contact Requests: ${data.contactRequests.length}`);
        console.log(`   - TOTAL: ${data.users.length +
            data.programs.length +
            data.testimonials.length +
            data.partners.length +
            data.impactMetrics.length +
            data.legalDocuments.length +
            data.galleryImages.length +
            data.proposalRequests.length +
            data.contactRequests.length
            }\n`);

    } catch (error) {
        console.error('❌ Import failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

importData()
    .then(() => {
        console.log('Import process completed.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Import process failed:', error);
        process.exit(1);
    });

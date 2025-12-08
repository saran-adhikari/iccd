import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface BackupData {
    timestamp: string;
    databaseUrl: string;
    tables: {
        [key: string]: any[];
    };
    counts: {
        [key: string]: number;
    };
}

async function backupDatabase() {
    console.log('🔄 Starting database backup...\n');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(process.cwd(), 'backups', timestamp.split('T')[0]);

    // Create backup directory
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupData: BackupData = {
        timestamp: new Date().toISOString(),
        databaseUrl: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@') || 'unknown',
        tables: {},
        counts: {},
    };

    try {
        // Backup Users
        console.log('📦 Backing up Users...');
        const users = await prisma.user.findMany();
        backupData.tables.users = users;
        backupData.counts.users = users.length;
        console.log(`   ✓ ${users.length} users backed up`);

        // Backup Programs
        console.log('📦 Backing up Programs...');
        const programs = await prisma.program.findMany();
        backupData.tables.programs = programs;
        backupData.counts.programs = programs.length;
        console.log(`   ✓ ${programs.length} programs backed up`);

        // Backup Testimonials
        console.log('📦 Backing up Testimonials...');
        const testimonials = await prisma.testimonial.findMany();
        backupData.tables.testimonials = testimonials;
        backupData.counts.testimonials = testimonials.length;
        console.log(`   ✓ ${testimonials.length} testimonials backed up`);

        // Backup Partners
        console.log('📦 Backing up Partners...');
        const partners = await prisma.partner.findMany();
        backupData.tables.partners = partners;
        backupData.counts.partners = partners.length;
        console.log(`   ✓ ${partners.length} partners backed up`);

        // Backup Impact Metrics
        console.log('📦 Backing up Impact Metrics...');
        const impactMetrics = await prisma.impactMetric.findMany();
        backupData.tables.impactMetrics = impactMetrics;
        backupData.counts.impactMetrics = impactMetrics.length;
        console.log(`   ✓ ${impactMetrics.length} impact metrics backed up`);

        // Backup Legal Documents
        console.log('📦 Backing up Legal Documents...');
        const legalDocuments = await prisma.legalDocument.findMany();
        backupData.tables.legalDocuments = legalDocuments;
        backupData.counts.legalDocuments = legalDocuments.length;
        console.log(`   ✓ ${legalDocuments.length} legal documents backed up`);

        // Backup Gallery Images
        console.log('📦 Backing up Gallery Images...');
        const galleryImages = await prisma.galleryImage.findMany();
        backupData.tables.galleryImages = galleryImages;
        backupData.counts.galleryImages = galleryImages.length;
        console.log(`   ✓ ${galleryImages.length} gallery images backed up`);

        // Backup Proposal Requests
        console.log('📦 Backing up Proposal Requests...');
        const proposalRequests = await prisma.proposalRequest.findMany();
        backupData.tables.proposalRequests = proposalRequests;
        backupData.counts.proposalRequests = proposalRequests.length;
        console.log(`   ✓ ${proposalRequests.length} proposal requests backed up`);

        // Backup Contact Requests
        console.log('📦 Backing up Contact Requests...');
        const contactRequests = await prisma.contactRequest.findMany();
        backupData.tables.contactRequests = contactRequests;
        backupData.counts.contactRequests = contactRequests.length;
        console.log(`   ✓ ${contactRequests.length} contact requests backed up`);

        // Save backup to file
        const backupFilePath = path.join(backupDir, `backup-${timestamp}.json`);
        fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));

        // Create summary file
        const summaryPath = path.join(backupDir, 'backup-summary.txt');
        const summary = `
Database Backup Summary
=======================
Timestamp: ${backupData.timestamp}
Database: ${backupData.databaseUrl}

Record Counts:
--------------
Users:             ${backupData.counts.users}
Programs:          ${backupData.counts.programs}
Testimonials:      ${backupData.counts.testimonials}
Partners:          ${backupData.counts.partners}
Impact Metrics:    ${backupData.counts.impactMetrics}
Legal Documents:   ${backupData.counts.legalDocuments}
Gallery Images:    ${backupData.counts.galleryImages}
Proposal Requests: ${backupData.counts.proposalRequests}
Contact Requests:  ${backupData.counts.contactRequests}
--------------
Total Records:     ${Object.values(backupData.counts).reduce((a, b) => a + b, 0)}

Backup File: ${backupFilePath}
File Size: ${(fs.statSync(backupFilePath).size / 1024).toFixed(2)} KB
`;

        fs.writeFileSync(summaryPath, summary);

        console.log('\n✅ Backup completed successfully!');
        console.log(`📁 Backup location: ${backupDir}`);
        console.log(`📊 Total records: ${Object.values(backupData.counts).reduce((a, b) => a + b, 0)}`);
        console.log(`💾 File size: ${(fs.statSync(backupFilePath).size / 1024).toFixed(2)} KB\n`);

        return backupFilePath;
    } catch (error) {
        console.error('❌ Backup failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run backup
backupDatabase()
    .then((backupPath) => {
        console.log(`Backup saved to: ${backupPath}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Backup process failed:', error);
        process.exit(1);
    });

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
    table: string;
    oldCount: number;
    newCount: number;
    match: boolean;
    difference: number;
}

async function verifyMigration() {
    console.log('🔍 Starting migration verification...\n');

    // Load backup data for old database counts
    const backupDir = path.join(process.cwd(), 'backups');
    const dates = fs.readdirSync(backupDir);
    const latestDate = dates.sort().reverse()[0];
    const backupPath = path.join(backupDir, latestDate);
    const files = fs.readdirSync(backupPath);
    const backupFile = files.find(f => f.startsWith('backup-') && f.endsWith('.json'));

    if (!backupFile) {
        throw new Error('Backup file not found!');
    }

    const backupData = JSON.parse(fs.readFileSync(path.join(backupPath, backupFile), 'utf-8'));
    const oldCounts = backupData.counts;

    console.log('📊 Comparing record counts...\n');
    console.log('⚠️  Make sure DATABASE_URL in .env points to the NEW database!\n');

    const prisma = new PrismaClient();
    const results: VerificationResult[] = [];
    let allMatch = true;

    try {
        // Verify Users
        console.log('Checking Users...');
        const newUsers = await prisma.user.count();
        const usersMatch = oldCounts.users === newUsers;
        results.push({
            table: 'Users',
            oldCount: oldCounts.users,
            newCount: newUsers,
            match: usersMatch,
            difference: newUsers - oldCounts.users,
        });
        console.log(`   Old: ${oldCounts.users} | New: ${newUsers} | ${usersMatch ? '✓' : '✗'}`);
        if (!usersMatch) allMatch = false;

        // Verify Programs
        console.log('Checking Programs...');
        const newPrograms = await prisma.program.count();
        const programsMatch = oldCounts.programs === newPrograms;
        results.push({
            table: 'Programs',
            oldCount: oldCounts.programs,
            newCount: newPrograms,
            match: programsMatch,
            difference: newPrograms - oldCounts.programs,
        });
        console.log(`   Old: ${oldCounts.programs} | New: ${newPrograms} | ${programsMatch ? '✓' : '✗'}`);
        if (!programsMatch) allMatch = false;

        // Verify Testimonials
        console.log('Checking Testimonials...');
        const newTestimonials = await prisma.testimonial.count();
        const testimonialsMatch = oldCounts.testimonials === newTestimonials;
        results.push({
            table: 'Testimonials',
            oldCount: oldCounts.testimonials,
            newCount: newTestimonials,
            match: testimonialsMatch,
            difference: newTestimonials - oldCounts.testimonials,
        });
        console.log(`   Old: ${oldCounts.testimonials} | New: ${newTestimonials} | ${testimonialsMatch ? '✓' : '✗'}`);
        if (!testimonialsMatch) allMatch = false;

        // Verify Partners
        console.log('Checking Partners...');
        const newPartners = await prisma.partner.count();
        const partnersMatch = oldCounts.partners === newPartners;
        results.push({
            table: 'Partners',
            oldCount: oldCounts.partners,
            newCount: newPartners,
            match: partnersMatch,
            difference: newPartners - oldCounts.partners,
        });
        console.log(`   Old: ${oldCounts.partners} | New: ${newPartners} | ${partnersMatch ? '✓' : '✗'}`);
        if (!partnersMatch) allMatch = false;

        // Verify Impact Metrics
        console.log('Checking Impact Metrics...');
        const newMetrics = await prisma.impactMetric.count();
        const metricsMatch = oldCounts.impactMetrics === newMetrics;
        results.push({
            table: 'Impact Metrics',
            oldCount: oldCounts.impactMetrics,
            newCount: newMetrics,
            match: metricsMatch,
            difference: newMetrics - oldCounts.impactMetrics,
        });
        console.log(`   Old: ${oldCounts.impactMetrics} | New: ${newMetrics} | ${metricsMatch ? '✓' : '✗'}`);
        if (!metricsMatch) allMatch = false;

        // Verify Legal Documents
        console.log('Checking Legal Documents...');
        const newDocs = await prisma.legalDocument.count();
        const docsMatch = oldCounts.legalDocuments === newDocs;
        results.push({
            table: 'Legal Documents',
            oldCount: oldCounts.legalDocuments,
            newCount: newDocs,
            match: docsMatch,
            difference: newDocs - oldCounts.legalDocuments,
        });
        console.log(`   Old: ${oldCounts.legalDocuments} | New: ${newDocs} | ${docsMatch ? '✓' : '✗'}`);
        if (!docsMatch) allMatch = false;

        // Verify Gallery Images
        console.log('Checking Gallery Images...');
        const newImages = await prisma.galleryImage.count();
        const imagesMatch = oldCounts.galleryImages === newImages;
        results.push({
            table: 'Gallery Images',
            oldCount: oldCounts.galleryImages,
            newCount: newImages,
            match: imagesMatch,
            difference: newImages - oldCounts.galleryImages,
        });
        console.log(`   Old: ${oldCounts.galleryImages} | New: ${newImages} | ${imagesMatch ? '✓' : '✗'}`);
        if (!imagesMatch) allMatch = false;

        // Verify Proposal Requests
        console.log('Checking Proposal Requests...');
        const newProposals = await prisma.proposalRequest.count();
        const proposalsMatch = oldCounts.proposalRequests === newProposals;
        results.push({
            table: 'Proposal Requests',
            oldCount: oldCounts.proposalRequests,
            newCount: newProposals,
            match: proposalsMatch,
            difference: newProposals - oldCounts.proposalRequests,
        });
        console.log(`   Old: ${oldCounts.proposalRequests} | New: ${newProposals} | ${proposalsMatch ? '✓' : '✗'}`);
        if (!proposalsMatch) allMatch = false;

        // Verify Contact Requests
        console.log('Checking Contact Requests...');
        const newContacts = await prisma.contactRequest.count();
        const contactsMatch = oldCounts.contactRequests === newContacts;
        results.push({
            table: 'Contact Requests',
            oldCount: oldCounts.contactRequests,
            newCount: newContacts,
            match: contactsMatch,
            difference: newContacts - oldCounts.contactRequests,
        });
        console.log(`   Old: ${oldCounts.contactRequests} | New: ${newContacts} | ${contactsMatch ? '✓' : '✗'}`);
        if (!contactsMatch) allMatch = false;

        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('VERIFICATION SUMMARY');
        console.log('='.repeat(60));
        console.log('Table                  | Old DB | New DB | Match | Diff');
        console.log('-'.repeat(60));

        results.forEach((result) => {
            const status = result.match ? '✓' : '✗';
            const diff = result.difference >= 0 ? `+${result.difference}` : `${result.difference}`;
            console.log(
                `${result.table.padEnd(22)} | ${String(result.oldCount).padStart(6)} | ${String(result.newCount).padStart(6)} | ${status.padEnd(5)} | ${diff}`
            );
        });

        console.log('-'.repeat(60));

        const totalOld = results.reduce((sum, r) => sum + r.oldCount, 0);
        const totalNew = results.reduce((sum, r) => sum + r.newCount, 0);
        const totalDiff = totalNew - totalOld;

        console.log(
            `${'TOTAL'.padEnd(22)} | ${String(totalOld).padStart(6)} | ${String(totalNew).padStart(6)} | ${(allMatch ? '✓' : '✗').padEnd(5)} | ${totalDiff >= 0 ? `+${totalDiff}` : totalDiff}`
        );
        console.log('='.repeat(60));

        if (allMatch) {
            console.log('\n✅ Migration verification PASSED! All data transferred successfully.\n');
        } else {
            console.log('\n⚠️  Migration verification FAILED! Some data is missing or extra.\n');
            console.log('Please review the differences above and investigate.\n');
        }

        return allMatch;
    } catch (error) {
        console.error('❌ Verification failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run verification
verifyMigration()
    .then((success) => {
        process.exit(success ? 0 : 1);
    })
    .catch((error) => {
        console.error('Verification process failed:', error);
        process.exit(1);
    });

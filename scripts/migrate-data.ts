import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

async function migrateDatabase() {
    console.log('🚀 Starting database migration process...\n');

    try {
        // Step 1: Export data from old database
        console.log('📤 Step 1: Exporting data from old database...');
        const backupPath = path.join(process.cwd(), 'backups', new Date().toISOString().split('T')[0]);

        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
        }

        // Run backup using the old database
        await execAsync('npx tsx scripts/backup-database.ts');
        console.log('✓ Data exported successfully\n');

        // Step 2: Import data to new database
        console.log('📥 Step 2: Importing data to new database...');
        console.log('   Reading backup file...');

        // Find the latest backup file
        const files = fs.readdirSync(backupPath);
        const backupFile = files.find(f => f.startsWith('backup-') && f.endsWith('.json'));

        if (!backupFile) {
            throw new Error('Backup file not found!');
        }

        const backupData = JSON.parse(fs.readFileSync(path.join(backupPath, backupFile), 'utf-8'));
        console.log('✓ Backup file loaded\n');

        // Step 3: Switch to new database and import
        console.log('📝 Step 3: Writing data to new database...');
        console.log('   This will use NEW_DATABASE_URL from your .env file\n');

        // Create import script
        const importScript = `
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NEW_DATABASE_URL,
    },
  },
});

async function importData() {
  const data = ${JSON.stringify(backupData.tables, null, 2)};
  
  try {
    await prisma.$connect();
    console.log('✓ Connected to new database');

    // Import Users
    console.log('📦 Importing Users...');
    for (const user of data.users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
      });
    }
    console.log(\`   ✓ Imported \${data.users.length} users\`);

    // Import Programs
    console.log('📦 Importing Programs...');
    for (const program of data.programs) {
      await prisma.program.upsert({
        where: { id: program.id },
        update: program,
        create: program,
      });
    }
    console.log(\`   ✓ Imported \${data.programs.length} programs\`);

    // Import Testimonials
    console.log('📦 Importing Testimonials...');
    for (const testimonial of data.testimonials) {
      await prisma.testimonial.upsert({
        where: { id: testimonial.id },
        update: testimonial,
        create: testimonial,
      });
    }
    console.log(\`   ✓ Imported \${data.testimonials.length} testimonials\`);

    // Import Partners
    console.log('📦 Importing Partners...');
    for (const partner of data.partners) {
      await prisma.partner.upsert({
        where: { id: partner.id },
        update: partner,
        create: partner,
      });
    }
    console.log(\`   ✓ Imported \${data.partners.length} partners\`);

    // Import Impact Metrics
    console.log('📦 Importing Impact Metrics...');
    for (const metric of data.impactMetrics) {
      await prisma.impactMetric.upsert({
        where: { id: metric.id },
        update: metric,
        create: metric,
      });
    }
    console.log(\`   ✓ Imported \${data.impactMetrics.length} impact metrics\`);

    // Import Legal Documents
    console.log('📦 Importing Legal Documents...');
    for (const doc of data.legalDocuments) {
      await prisma.legalDocument.upsert({
        where: { id: doc.id },
        update: doc,
        create: doc,
      });
    }
    console.log(\`   ✓ Imported \${data.legalDocuments.length} legal documents\`);

    // Import Gallery Images
    console.log('📦 Importing Gallery Images...');
    for (const image of data.galleryImages) {
      await prisma.galleryImage.upsert({
        where: { id: image.id },
        update: image,
        create: image,
      });
    }
    console.log(\`   ✓ Imported \${data.galleryImages.length} gallery images\`);

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
    console.log(\`   ✓ Imported \${data.proposalRequests.length} proposal requests\`);

    // Import Contact Requests
    console.log('📦 Importing Contact Requests...');
    for (const contact of data.contactRequests) {
      await prisma.contactRequest.upsert({
        where: { id: contact.id },
        update: contact,
        create: contact,
      });
    }
    console.log(\`   ✓ Imported \${data.contactRequests.length} contact requests\`);

    console.log('\\n✅ Data import completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
`;

        // Write import script
        const importScriptPath = path.join(process.cwd(), 'scripts', 'import-data-temp.ts');
        fs.writeFileSync(importScriptPath, importScript);

        // Run import script
        await execAsync('npx tsx scripts/import-data-temp.ts');

        // Clean up temp script
        fs.unlinkSync(importScriptPath);

        console.log('\n✅ Migration completed successfully!');
        console.log('\n🔍 Next step: Run verification script');
        console.log('   npx tsx scripts/verify-migration.ts\n');

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        throw error;
    }
}

migrateDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

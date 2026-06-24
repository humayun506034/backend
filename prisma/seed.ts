import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

type SeedPreorder = {
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string | null;
  isActive: boolean;
};

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');

  if (!existsSync(envPath)) return;

  const envFile = readFileSync(envPath, 'utf8');

  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    if (!match || process.env[match[1]] !== undefined) continue;

    const value = match[2] ?? '';
    process.env[match[1]] = value.replace(/^['"]|['"]$/g, '');
  }
}

function readSeedData(): SeedPreorder[] {
  const filePath = resolve(process.cwd(), 'prisma/seed-data/preorders.json');
  const seedData = JSON.parse(readFileSync(filePath, 'utf8')) as SeedPreorder[];

  return seedData;
}

function normalizeConnectionString(connectionString: string): string {
  const url = new URL(connectionString);

  if (url.searchParams.get('sslmode') === 'require') {
    url.searchParams.set('sslmode', 'verify-full');
  }

  return url.toString();
}

async function main() {
  loadEnvFile();

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is missing in .env');
  }

  const normalizedConnectionString = normalizeConnectionString(connectionString);
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: normalizedConnectionString }),
  });

  const preorders = readSeedData();

  console.log('Starting preorder seed...');
  console.log(`Found ${preorders.length} preorder records in JSON.`);

  const result = await prisma.preorder.createMany({
    data: preorders.map((p) => ({
      name: p.name,
      products: p.products,
      preorderWhen: p.preorderWhen,
      startsAt: new Date(p.startsAt),
      endsAt: p.endsAt ? new Date(p.endsAt) : null,
      isActive: p.isActive,
    })),
  });

  await prisma.$disconnect();

  console.log('Seed completed successfully.');
  console.log(`Inserted records: ${result.count}`);
  console.log('Database is ready to use.');
}

void main().catch((err) => {
  console.error('Seed failed.');
  console.error(err);
  process.exit(1);
});

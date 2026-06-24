import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import {
  Prisma,
  PrismaClient as PrismaClientBase,
} from '../../generated/prisma/client';
import type { PrismaClient as PrismaClientType } from '../../generated/prisma/client';

const PrismaClient = PrismaClientBase as unknown as new (
  options: Prisma.PrismaClientOptions,
) => PrismaClientType;

type PrismaPgAdapter = NonNullable<Prisma.PrismaClientOptions['adapter']>;
type PrismaPgConstructor = new (config: {
  connectionString: string;
}) => PrismaPgAdapter;

const requirePackage = createRequire(__filename);

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');

  if (!existsSync(envPath)) {
    return;
  }

  const envFile = readFileSync(envPath, 'utf8');

  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    if (!match || process.env[match[1]] !== undefined) {
      continue;
    }

    const value = match[2] ?? '';
    process.env[match[1]] = value.replace(/^['"]|['"]$/g, '');
  }
}

function createPrismaAdapter(): PrismaPgAdapter {
  loadEnvFile();

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is missing in .env');
  }

  try {
    const adapterPackage = requirePackage('@prisma/adapter-pg') as {
      PrismaPg: PrismaPgConstructor;
    };

    return new adapterPackage.PrismaPg({ connectionString });
  } catch (error) {
    throw new Error(
      'Prisma 7 PostgreSQL requires @prisma/adapter-pg and pg. Run: npm install @prisma/adapter-pg pg',
      { cause: error },
    );
  }
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ adapter: createPrismaAdapter() });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

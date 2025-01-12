import { linkListExtension } from '@/prisma/extension/link-list-extension';
import { PrismaClient } from '@prisma/client';

const env = process.env;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

const basePrisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
	});

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma;

export const prisma = basePrisma.$extends(linkListExtension);

export type Prisma = typeof prisma;

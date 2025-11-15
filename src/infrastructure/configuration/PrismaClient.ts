
// @ts-ignore
import { PrismaClient as PrismaClientORM } from '@prisma/client';

export class PrismaClient {
    private static instance: PrismaClientORM;

    private constructor() {}

    public static getInstance(): PrismaClientORM {
        if (!PrismaClient.instance) {
            PrismaClient.instance = new PrismaClientORM({
                log: ['error', 'warn', 'query'],
            });
        }
        return PrismaClient.instance;
    }
}

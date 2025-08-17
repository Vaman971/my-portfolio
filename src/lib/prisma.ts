// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global Prisma in dev to avoid too many clients on hot-reload
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

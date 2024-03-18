import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";

import { env } from "~/env.mjs";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  if (!globalForPrisma.prisma) {
    const libsql = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });
    const adapter = new PrismaLibSQL(libsql);
    const prisma = new PrismaClient({
      adapter,
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
    return prisma;
  }
  return globalForPrisma.prisma;
};

export const prisma = createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Prisma client for database operations.
 *
 * @file packages/db/src/client.ts
 * @author Andy Zheng
 * @since 10.04.2025
 */

import { PrismaClient } from "../node_modules/.prisma/client/index";
import { env } from "./env";

// Global declaration for development mode to prevent multiple instances.
const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create and a prisma client with appropriate settings.
 *
 * @returns {PrismaClient} The Prisma client instance.
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],

    errorFormat: env.NODE_ENV === "development" ? "pretty" : "minimal",
  });
}

// Export the client instance.
export const prisma: PrismaClient = globalPrisma.prisma ?? createPrismaClient();

// Only set the global client in development mode to prevent multiple instances.
if (env.NODE_ENV === "development") {
  globalPrisma.prisma = prisma;
}

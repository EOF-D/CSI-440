/**
 * Database utility functions.
 *
 * @file packages/db/src/utils.ts
 * @author Andy Zheng
 * @since 10.04.2025
 */

import { prisma } from "./client";
import { env } from "./env";

export const dbUtils = {
  /**
   * Health check for database connection.
   */
  async healthCheck(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get database connection info.
   */
  async getConnectionInfo() {
    try {
      const result = await prisma.$queryRaw<
        Array<{ version: string }>
      >`SELECT version()`;
      return {
        connected: true,
        version: result[0]?.version || "Unknown",
        environment: env.NODE_ENV || "Unknown",
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
        environment: env.NODE_ENV || "Unknown",
      };
    }
  },
} as const;

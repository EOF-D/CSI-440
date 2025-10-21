/**
 * Environment variable validation for database package.
 *
 * @file packages/db/src/env.ts
 * @author Andy Zheng
 * @since 10.04.2025
 */

import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = envSchema.parse(process.env);

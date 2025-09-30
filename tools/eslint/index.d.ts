/**
 * Type declarations for ESLint configuration.
 *
 * @file tools/eslint/index.d.ts
 * @author Andy Zheng
 * @since 06.25.2025
 */

import type { Linter } from "eslint";

/**
 * Base ESLint configuration for Alchemy projects.
 */
export declare const baseConfig: Linter.FlatConfig[];

/**
 * Default configuration export.
 */
export declare const config: Linter.FlatConfig[];

/**
 * Default export (same as baseConfig).
 */
declare const _default: Linter.FlatConfig[];
export default _default;

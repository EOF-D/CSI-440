/**
 * ESLint configuration file.
 *
 * @file tools/eslint/index.js
 * @author Andy Zheng
 * @since 06.25.2025
 */

import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * Base ESLint configuration for Alchemy projects.
 * @type {import("typescript-eslint").Config}
 */
export const baseConfig = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            // Turbo rules.
            "turbo/no-undeclared-env-vars": "warn",

            // TypeScript rules.
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",

            // General rules.
            "prefer-const": "error",
            "no-var": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],
        },
    },
    {
        ignores: [
            "**/dist/**",
            "**/build/**",
            "**/.next/**",
            "**/node_modules/**",
            "**/.turbo/**",
            "**/coverage/**",
            "**/.env*",
            "**/public/**",
        ],
    },
];

/**
 * Default configuration export.
 * @type {import("typescript-eslint").Config}
 */
export const config = baseConfig;

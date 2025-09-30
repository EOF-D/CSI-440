/**
 * Prettier configuration file.
 *
 * @file tools/prettier/index.ts
 * @author Andy Zheng
 * @since 06.25.2025
 */

/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    rangeStart: 0,
    requirePragma: false,
    insertPragma: false,
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    singleAttributePerLine: false,
    overrides: [
        {
            files: ["*.json", "*.jsonc"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["*.md", "*.mdx"],
            options: {
                printWidth: 100,
                proseWrap: "always",
            },
        },
    ],
};

export default config;

import { baseConfig } from "@champlain/eslint-config";

export default [
    ...baseConfig,
    {
        rules: {
            "no-console": "off",
            "padding-line-between-statements": "off",
        },
    },
];

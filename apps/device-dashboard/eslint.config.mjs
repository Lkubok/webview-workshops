import { config as nextJsConfig } from "../../packages/eslint-config/next.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Next.js specific adjustments
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "warn", // Warn instead of error for content
    },
  },
];
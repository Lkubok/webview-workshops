import { config as nextJsConfig } from "../../packages/eslint-config/next.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...nextJsConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Next.js specific adjustments
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "warn", // Warn instead of error for content
    },
  },
];
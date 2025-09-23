import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/build/**",
      "**/out/**",
      "apps/*/expo-env.d.ts",
      "apps/*/.expo/**",
    ],
  },
];
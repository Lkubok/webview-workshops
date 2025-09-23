import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".expo/**",
      "expo-env.d.ts",
      "**/*.generated.{js,ts}",
    ],
    rules: {
      // Expo/React Native specific adjustments
      "@typescript-eslint/no-require-imports": "off",
      "react/prop-types": "off", // Using TypeScript for prop validation
    },
  },
];
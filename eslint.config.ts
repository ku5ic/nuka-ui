import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import nukaPlugin from "./tools/eslint-plugin-nuka/index.js";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks as never,
      nuka: nukaPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  },
  {
    files: [
      "eslint.config.ts",
      "vite.config.ts",
      "vitest.config.ts",
      ".storybook/*.ts",
      ".storybook/*.tsx",
    ],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.tsx"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["src/components/**/*.tsx", "src/utils/**/*.tsx"],
    rules: {
      "nuka/require-use-client": "error",
    },
  },
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "storybook-static/**",
      "node_modules/**",
      "tools/**",
    ],
  },
  prettierConfig, // must be last
);

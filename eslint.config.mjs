import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
// import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    ignores: [
      "_site/**",
      ".jekyll-cache/**",
      "vendor/**",
      "node_modules/**",
      "dist/**",
      "**/*.min.js",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
    },
  },
  // TODO: update when import plugin supports eslint v10
  // {
  //   plugins: { import: importPlugin },
  //   settings: {
  //     "import/resolver": { node: true, typescript: true },
  //   },
  //   rules: {
  //     "import/no-duplicates": "error",
  //     "import/no-unresolved": "off",
  //     "import/oder": [
  //       "warn",
  //       {
  //         groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "type"],
  //         "newlines-between": "always",
  //         alphabetize: { order: "asc", caseInsensitive: true },
  //       },
  //     ],
  //   },
  // },
  {
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  eslintConfigPrettier,
]);

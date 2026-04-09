/** @type {import("prettier").Config} */
export default {
  plugins: ["@shopify/prettier-plugin-liquid"],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  trailingComma: "es5",
  bracketSpacing: true,
  endOfLine: "lf",
  overrides: [
    {
      files: "*.md",
      options: {
        parser: "markdown",
        proseWrap: "preserve",
        embeddedLanguageFormatting: "off",
      },
    },
    {
      files: "*.html",
      options: {
        parser: "liquid-html",
        printWidth: 120,
        singleLineLinkTags: true,
        indentSchema: true,
      },
    },
    {
      files: ["*.css"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      options: {
        parser: "typescript",
      },
    },
  ],
};

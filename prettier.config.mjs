/** @type {import("prettier").Config} */
export default {
  "plugins": ["@shopify/prettier-plugin-liquid"],
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "proseWrap": "always"
      }
    }
  ]
}
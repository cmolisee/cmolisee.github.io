export default {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Errors
    "no-unused-vars": "error",
    "no-console": "off",
    eqeqeq: ["error", "always"],
    curly: "error",
    // Style (handled by Prettier, set to off to avoid conflicts)
    semi: "off",
    quotes: "off",
    indent: "off",
  },
};

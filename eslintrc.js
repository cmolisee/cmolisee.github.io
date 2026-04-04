module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    //Errors
    "no-unused-vars": "warn",
    "no-console": "off",
    eqeqeq: ["error", "always"],
    curly: "error",
    //  Style (set off, prefer prettier)
    semi: "off",
    quotes: "off",
    indent: "off",
  },
};

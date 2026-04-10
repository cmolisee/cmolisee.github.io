const tailwindAtRules = [
  "theme",
  "source",
  "utility",
  "variant",
  "custom-cariant",
  "tailwind",
  "apply",
  "layer",
  "config",
  "plugin",
  "screen",
  "responsive",
  "variants",
];

/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: tailwindAtRules }],
    "function-no-unknown": [true, { ignoreFunctions: ["theme", "screen"] }],
    "import-notation": null,
    "no-descending-specificity": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "alpha-value-notation": ["percentage", { exceptProperties: ["opacity"] }],
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      { message: "Expected calss selector to be kebab-case" },
    ],
  },
  ignoreFiles: [
    "_site/**",
    "assets/css/main.css",
    ".jekyll-cache/**",
    "node_modules/**",
    "**/*.min.css",
  ],
};

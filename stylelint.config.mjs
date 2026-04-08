/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
    "stylelint-config-html",
  ],
  ignoreFiles: ["_site/**/*", "node_modules/**/*"],
  rules: {
    // "alpha-value-notation": "percentage",
    // "at-rule-empty-line-before": [
    //   "always",
    //   {
    //     except: ["first-nested", "blockless-after-blockless"],
    //     ignore: ["after-comment", "inside-block"],
    //   },
    // ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "theme",
          "plugin",
          "variant",
          "utility",
          "source",
          "config",
        ],
      },
    ],
    // "color-function-notation": "modern",
    // "color-named": "never",
    // "comment-empty-line-before": [
    //   "always",
    //   {
    //     except: ["first-nested"],
    //     ignore: ["after-comment", "stylelint-commands"],
    //   },
    // ],
    // "custom-property-empty-line-before": [
    //   "always",
    //   {
    //     except: ["after-custom-property", "first-nested"],
    //     ignore: ["after-comment", "inside-single-line-block"],
    //   },
    // ],
    // "custom-property-pattern": [
    //   "^(tw-|color-|font-|spacing-|radius-|shadow-|ease-|duration-|z-|bg-|text-|border-|accent-|prose-)[a-zA-Z0-9-]+$|^[a-z][a-zA-Z0-9-]*$",
    //   {
    //     message:
    //       "Custom properties must follow project naming conventions (kebab-case with allowed prefixes)",
    //   },
    // ],
    // "declaration-block-no-redundant-longhand-properties": true,
    // "declaration-empty-line-before": null,
    // "font-family-name-quotes": "always-where-recommended",
    // "function-no-unknown": [
    //   true,
    //   {
    //     ignoreFunctions: ["theme", "screen", "color-mix", "oklch", "rgb", "hsl"],
    //   },
    // ],
    // "import-notation": "string",
    // "length-zero-no-unit": [
    //   true,
    //   {
    //     ignore: ["custom-properties"],
    //   },
    // ],
    // "media-feature-range-notation": "context",
    // "no-descending-specificity": null,
    // "rule-empty-line-before": [
    //   "always-multi-line",
    //   {
    //     except: ["first-nested"],
    //     ignore: ["after-comment"],
    //   },
    // ],
    // "selector-class-pattern": [
    //   "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^(prose|dark|light|not-prose)([-_][a-zA-Z0-9]+)*$",
    //   {
    //     message: "Class selectors should be kebab-case or a recognised Tailwind pattern",
    //   },
    // ],
    // "selector-pseudo-class-no-unknown": [
    //   true,
    //   {
    //     ignorePseudoClasses: ["global", "local"],
    //   },
    // ],
    // "selector-pseudo-element-no-unknown": [
    //   true,
    //   {
    //     ignorePseudoElements: [
    //       "webkit-scrollbar",
    //       "webkit-scrollbar-track",
    //       "webkit-scrollbar-thumb",
    //     ],
    //   },
    // ],
    // "shorthand-property-no-redundant-values": true,
    // "value-keyword-case": [
    //   "lower",
    //   {
    //     ignoreKeywords: ["currentColor", "optimizeLegibility", "IBM", "Plex"],
    //   },
    // ],
  },
  overrides: [
    {
      customSyntax: "postcss-markdown",
      files: ["README.md"]
    },
  ],
};

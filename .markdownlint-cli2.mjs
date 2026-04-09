/** @type {import("markdownlint-cli2").Options} */
export default {
  config: {
    default: true,
    MD013: false,
    MD033: false,
    MD041: false,
    MD034: false,
    MD024: { singlings_only: true },
    MD029: { style: "ordered" },
    MD036: false,
    MD040: false,
    MD009: { br_spaces: 2, list_item_empty_lines: false, strict: false },
    MD004: { style: "dash" },
    MD046: { style: "fenced" },
    MD048: { style: "backtick" },
    MD022: true,
    MD031: true,
    MD032: true,
  },
  globs: ["**/*.md"],
  ignores: ["_site/**", ".jekyll-cache/**", "node_modules/**", "CHANGELOG.md"],
};

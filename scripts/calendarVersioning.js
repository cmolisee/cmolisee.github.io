#!/usr/bin/env node
/**
 * scripts/calver-bump.js
 *
 * Updates the CalVer version string in:
 *   - _config.yml  (version: "YYYY.MM.DD")
 *   - package.json (version: "YYYY.M.D")
 *
 * Usage:  node scripts/calver-bump.js
 *   or:   npm run release
 */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

// Build date parts
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");

// Jekyll _config.yml uses zero-padded "YYYY.MM.DD"
const calverPadded = `${year}.${month}.${day}`;

// package.json uses non-padded semver-compatible "YYYY.M.D"
const calverNpm = `${year}.${now.getMonth() + 1}.${now.getDate()}`;

// ── Update _config.yml ────────────────────────────────────────────────────────
const configPath = path.join(root, "_config.yml");
let config = fs.readFileSync(configPath, "utf8");
config = config.replace(/^version:\s*["']?.+?["']?\s*$/m, `version: "${calverPadded}"`);
fs.writeFileSync(configPath, config, "utf8");
console.log(`✔  _config.yml  → version: "${calverPadded}"`);

// ── Update package.json ───────────────────────────────────────────────────────
const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.version = calverNpm;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
console.log(`✔  package.json → version: "${calverNpm}"`);

console.log(`\n🚀  Released ${calverPadded}`);
---
layout: doc
title: A TEST
description: How to install dependencies and run the site locally.
date: 2026-03-29
order: 2
---

## Prerequisites

- **Ruby** ≥ 3.1 and **Bundler** (`gem install bundler`)
- **Node.js** ≥ 18 and **npm**

## 1. Install Ruby gems

```bash
bundle install
```

## 2. Install Node packages

```bash
npm install
```

## 3. Run the development server

The `dev` script runs Jekyll and the Tailwind CSS watcher concurrently:

```bash
npm run dev
```

The site will be available at `http://localhost:4000`.

## 4. Build for production

```bash
npm run build
```

This compiles Tailwind (purging unused classes) and builds the Jekyll site into `_site/`.

## Linting

```bash
npm run lint       # ESLint + Stylelint
npm run format     # Prettier (write)
npm run lint:html  # HTMLHint on compiled output
```

## Bump the CalVer version

```bash
npm run release
```

This runs `scripts/calver-bump.js`, which updates the `version` field in both
`_config.yml` and `package.json` to today's date in `YYYY.MM.DD` format.

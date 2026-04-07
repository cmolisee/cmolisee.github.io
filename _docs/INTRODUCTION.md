---
layout: doc
title: Introduction
description: Get to know this Jekyll template and what it provides out of the box.
date: 2026-03-29
order: 1
---

Welcome to the **Jekyll + Tailwind CSS template**. This is a minimal, production-ready starting
point for documentation sites and blogs — no SCSS, no heavy frameworks.

## What's included

- **Light/dark mode** — class-based toggling with `localStorage` persistence and a no-flash inline
  script.
- **CalVer versioning** — the site version follows `YYYY.0M.0D` and is set in `_config.yml` and
  `package.json`.
- **Tailwind CSS** — compiled via PostCSS; no SCSS anywhere.
- **Linting & formatting** — ESLint, Prettier, HTMLHint, and Stylelint wired into `npm` scripts.
- **Sidebar layout** — 20 % sidebar / 80 % content on desktop; off-canvas toggle on mobile.
- **Doc layout** — breadcrumbs, prev/next links, and a sticky right-rail table of contents.
- **Blog layout** — tags, meta, hero image support, prev/next navigation.

## File structure

```text
.
├── _config.yml          # Jekyll + site nav config
├── _includes/           # Reusable HTML components
│   ├── head.html
│   ├── header.html
│   ├── sidebar.html
│   ├── footer.html
│   ├── toc.html
│   └── blog-card.html
├── _layouts/
│   ├── default.html     # Base layout (sidebar + header)
│   ├── doc.html         # Documentation post layout
│   └── blog.html        # Blog post layout
├── _docs/               # Documentation pages (collection)
├── _posts/              # Blog posts
├── assets/
│   ├── css/main.css     # Tailwind entry point
│   └── js/main.js       # Dark mode + sidebar JS
├── blog/index.html
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── Gemfile
```

## Next steps

Head to [Installation](/docs/installation/) to get the site running locally.

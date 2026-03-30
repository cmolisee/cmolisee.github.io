# Jekyll + Tailwind CSS Template

A minimal, production-ready Jekyll template with:

- 🌗 **Light / dark mode** — class-based, no flash, persisted in `localStorage`
- 📅 **CalVer versioning** — `YYYY.MM.DD` in `_config.yml` and `package.json`
- 🎨 **Tailwind CSS** — PostCSS pipeline, no SCSS
- 🔍 **Linting & formatting** — ESLint, Prettier, HTMLHint, Stylelint
- 🗂 **Sidebar layout** — 20 / 80 split on desktop, off-canvas toggle on mobile
- 📄 **Doc layout** — breadcrumbs, prev/next, sticky table of contents
- 📝 **Blog layout** — tags, hero image, author meta, prev/next navigation
- 🧩 **`_includes/`** — reusable components (`head`, `header`, `sidebar`, `footer`, `toc`, `blog-card`)

---

## Quick start

```bash
# 1. Install Ruby gems
bundle install

# 2. Install Node packages
npm install


# 3. start postcss watcher
postcss assets/css/main.css -o _site/assets/css/main.css --watch

# 4. Start jekyll watcher
bundle exec jekyll serve --livereload

# 3. Start the dev server (Jekyll + Tailwind watcher)
npm run dev
```

Open <http://localhost:4000>.

---

## NPM scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Jekyll + Tailwind watch (concurrent) |
| `npm run build` | Production build |
| `npm run lint` | ESLint + Stylelint |
| `npm run format` | Prettier (write) |
| `npm run lint:html` | HTMLHint on `_site/` |
| `npm run release` | Bump CalVer in `_config.yml` + `package.json` |

---

## Versioning (CalVer)

Versions follow `YYYY.MM.DD`. To bump:

```bash
npm run release
```

This updates `version` in both `_config.yml` and `package.json` to today's date.

---

## Project structure

```text
.
├── _config.yml          # Site config + nav
├── _includes/           # HTML partials
│   ├── head.html
│   ├── header.html
│   ├── sidebar.html
│   ├── footer.html
│   ├── toc.html
│   └── blog-card.html
├── _layouts/
│   ├── default.html     # 20/80 sidebar layout
│   ├── doc.html         # Documentation layout
│   └── blog.html        # Blog post layout
├── _docs/               # Documentation pages (Jekyll collection)
├── _posts/              # Blog posts (YYYY-MM-DD-title.md)
├── blog/index.html      # Blog listing
├── index.html           # Homepage
├── assets/
│   ├── css/main.css     # Tailwind entry point
│   └── js/main.js       # Dark mode + sidebar JS
├── scripts/
│   └── calver-bump.js   # CalVer release script
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── Gemfile
├── .eslintrc.js
├── .prettierrc
├── .htmlhintrc
└── .stylelintrc.json
```

---

## Customisation

- **Colours** — edit `theme.extend.colors.brand` in `tailwind.config.js`
- **Fonts** — update the Google Fonts URL in `_includes/head.html` and `fontFamily` in `tailwind.config.js`
- **Navigation** — edit the `nav` array in `_config.yml`
- **New doc pages** — add `.md` files to `_docs/` with `layout: doc`
- **New blog posts** — add `.md` files to `_posts/` named `YYYY-MM-DD-title.md`

---

## License

MIT
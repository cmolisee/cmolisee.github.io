# Developer Quick Reference

Quick commands and tips for developing with Jekyll Minimal Theme.

## One-Line Commands

```bash
# Setup everything
make setup

# Start developing
make dev

# Create new post
make new-post TITLE="My Post"

# Run all tests
make test

# Format everything
make format

# Deploy
make deploy
```

## File Locations

### Adding Content
- **Blog posts:** `_posts/YYYY-MM-DD-title.md`
- **Pages:** Root directory (e.g., `about.md`, `contact.md`)
- **Images:** `assets/images/`

### Modifying Design
- **Styles:** `assets/css/style.css`
- **Layouts:** `_layouts/`
- **Components:** `_includes/`
- **Configuration:** `_config.yml`

## Common Tasks

### Create New Post

```bash
# Using make
make new-post TITLE="My Amazing Post"

# Or manually
cat > _posts/$(date +%Y-%m-%d)-my-post.md << EOF
---
layout: post
title: "My Amazing Post"
date: $(date +%Y-%m-%d) $(date +%H:%M:%S) -0800
---

Content here...
EOF
```

### Modify Colors

Edit `assets/css/style.css`:
```css
:root {
  --color-primary: #1a1614;     /* Main text color */
  --color-accent: #8b6f47;      /* Links and highlights */
  --color-background: #faf9f7;  /* Page background */
}
```

### Change Fonts

Replace in `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-serif: 'Your Font', serif;
  --font-sans: 'Your Font', sans-serif;
}
```

### Add Navigation Link

Edit `_includes/header.html`:
```html
<nav class="site-nav">
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/about' | relative_url }}">About</a>
  <a href="{{ '/new-page' | relative_url }}">New Page</a>
</nav>
```

## Development Server

### Start Server
```bash
make dev
# or
bundle exec jekyll serve --livereload --host 0.0.0.0
```

### Different Port
```bash
bundle exec jekyll serve --port 4001
```

### Production Build
```bash
make build
# or
JEKYLL_ENV=production bundle exec jekyll build
```

## Testing

### Run All Tests
```bash
make test
```

### Individual Tests
```bash
# Ruby linting
bundle exec rubocop

# CSS linting
npm run lint:css

# Markdown linting
npm run lint:markdown

# HTML validation
bundle exec htmlproofer _site --disable-external

# RSpec tests
bundle exec rspec test/
```

## Code Quality

### Auto-format Everything
```bash
make format
```

### Check Formatting
```bash
make format-check
```

### Fix Linting Issues
```bash
# Ruby
bundle exec rubocop -a

# CSS
npm run lint:css -- --fix

# Markdown
npm run lint:markdown -- --fix
```

## Git Workflow

### Feature Branch
```bash
git checkout -b feature/my-feature
# Make changes
make test
make format
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### Commit Message Format
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

## Deployment

### GitHub Pages
```bash
# Automatic on push to main
git push origin main

# Manual
make deploy
```

### Other Platforms
```bash
# Build first
make build

# Then deploy via platform CLI
netlify deploy --prod --dir=_site
vercel --prod
```

## Debugging

### View Build Output
```bash
bundle exec jekyll build --verbose
```

### Check Configuration
```bash
bundle exec jekyll doctor
```

### Trace Errors
```bash
bundle exec jekyll build --trace
```

## VS Code

### Run Task
- **Ctrl/Cmd + Shift + P**
- Type "Tasks: Run Task"
- Select task

### Format Document
- **Shift + Alt/Option + F**

### Open Terminal
- **Ctrl/Cmd + `**

## Environment Variables

### Production Build
```bash
JEKYLL_ENV=production bundle exec jekyll build
```

### Custom Baseurl
```bash
bundle exec jekyll build --baseurl "/custom-path"
```

## Performance

### Optimize Images
```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt install imagemagick   # Linux

# Optimize
convert image.jpg -strip -quality 85 optimized.jpg
```

### Check Build Time
```bash
bundle exec jekyll build --profile
```

## Useful Liquid Filters

```liquid
{{ "hello" | capitalize }}           → Hello
{{ "2026-02-08" | date: "%B %d" }}  → February 08
{{ post.content | strip_html }}      → Plain text
{{ page.excerpt | truncatewords: 30 }} → First 30 words
```

## Configuration Snippets

### Custom Permalink
```yaml
# _config.yml
permalink: /blog/:year/:title/
```

### Exclude Files
```yaml
# _config.yml
exclude:
  - README.md
  - Makefile
  - scripts/
```

### Set Timezone
```yaml
# _config.yml
timezone: America/Los_Angeles
```

## Keyboard Shortcuts (Codespaces)

- **Ctrl/Cmd + K Ctrl/Cmd + O** - Open folder
- **Ctrl/Cmd + Shift + E** - Explorer
- **Ctrl/Cmd + Shift + F** - Search
- **Ctrl/Cmd + Shift + G** - Source control
- **Ctrl/Cmd + `** - Terminal

## Help

- Run `make help` for available commands
- Check `README.md` for detailed docs
- See `CONTRIBUTING.md` for workflow
- Read `CI_CD.md` for deployment info

---

**Pro Tip:** Bookmark this file for quick reference during development!

# Complete Setup Guide

Welcome! This guide will help you get started with the Jekyll Minimal Theme with full CI/CD, testing, and deployment.

## 🚀 Quick Start (5 minutes)

### Option 1: GitHub Codespaces (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Open in Codespaces**
   - Click **Code** → **Codespaces** → **Create codespace on main**
   - Wait 2-3 minutes for automatic setup
   - Site automatically opens at port 4000

3. **Start Writing**
   ```bash
   make new-post TITLE="Hello World"
   ```

### Option 2: Local Development

1. **Install Prerequisites**
   - Ruby 3.2+ ([ruby-lang.org](https://www.ruby-lang.org))
   - Node.js 20+ ([nodejs.org](https://nodejs.org))

2. **Clone and Setup**
   ```bash
   git clone <your-repo-url>
   cd your-repo
   make setup
   ```

3. **Start Development**
   ```bash
   make dev
   ```

4. **Open Browser**
   - Visit http://localhost:4000

## 📋 What You Get

### Development Features

✅ **Automatic Setup**
- Ruby and Node.js dependencies installed
- Git hooks configured for code quality
- Jekyll server starts automatically
- LiveReload enabled

✅ **Code Quality Tools**
- Prettier for formatting
- Rubocop for Ruby linting
- Stylelint for CSS linting
- Markdownlint for Markdown linting
- Pre-commit hooks prevent bad code

✅ **Testing Suite**
- RSpec for Ruby tests
- HTMLProofer for link validation
- Automated test runs in CI/CD

✅ **VS Code Integration**
- Tasks for common operations
- Format on save
- Recommended extensions
- Debugging configuration

### CI/CD Features

✅ **Automated Workflows**
- Lint on every push
- Test on every pull request
- Deploy to GitHub Pages automatically
- Performance audits with Lighthouse

✅ **Security**
- Weekly dependency scans
- Automated security updates
- Vulnerability alerts

✅ **Quality Assurance**
- Code review automation
- Preview builds for PRs
- Build status badges

## 🛠 Development Workflow

### Daily Development

1. **Start Server**
   ```bash
   make dev
   ```

2. **Make Changes**
   - Edit files in VS Code
   - Changes auto-reload in browser

3. **Create New Post**
   ```bash
   make new-post TITLE="My Post"
   ```

4. **Test Before Committing**
   ```bash
   make test
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # Pre-commit hooks run automatically
   ```

### Common Commands

```bash
make help           # Show all commands
make dev            # Start dev server
make build          # Build production site
make clean          # Clean build files
make test           # Run all tests
make lint           # Run linters
make format         # Format code
make new-post       # Create new post
make deploy         # Deploy to GitHub Pages
```

### Using VS Code Tasks

1. Press **Ctrl/Cmd + Shift + P**
2. Type "Tasks: Run Task"
3. Select task:
   - Jekyll: Serve
   - Format: All Files
   - Lint: All
   - Test: All

## 📝 Creating Content

### Blog Posts

#### Using Make Command
```bash
make new-post TITLE="My Amazing Post"
```

This creates: `_posts/2026-02-08-my-amazing-post.md`

#### Manual Creation

1. Create file: `_posts/YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "My Amazing Post"
   date: 2026-02-08 10:00:00 -0800
   ---
   ```
3. Write content in Markdown

### Pages

1. Create file: `page-name.md`
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Page Title"
   permalink: /page-name/
   ---
   ```
3. Add to navigation in `_includes/header.html`

## 🎨 Customization

### Site Information

Edit `_config.yml`:
```yaml
title: Your Site Name
description: Your site description
url: "https://yoursite.com"
baseurl: ""

# Social links (optional)
twitter_username: yourusername
github_username: yourusername
```

### Colors

Edit `assets/css/style.css`:
```css
:root {
  --color-primary: #1a1614;      /* Main text */
  --color-accent: #8b6f47;       /* Links */
  --color-background: #faf9f7;   /* Page background */
  --color-surface: #ffffff;      /* Card backgrounds */
  --color-border: #e8e5e0;       /* Borders */
}
```

### Typography

Replace fonts in `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-serif: 'Your Font', Georgia, serif;
  --font-sans: 'Your Font', system-ui, sans-serif;
}
```

### Navigation

Edit `_includes/header.html`:
```html
<nav class="site-nav">
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/about' | relative_url }}">About</a>
  <a href="{{ '/projects' | relative_url }}">Projects</a>
</nav>
```

## 🚢 Deployment

### GitHub Pages (Automatic)

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

2. **Update Configuration**
   ```yaml
   # _config.yml
   url: "https://yourusername.github.io"
   baseurl: "/repository-name"
   ```

3. **Push to Main**
   ```bash
   git push origin main
   ```

4. **Wait for Deployment**
   - Check Actions tab for progress
   - Site live in ~2 minutes

5. **Visit Site**
   - https://yourusername.github.io/repository-name/

### Netlify

```bash
# Build
make build

# Deploy
netlify deploy --prod --dir=_site
```

### Vercel

```bash
# Deploy
vercel --prod
```

## 🧪 Testing

### Run All Tests

```bash
make test
```

This runs:
- Rubocop (Ruby linting)
- Stylelint (CSS linting)
- Markdownlint (Markdown linting)
- Prettier (format checking)
- Jekyll build
- HTMLProofer (link validation)

### Individual Tests

```bash
# Ruby linting
bundle exec rubocop

# CSS linting
npm run lint:css

# Markdown linting
npm run lint:markdown

# Build test
bundle exec jekyll build

# Link validation
bundle exec htmlproofer _site --disable-external
```

### Auto-fix Issues

```bash
# Format everything
make format

# Fix Ruby issues
bundle exec rubocop -a

# Fix CSS issues
npm run lint:css -- --fix
```

## 🔍 CI/CD Pipeline

### Automatic Workflows

Every push triggers:

1. **Linting** (2 min)
   - Code style checks
   - Format validation

2. **Testing** (3 min)
   - Jekyll build
   - HTML validation
   - Link checking

3. **Deployment** (2 min) - main branch only
   - Deploy to GitHub Pages
   - Update live site

4. **Performance** (1 min)
   - Lighthouse audit
   - Performance scoring

### Weekly Workflows

- **Security Scan** - Dependency vulnerabilities
- **Dependency Updates** - Automated PRs

### PR Workflows

- **Preview Build** - Downloadable artifact
- **Comment** - Build status and download link

## 📚 Project Structure

```
jekyll-theme-enhanced/
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   │   ├── ci-cd.yml       # Main pipeline
│   │   ├── security.yml    # Security scans
│   │   └── preview.yml     # PR previews
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── pull_request_template.md
│
├── .vscode/
│   ├── tasks.json          # VS Code tasks
│   ├── settings.json       # Editor settings
│   ├── extensions.json     # Recommended extensions
│   └── launch.json         # Debug config
│
├── scripts/
│   ├── setup.sh            # Setup script
│   ├── test.sh             # Test script
│   └── deploy.sh           # Deploy script
│
├── test/
│   ├── site_spec.rb        # RSpec tests
│   └── spec_helper.rb      # Test helper
│
├── _includes/              # Reusable components
├── _layouts/               # Page templates
├── _posts/                 # Blog posts
├── assets/css/             # Stylesheets
│
├── .devcontainer/          # Codespaces config
├── Gemfile                 # Ruby dependencies
├── package.json            # Node dependencies
├── Makefile                # Command shortcuts
├── _config.yml             # Jekyll config
│
└── Documentation
    ├── README.md           # Main documentation
    ├── CONTRIBUTING.md     # Contribution guide
    ├── CI_CD.md            # CI/CD guide
    ├── QUICK_REFERENCE.md  # Quick reference
    └── CHANGELOG.md        # Version history
```

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill process
lsof -ti:4000 | xargs kill -9

# Or use different port
bundle exec jekyll serve --port 4001
```

### Build Fails

```bash
# Clean and rebuild
make clean
make build

# Check errors
bundle exec jekyll build --trace
```

### Dependencies Issues

```bash
# Update dependencies
make update

# Or manually
bundle update
npm update
```

### Pre-commit Hook Fails

```bash
# Fix formatting
make format

# Run tests
make test

# Try commit again
git commit
```

## 💡 Tips & Best Practices

### Development

- ✅ Use `make` commands for consistency
- ✅ Run `make test` before committing
- ✅ Let pre-commit hooks fix issues
- ✅ Use VS Code tasks for convenience
- ✅ Keep dependencies updated weekly

### Content

- ✅ Write posts in Markdown
- ✅ Use descriptive filenames
- ✅ Add alt text to images
- ✅ Keep posts under 2000 words
- ✅ Use headings for structure

### Design

- ✅ Maintain minimalist aesthetic
- ✅ Use CSS variables for theming
- ✅ Test on mobile devices
- ✅ Optimize images before adding
- ✅ Keep performance in mind

### Git

- ✅ Use conventional commits
- ✅ Create feature branches
- ✅ Write descriptive PR descriptions
- ✅ Link issues in commits
- ✅ Keep commits focused

## 📖 Documentation

- **[README.md](README.md)** - Main documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CI_CD.md](CI_CD.md)** - CI/CD pipeline details
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## 🆘 Getting Help

### Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Documentation](https://shopify.github.io/liquid/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Actions Docs](https://docs.github.com/actions)

### Support

- 🐛 [Report a Bug](https://github.com/yourusername/repo/issues/new?template=bug_report.md)
- ✨ [Request Feature](https://github.com/yourusername/repo/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/yourusername/repo/discussions)

## ✅ Next Steps

Now that you're set up:

1. ✅ Customize `_config.yml` with your info
2. ✅ Update `about.md` with your details
3. ✅ Create your first post
4. ✅ Customize colors and fonts
5. ✅ Deploy to GitHub Pages
6. ✅ Start writing!

---

**Happy developing!** 🎉

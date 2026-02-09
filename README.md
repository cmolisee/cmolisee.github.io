# Minimal — A Refined Jekyll Theme

A minimalistic Jekyll theme designed for clarity, focus, and beautiful typography. Built for GitHub Codespaces with comprehensive CI/CD, automated testing, linting, and deployment.

![Theme Preview](https://via.placeholder.com/800x400/faf9f7/1a1614?text=Minimal+Jekyll+Theme)

## Features

✨ **Design**
- Refined minimalist aesthetic with warm color palette
- Beautiful typography pairing (Crimson Pro × DM Sans)
- Generous whitespace and asymmetric layouts
- Subtle fade-in animations
- Fully responsive

🛠 **Development**
- GitHub Codespaces ready with automatic setup
- Comprehensive CI/CD with GitHub Actions
- Automated testing (HTMLProofer, RSpec)
- Code linting (Rubocop, Stylelint, Markdownlint)
- Code formatting (Prettier)
- Pre-commit hooks
- VS Code tasks and extensions

🚀 **Production**
- SEO optimized with `jekyll-seo-tag`
- RSS feed support
- Sitemap generation
- Fast static site performance
- Automated deployment to GitHub Pages
- Performance audits with Lighthouse

## Quick Start with GitHub Codespaces

### 1. Open in Codespaces

Click the **Code** button on GitHub → **Codespaces** tab → **Create codespace on main**

The devcontainer will automatically:
- Install Ruby 3.2 and Node.js 20
- Install all dependencies (Ruby gems and npm packages)
- Set up Git hooks for code quality
- Start Jekyll server with LiveReload
- Forward ports 4000 (Jekyll) and 35729 (LiveReload)

### 2. View Your Site

Once the container finishes building, you'll see a notification that port 4000 is ready. Click **Open in Browser** or visit the forwarded port URL.

Your site is now live with auto-reload! Any changes you make will automatically refresh in the browser.

### 3. Start Developing

Use VS Code tasks (Ctrl/Cmd + Shift + P → "Tasks: Run Task"):
- **Jekyll: Serve** - Start development server
- **Format: All Files** - Format code with Prettier
- **Lint: All** - Run all linters
- **Test: All** - Run complete test suite

Or use the Makefile:
```bash
make dev          # Start development server
make test         # Run all tests
make format       # Format all files
make lint         # Run all linters
make new-post TITLE="My Post"  # Create new post
```

## Local Development Setup


### Prerequisites

- Ruby 3.2+
- Node.js 20+
- Bundler (`gem install bundler`)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jekyll-theme-minimal.git
cd jekyll-theme-minimal

# Run setup script (installs dependencies and sets up hooks)
make setup

# Or manually:
bundle install
npm install
npx husky install
```

### Start Development Server

```bash
make dev
# Or: bundle exec jekyll serve --livereload
```

Visit `http://localhost:4000` to see your site.

## Development Workflow

### Available Commands

```bash
make help           # Show all available commands
make dev            # Start development server
make build          # Build production site
make clean          # Clean build artifacts
make test           # Run all tests
make lint           # Run all linters
make format         # Format all files
make format-check   # Check formatting
make new-post       # Create new blog post
make deploy         # Deploy to GitHub Pages
```

### Creating Content

#### New Blog Post

```bash
make new-post TITLE="My Amazing Post"
```

Or manually create `_posts/YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "My Amazing Post"
date: 2026-02-08 10:00:00 -0800
---

Your content here in Markdown...
```

### Code Quality

#### Automatic Formatting on Save

VS Code is configured to format on save. You can also format manually:

```bash
make format
```

#### Pre-commit Hooks

Git hooks automatically run before commits:
- Format code with Prettier
- Lint CSS with Stylelint
- Lint Markdown with Markdownlint

#### Running Tests

```bash
# Full test suite
make test

# Individual tests
bundle exec rspec test/
bundle exec htmlproofer _site --disable-external
npm run lint:all
```

## CI/CD Pipeline

### Automated Workflows

Every push triggers:
1. **Linting** - Code quality checks (Rubocop, Stylelint, Prettier)
2. **Testing** - Jekyll build and HTML validation
3. **Deployment** - Automatic deployment to GitHub Pages (main branch)
4. **Performance** - Lighthouse audits

### Additional Workflows

- **Security Audit** - Weekly dependency vulnerability scans
- **Dependency Updates** - Automated PR for dependency updates
- **PR Previews** - Preview builds for pull requests

See [CI_CD.md](CI_CD.md) for detailed documentation.

### Setting Up Deployment

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Update `_config.yml` with your URL:
   ```yaml
   url: "https://yourusername.github.io"
   baseurl: "/repository-name"
   ```
4. Push to `main` branch

Your site will be live at `https://yourusername.github.io/repository-name/`




## VS Code Integration

### Recommended Extensions

The project includes extension recommendations (`.vscode/extensions.json`):
- Prettier - Code formatting
- Shopify Liquid - Liquid syntax highlighting
- Jekyll Syntax - Jekyll snippets
- Stylelint - CSS linting
- Markdownlint - Markdown linting
- GitLens - Git integration

### Available Tasks

Access tasks via Command Palette (Ctrl/Cmd + Shift + P → "Tasks: Run Task"):
- Jekyll: Serve
- Jekyll: Build
- Jekyll: Clean
- Format: All Files
- Lint: All
- Lint: CSS
- Lint: Markdown
- Test: All
- Setup: Development Environment

### Keyboard Shortcuts

- **Ctrl/Cmd + Shift + B** - Run default task (Jekyll: Serve)
- **Ctrl/Cmd + Shift + P** - Command Palette



```
jekyll-theme-minimal/
├── .devcontainer/
│   └── devcontainer.json    # Codespaces configuration
├── _includes/
│   ├── header.html          # Site header
│   └── footer.html          # Site footer
├── _layouts/
│   ├── default.html         # Base layout
│   ├── home.html           # Homepage with post list
│   ├── post.html           # Single post layout
│   └── page.html           # Static page layout
├── _posts/                  # Your blog posts go here
├── assets/
│   └── css/
│       └── style.css        # Main stylesheet
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
├── index.md                 # Homepage
└── about.md                 # About page
```

## Customization

### Site Configuration

Edit `_config.yml`:

```yaml
title: Your Site Name
description: Your site description
url: "https://yourdomain.com"
```

### Colors and Typography

Modify CSS variables in `assets/css/style.css`:

```css
:root {
  --color-primary: #1a1614;
  --color-accent: #8b6f47;
  --font-serif: 'Crimson Pro', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, sans-serif;
}
```

### Navigation

Edit `_includes/header.html` to add or modify navigation links:

```html
<nav class="site-nav">
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/about' | relative_url }}">About</a>
  <a href="{{ '/contact' | relative_url }}">Contact</a>
</nav>
```

## Development Commands

When working outside of Codespaces or needing manual control:

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Clean generated files
bundle exec jekyll clean
```

## Writing Tips

### Front Matter Options

```yaml
---
layout: post              # or page
title: "Post Title"
date: 2026-02-08 10:00:00 -0800
excerpt: "Custom excerpt..."  # Optional
---
```

### Markdown Support

- **Bold** and *italic* text
- [Links](https://example.com)
- Images: `![Alt text](image.jpg)`
- Code blocks with syntax highlighting
- Blockquotes
- Lists and more

### Code Highlighting

```ruby
def hello
  puts "Hello, Jekyll!"
end
```

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to Settings → Pages
3. Set source to your main branch
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`
4. Deploy!

### Vercel

1. Import your repository
2. Framework preset: Jekyll
3. Build command: `bundle exec jekyll build`
4. Output directory: `_site`

## Troubleshooting

### Common Issues

#### Port Already in Use

If port 4000 is already in use:
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or use different port
bundle exec jekyll serve --port 4001
```

#### Build Fails

```bash
# Clean and rebuild
make clean
make build

# Check for errors
bundle exec jekyll build --trace
```

#### Linting Errors

```bash
# Auto-fix most issues
make format
bundle exec rubocop -a

# See what's wrong
make lint
```

#### Dependencies Out of Date

```bash
# Update all dependencies
bundle update
npm update

# Or
make update
```

## Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Quick start guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CI_CD.md](CI_CD.md)** - CI/CD pipeline documentation
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[THEME_OVERVIEW.md](THEME_OVERVIEW.md)** - Design philosophy and customization

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — feel free to use for personal or commercial projects.

## Credits

Created with care and attention to detail. Typography powered by Google Fonts (Crimson Pro, DM Sans).

## Support

- 📖 [Documentation](https://github.com/yourusername/jekyll-theme-minimal/wiki)
- 🐛 [Issue Tracker](https://github.com/yourusername/jekyll-theme-minimal/issues)
- 💬 [Discussions](https://github.com/yourusername/jekyll-theme-minimal/discussions)

---

**Need help?** Check the [Jekyll documentation](https://jekyllrb.com/docs/) or open an issue.

Happy writing! ✍️
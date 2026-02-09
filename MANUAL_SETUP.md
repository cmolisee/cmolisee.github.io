# Manual Setup Guide

This guide walks you through setting up the Jekyll theme manually, step by step.

## Prerequisites Check

Before starting, verify you have the required software:

```bash
# Check Ruby version (need 3.2+)
ruby --version

# Check Bundler
bundle --version

# Check Node.js (need 20+)
node --version

# Check npm
npm --version

# Check Git
git --version
```

If any are missing, see the installation sections below.

## Step 1: Extract the Theme

### Option A: Download ZIP from GitHub

1. Download the repository as ZIP
2. Extract to your desired location
3. **Important:** Make sure hidden files are extracted (files starting with `.`)

### Option B: Clone Repository

```bash
git clone https://github.com/yourusername/jekyll-theme-minimal.git
cd jekyll-theme-minimal
```

### Verify Extraction

Check that these hidden folders exist:

```bash
ls -la | grep "^\."
```

You should see:
- `.devcontainer/`
- `.github/`
- `.vscode/`
- `.gitignore`
- `.prettierrc`
- `.rubocop.yml`
- Other dot files

**If missing:** Your extraction tool may have skipped hidden files. Try:
- On macOS/Linux: Use `unzip` command instead of Archive Utility
- On Windows: Use 7-Zip and enable "Show hidden files"

## Step 2: Install Ruby Dependencies

### 2.1 Install Bundler (if needed)

```bash
gem install bundler
```

### 2.2 Install Gems

```bash
# Install all Ruby dependencies
bundle install

# If you get permission errors, try:
bundle install --path vendor/bundle
```

**Common Issues:**

- **Permission Denied:** Use `bundle install --path vendor/bundle`
- **Ruby version too old:** Install Ruby 3.2+ (see Ruby installation below)
- **Native extensions failing:** Install development tools (see below)

### 2.3 Verify Ruby Setup

```bash
# Should show installed gems
bundle list

# Test Jekyll
bundle exec jekyll --version
```

## Step 3: Install Node.js Dependencies

### 3.1 Install npm Packages

```bash
# Install all Node.js dependencies
npm install

# Or use clean install
npm ci
```

**Common Issues:**

- **EACCES errors:** Don't use `sudo`. Fix npm permissions or use nvm
- **Network timeout:** Try `npm install --verbose`
- **Package conflicts:** Delete `node_modules/` and `package-lock.json`, then retry

### 3.2 Verify Node Setup

```bash
# Should show installed packages
npm list --depth=0

# Test Prettier
npx prettier --version
```

## Step 4: Setup Git Hooks (Optional but Recommended)

This ensures code quality on every commit.

### 4.1 Initialize Husky

```bash
# Install Husky hooks
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run precommit"

# Make executable
chmod +x .husky/pre-commit
```

### 4.2 Test Git Hook

```bash
# Create a test file
echo "test" > test.txt

# Try to commit (should run hooks)
git add test.txt
git commit -m "test commit"

# Remove test file
git reset HEAD~1
rm test.txt
```

## Step 5: Initial Build Test

### 5.1 Clean Previous Builds

```bash
bundle exec jekyll clean
```

### 5.2 Build Site

```bash
# Development build
bundle exec jekyll build

# Or production build
JEKYLL_ENV=production bundle exec jekyll build
```

**Common Issues:**

- **Liquid syntax errors:** Check your Markdown files for unclosed tags
- **Missing layouts:** Verify `_layouts/` folder exists
- **Configuration errors:** Check `_config.yml` syntax

### 5.3 Verify Build

```bash
# Check that _site folder was created
ls -la _site/

# Should see HTML files
ls _site/*.html
```

## Step 6: Start Development Server

### 6.1 Start Jekyll Server

```bash
# Basic server
bundle exec jekyll serve

# With LiveReload (recommended)
bundle exec jekyll serve --livereload

# On all interfaces (for Codespaces/remote)
bundle exec jekyll serve --livereload --host 0.0.0.0
```

### 6.2 Access Your Site

Open browser to:
- Local: http://localhost:4000
- Codespaces: Click "Open in Browser" notification

### 6.3 Verify LiveReload

1. Edit any file (e.g., `about.md`)
2. Save the file
3. Browser should auto-refresh

**Common Issues:**

- **Port 4000 in use:** 
  ```bash
  # Kill process on port 4000
  lsof -ti:4000 | xargs kill -9
  
  # Or use different port
  bundle exec jekyll serve --port 4001
  ```

- **LiveReload not working:** 
  - Check port 35729 is not blocked
  - Disable browser extensions
  - Try hard refresh (Ctrl+Shift+R)

## Step 7: Verify All Tools Work

### 7.1 Test Linters

```bash
# Ruby linting
bundle exec rubocop

# CSS linting  
npm run lint:css

# Markdown linting
npm run lint:markdown

# All linters
npm run lint:all
```

### 7.2 Test Formatting

```bash
# Check formatting
npm run format:check

# Auto-format all files
npm run format
```

### 7.3 Test HTML Validation

```bash
# Build first
bundle exec jekyll build

# Validate HTML
bundle exec htmlproofer _site --disable-external --checks Links,Images,Scripts
```

### 7.4 Run Full Test Suite

```bash
# Using make
make test

# Or manually
bash scripts/test.sh
```

## Step 8: Configure for Your Site

### 8.1 Update Site Configuration

Edit `_config.yml`:

```yaml
title: Your Site Name
description: Your site description
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"

# Optional
twitter_username: yourusername
github_username: yourusername
```

### 8.2 Update About Page

Edit `about.md` with your information.

### 8.3 Customize Colors (Optional)

Edit `assets/css/style.css`:

```css
:root {
  --color-primary: #1a1614;
  --color-accent: #8b6f47;
  --color-background: #faf9f7;
}
```

### 8.4 Test Your Changes

```bash
# Clean and rebuild
bundle exec jekyll clean
bundle exec jekyll build

# Start server
bundle exec jekyll serve --livereload
```

## Step 9: Create Your First Post

### 9.1 Using Make Command

```bash
make new-post TITLE="My First Post"
```

### 9.2 Manual Creation

```bash
# Create file with today's date
DATE=$(date +%Y-%m-%d)
cat > _posts/$DATE-my-first-post.md << 'EOF'
---
layout: post
title: "My First Post"
date: 2026-02-08 10:00:00 -0800
---

This is my first blog post!

## Hello World

Welcome to my site.
EOF
```

### 9.3 Verify Post Appears

1. Refresh browser
2. Post should appear on homepage
3. Click post to view full content

## Step 10: Setup GitHub Integration (Optional)

### 10.1 Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

### 10.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create repository (don't initialize with README)
3. Note the repository URL

### 10.3 Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 10.4 Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Save

### 10.5 Trigger Deployment

```bash
# Make a change
echo "# Updated" >> README.md
git add README.md
git commit -m "Trigger deployment"
git push

# Check Actions tab for deployment progress
```

## Troubleshooting Common Issues

### Issue: Bundle Install Fails

```bash
# Try installing with local path
bundle install --path vendor/bundle

# Or update bundler
gem update bundler
bundle install
```

### Issue: Permission Errors

```bash
# Don't use sudo! Instead:

# For Ruby gems
bundle install --path vendor/bundle

# For npm
# Use nvm (Node Version Manager) instead of system Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
npm install
```

### Issue: Jekyll Command Not Found

```bash
# Make sure you're using bundle exec
bundle exec jekyll serve

# Or install jekyll globally (not recommended)
gem install jekyll
```

### Issue: Port Already in Use

```bash
# Find and kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or use different port
bundle exec jekyll serve --port 4001
```

### Issue: LiveReload Not Working

```bash
# Start with explicit LiveReload
bundle exec jekyll serve --livereload --host 0.0.0.0

# Check firewall isn't blocking port 35729
# Try disabling browser extensions
```

### Issue: CSS Not Loading

```bash
# Check baseurl in _config.yml
# If deploying to GitHub Pages at username.github.io/repo:
baseurl: "/repo"

# If at custom domain:
baseurl: ""

# Restart server after config changes
```

### Issue: Hidden Files Missing

```bash
# Check if files exist
ls -la | grep "^\."

# If missing, re-extract with proper tool
# macOS/Linux:
unzip -a jekyll-theme-enhanced.zip

# Or clone from git (preserves all files)
git clone <repo-url>
```

## Installing Prerequisites

### Install Ruby (if needed)

#### macOS
```bash
# Using Homebrew
brew install ruby@3.2

# Add to PATH
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev

# Add to PATH
echo '# Ruby' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### Windows
1. Download RubyInstaller from https://rubyinstaller.org/
2. Run installer
3. Select "MSYS2 development toolchain"
4. Open new terminal and verify: `ruby --version`

### Install Node.js (if needed)

#### Using nvm (Recommended - All Platforms)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc  # or ~/.zshrc

# Install Node 20
nvm install 20
nvm use 20
nvm alias default 20
```

#### macOS
```bash
brew install node@20
```

#### Ubuntu/Debian
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Windows
Download from https://nodejs.org/ and run installer.

### Install Development Tools

#### macOS
```bash
xcode-select --install
```

#### Ubuntu/Debian
```bash
sudo apt-get install build-essential
```

#### Windows
- Install Build Tools: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

## Using Make Commands

If you have `make` installed (included on macOS/Linux):

```bash
# See all commands
make help

# Setup everything
make setup

# Start development
make dev

# Run tests
make test

# Format code
make format

# Create new post
make new-post TITLE="My Post"
```

If you don't have `make`, use the npm scripts or direct commands shown above.

## Next Steps

Once setup is complete:

1. ✅ Customize `_config.yml`
2. ✅ Update `about.md`
3. ✅ Create your first post
4. ✅ Customize colors/fonts
5. ✅ Push to GitHub
6. ✅ Enable GitHub Pages
7. ✅ Start writing!

## Getting Help

- Check [README.md](README.md) for detailed documentation
- See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for command reference
- Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Open an issue on GitHub for bugs

## Verification Checklist

After setup, verify everything works:

- [ ] Ruby gems installed (`bundle list`)
- [ ] Node packages installed (`npm list --depth=0`)
- [ ] Jekyll builds (`bundle exec jekyll build`)
- [ ] Server starts (`bundle exec jekyll serve`)
- [ ] LiveReload works (edit file, browser refreshes)
- [ ] Linters work (`npm run lint:all`)
- [ ] Formatter works (`npm run format`)
- [ ] Tests pass (`make test` or `bash scripts/test.sh`)
- [ ] Git hooks work (try making a commit)
- [ ] Site accessible at http://localhost:4000

---

If you've completed all steps, you're ready to develop! 🎉

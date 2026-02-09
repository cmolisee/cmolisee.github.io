# Troubleshooting Guide

Common issues and their solutions when working with Jekyll Minimal Theme.

## Critical Issue: Missing Hidden Files

### Symptoms
- No `.devcontainer`, `.github`, or `.vscode` folders
- CI/CD workflows don't work
- VS Code tasks not available
- Codespaces setup doesn't work

### Cause
Your extraction tool skipped hidden files (files/folders starting with `.`)

### Solutions

#### Solution 1: Re-extract with Proper Tool

**macOS/Linux:**
```bash
# Use unzip with -a flag
unzip -a jekyll-theme-enhanced.zip

# Or tar if you have a .tar.gz
tar -xzf jekyll-theme-enhanced.tar.gz
```

**Windows:**
```bash
# Use 7-Zip (not Windows Explorer)
# 1. Right-click ZIP file
# 2. 7-Zip → Extract to "jekyll-theme-enhanced\"
# 3. Make sure "Show hidden files" is enabled
```

#### Solution 2: Clone from Git (Best)

```bash
git clone https://github.com/yourusername/jekyll-theme-minimal.git
cd jekyll-theme-minimal
```

Git always preserves hidden files.

#### Solution 3: Manually Create Missing Files

See the "Manual Recreation" section below.

### Verify Hidden Files Exist

```bash
# Run verification script
bash scripts/verify.sh

# Or manually check
ls -la | grep "^\."
```

You should see:
```
.devcontainer/
.github/
.vscode/
.gitignore
.prettierrc
.rubocop.yml
.stylelintrc.json
.markdownlint.json
.rspec
```

## Installation Issues

### Ruby Installation Fails

#### Issue: Permission Denied
```bash
ERROR:  While executing gem ... (Gem::FilePermissionError)
```

**Solution:**
```bash
# Don't use sudo! Use local installation
bundle install --path vendor/bundle

# Or fix permissions
mkdir -p ~/.gem
gem install bundler --user-install
```

#### Issue: Ruby Version Too Old
```bash
Your Ruby version is 2.x.x, but this requires >= 3.2
```

**Solution:**
Install Ruby 3.2+ using rbenv or rvm:

```bash
# Using rbenv (recommended)
brew install rbenv  # macOS
rbenv install 3.2.0
rbenv global 3.2.0

# Using rvm
\curl -sSL https://get.rvm.io | bash
rvm install 3.2.0
rvm use 3.2.0 --default
```

#### Issue: Native Extensions Fail
```bash
ERROR: Failed to build gem native extension
```

**Solution:**
Install development tools:

**macOS:**
```bash
xcode-select --install
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential ruby-dev
```

**Windows:**
Install DevKit from https://rubyinstaller.org/downloads/

### Node.js Installation Fails

#### Issue: EACCES Permissions
```bash
npm ERR! code EACCES
npm ERR! syscall access
```

**Solution:**
Use nvm instead of system Node:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
npm install
```

#### Issue: Network Timeout
```bash
npm ERR! network timeout
```

**Solution:**
```bash
# Increase timeout
npm install --timeout=60000

# Or use different registry
npm config set registry https://registry.npmmirror.com
npm install
```

## Jekyll Build Issues

### Issue: Liquid Syntax Error
```bash
Liquid Exception: Liquid syntax error
```

**Solution:**
1. Check error message for file name
2. Look for unclosed tags: `{% %}` or `{{ }}`
3. Common issues:
   - Missing `endif`, `endfor`, or `endunless`
   - Unescaped special characters in content

```bash
# Find potentially problematic files
grep -r "{{" _posts/
grep -r "{%" _layouts/
```

### Issue: Configuration Error
```bash
Error: Invalid configuration
```

**Solution:**
Validate `_config.yml`:

```bash
# Check YAML syntax
ruby -e "require 'yaml'; YAML.load_file('_config.yml')"

# Common issues:
# - Tabs instead of spaces
# - Missing colons
# - Incorrect indentation
# - Special characters not quoted
```

### Issue: Missing Dependencies
```bash
Could not find gem 'jekyll'
```

**Solution:**
```bash
# Reinstall gems
bundle install

# Or update Bundler
gem update bundler
bundle install
```

## Server Issues

### Issue: Port Already in Use
```bash
Address already in use - bind(2) for 127.0.0.1:4000
```

**Solution:**
```bash
# Find and kill process
lsof -ti:4000 | xargs kill -9

# Or use different port
bundle exec jekyll serve --port 4001
```

### Issue: LiveReload Not Working

**Symptoms:**
- Browser doesn't auto-refresh
- Changes don't appear

**Solutions:**

1. **Check LiveReload is enabled:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

2. **Check port 35729 not blocked:**
   ```bash
   lsof -i :35729
   ```

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)

4. **Disable browser extensions:**
   - Try in incognito/private mode

5. **Check firewall:**
   ```bash
   # macOS - allow Jekyll
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/ruby
   ```

### Issue: CSS Not Loading

**Symptoms:**
- Site loads but no styling
- 404 errors for CSS files

**Solution:**
Check `baseurl` in `_config.yml`:

```yaml
# For GitHub Pages at username.github.io/repo:
baseurl: "/repo"

# For custom domain or localhost:
baseurl: ""
```

**Always restart server after changing _config.yml:**
```bash
# Stop server (Ctrl+C)
bundle exec jekyll serve --livereload
```

## Git and GitHub Issues

### Issue: Pre-commit Hook Fails

**Symptoms:**
```bash
error: failed to run pre-commit hook
```

**Solutions:**

1. **Make hook executable:**
   ```bash
   chmod +x .husky/pre-commit
   ```

2. **Fix code issues:**
   ```bash
   # Format code
   npm run format
   
   # Fix linting
   bundle exec rubocop -a
   ```

3. **Skip hook temporarily (not recommended):**
   ```bash
   git commit --no-verify -m "message"
   ```

### Issue: GitHub Pages Build Fails

**Check build logs:**
1. Go to repository → Actions tab
2. Click failed workflow
3. Expand job logs

**Common causes:**

1. **Unsupported plugin:**
   - GitHub Pages only supports specific plugins
   - See: https://pages.github.com/versions/

2. **Missing files:**
   - Verify all files pushed: `git status`
   - Check .gitignore isn't excluding needed files

3. **Configuration error:**
   - Validate _config.yml locally
   - Test build locally: `JEKYLL_ENV=production bundle exec jekyll build`

### Issue: Actions Workflow Not Running

**Solutions:**

1. **Check workflow file:**
   ```bash
   # Validate YAML syntax
   cat .github/workflows/ci-cd.yml | ruby -e "require 'yaml'; YAML.load(STDIN)"
   ```

2. **Check branch name:**
   - Workflows trigger on specific branches
   - Verify in `.github/workflows/ci-cd.yml`:
     ```yaml
     on:
       push:
         branches: [ main ]  # Must match your branch
     ```

3. **Check repository permissions:**
   - Settings → Actions → General
   - Enable "Allow all actions"

## Linting Issues

### Issue: Rubocop Errors

**View errors:**
```bash
bundle exec rubocop
```

**Auto-fix:**
```bash
bundle exec rubocop -a
```

**Disable specific cops:**
Edit `.rubocop.yml`:
```yaml
Style/SomeCop:
  Enabled: false
```

### Issue: Stylelint Errors

**View errors:**
```bash
npm run lint:css
```

**Auto-fix:**
```bash
npm run lint:css -- --fix
```

**Disable specific rules:**
Edit `.stylelintrc.json`:
```json
{
  "rules": {
    "some-rule": null
  }
}
```

### Issue: Markdownlint Errors

**View errors:**
```bash
npm run lint:markdown
```

**Auto-fix:**
```bash
npm run lint:markdown -- --fix
```

**Ignore specific files:**
Create `.markdownlintignore`:
```
node_modules/
_site/
vendor/
```

## Test Failures

### Issue: HTMLProofer Fails

**Common errors:**

1. **Broken internal links:**
   ```bash
   # Find broken links
   bundle exec htmlproofer _site --disable-external
   
   # Fix file paths and URLs in content
   ```

2. **Missing alt text:**
   ```bash
   # Add alt text to all images
   ![Description here](image.jpg)
   ```

3. **External link timeout:**
   ```bash
   # Skip external links during testing
   bundle exec htmlproofer _site --disable-external
   ```

### Issue: RSpec Fails

**Run with details:**
```bash
bundle exec rspec --format documentation
```

**Run specific test:**
```bash
bundle exec rspec test/site_spec.rb:10
```

## Performance Issues

### Issue: Slow Build Times

**Solutions:**

1. **Enable incremental builds:**
   ```yaml
   # _config.yml
   incremental: true
   ```

2. **Exclude unnecessary files:**
   ```yaml
   # _config.yml
   exclude:
     - node_modules/
     - vendor/
     - scripts/
   ```

3. **Limit posts during development:**
   ```bash
   bundle exec jekyll serve --limit_posts 10
   ```

4. **Use faster markdown processor:**
   ```yaml
   # _config.yml
   markdown: kramdown
   kramdown:
     input: GFM
   ```

### Issue: Large Output Directory

**Check size:**
```bash
du -sh _site/
```

**Optimize:**

1. **Compress images:**
   ```bash
   # Install ImageMagick
   brew install imagemagick
   
   # Optimize images
   convert image.jpg -strip -quality 85 optimized.jpg
   ```

2. **Remove unnecessary files:**
   ```yaml
   # _config.yml
   exclude:
     - README.md
     - Gemfile
     - Gemfile.lock
   ```

## Codespaces Issues

### Issue: Codespace Won't Start

**Solutions:**

1. **Rebuild container:**
   - Command Palette (Ctrl+Shift+P)
   - "Codespaces: Rebuild Container"

2. **Check devcontainer.json:**
   ```bash
   # Validate JSON
   cat .devcontainer/devcontainer.json | python -m json.tool
   ```

3. **Check logs:**
   - View → Output → Select "Dev Containers"

### Issue: Extensions Not Installing

**Manual install:**
1. Open Extensions (Ctrl+Shift+X)
2. Search for extension
3. Click Install

**Check recommendations:**
```bash
cat .vscode/extensions.json
```

### Issue: Server Not Accessible

**Solutions:**

1. **Check port forwarding:**
   - Ports tab in VS Code
   - Ensure 4000 is forwarded
   - Click globe icon to open

2. **Use correct host:**
   ```bash
   # Must use 0.0.0.0 in Codespaces
   bundle exec jekyll serve --host 0.0.0.0
   ```

3. **Check firewall:**
   - Codespaces → Forward a Port → 4000

## Getting More Help

### Run Diagnostics

```bash
# Run verification script
bash scripts/verify.sh

# Check Jekyll doctor
bundle exec jekyll doctor

# Build with verbose output
bundle exec jekyll build --verbose

# Build with trace
bundle exec jekyll build --trace
```

### Check Versions

```bash
ruby --version
bundle --version
node --version
npm --version
bundle exec jekyll --version
```

### Collect System Info

```bash
# System info
uname -a

# Ruby info
ruby -v

# Gem environment
gem environment

# Bundle info
bundle env

# NPM info
npm config list
```

### Resources

- **Jekyll Docs:** https://jekyllrb.com/docs/
- **GitHub Pages:** https://docs.github.com/pages
- **Troubleshooting Jekyll:** https://jekyllrb.com/docs/troubleshooting/
- **Open Issue:** Create issue on GitHub with error details

### Before Asking for Help

Include this information:

1. **What you're trying to do**
2. **What command you ran**
3. **Full error message**
4. **Output of:**
   ```bash
   bash scripts/verify.sh
   ruby --version
   node --version
   bundle env
   ```
5. **Operating system and version**

---

**Still stuck?** Open an issue with the information above!

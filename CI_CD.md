# CI/CD Documentation

This document explains the automated workflows and deployment processes for the Jekyll Minimal Theme.

## Overview

The project uses GitHub Actions for continuous integration and deployment. All workflows are defined in `.github/workflows/`.

## Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

**Jobs:**

#### Lint Job
- Runs code quality checks
- Validates code style and formatting
- Steps:
  - Rubocop (Ruby linting)
  - Prettier (Format checking)
  - Stylelint (CSS linting)
  - Markdownlint (Markdown linting)

#### Test Job
- Builds the Jekyll site
- Validates HTML and links
- Steps:
  - Jekyll build
  - HTMLProofer validation
  - Uploads build artifact

#### Deploy Job
- Deploys to GitHub Pages (on `main` branch only)
- Only runs after successful tests
- Steps:
  - Deploys build artifact to GitHub Pages

#### Lighthouse Job
- Runs performance audits
- Only runs after deployment
- Steps:
  - Waits for deployment
  - Runs Lighthouse CI
  - Uploads performance reports

**Status:** ✅ Runs on every push and PR

### 2. Security & Dependency Updates (`security.yml`)

**Triggers:**
- Weekly schedule (Mondays at midnight)
- Manual workflow dispatch

**Jobs:**

#### Security Audit
- Checks for security vulnerabilities
- Steps:
  - Bundle audit (Ruby gems)
  - npm audit (Node packages)

#### Dependency Update
- Automatically updates dependencies
- Creates pull requests with updates
- Steps:
  - Bundle update
  - Creates PR with changes

**Status:** ✅ Runs weekly

### 3. PR Preview (`preview.yml`)

**Triggers:**
- Pull request opened
- Pull request synchronized
- Pull request reopened

**Jobs:**

#### Build Preview
- Builds site with PR-specific baseurl
- Creates downloadable artifact
- Comments on PR with instructions
- Steps:
  - Jekyll build with PR number
  - Upload artifact (7 day retention)
  - Comment on PR

**Status:** ✅ Runs on every PR

## Setting Up GitHub Pages Deployment

### 1. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Save settings

### 2. Configure Permissions

The workflow requires these permissions (already configured):
- `contents: read`
- `pages: write`
- `id-token: write`

### 3. Update Site URL

Edit `_config.yml`:
```yaml
url: "https://yourusername.github.io"
baseurl: "/repository-name"
```

### 4. Trigger Deployment

Push to the `main` branch:
```bash
git push origin main
```

The site will be available at:
```
https://yourusername.github.io/repository-name/
```

## Local Testing Before CI/CD

### Run All Checks Locally

```bash
# Full test suite
make test

# Or manually:
npm run format:check
npm run lint:all
bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
```

### Fix Issues Automatically

```bash
# Format all files
make format

# Fix Ruby issues
bundle exec rubocop -a

# Fix CSS issues
npm run lint:css -- --fix
```

## Continuous Deployment Flow

```
┌─────────────────┐
│   Push Code     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Lint & Test   │  ← Rubocop, Prettier, Stylelint
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Jekyll   │  ← bundle exec jekyll build
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Validate HTML  │  ← HTMLProofer
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy to Pages │  ← GitHub Pages
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Lighthouse Audit│  ← Performance testing
└─────────────────┘
```

## Environment Variables

No environment variables are required for basic deployment. For advanced features:

### Optional Variables

- `GH_TOKEN` - GitHub token (auto-provided by Actions)
- `LIGHTHOUSE_TOKEN` - For private Lighthouse reports

## Monitoring and Debugging

### Check Workflow Status

1. Go to **Actions** tab in repository
2. Click on the workflow run
3. View logs for each job
4. Check for errors or warnings

### Common Issues

#### Build Fails

**Symptoms:** Jekyll build fails in CI
**Solutions:**
- Check `_config.yml` syntax
- Verify all liquid tags are closed
- Run `bundle exec jekyll build` locally

#### HTMLProofer Fails

**Symptoms:** Link validation errors
**Solutions:**
- Fix broken internal links
- Update or remove broken external links
- Add exceptions to `.github/workflows/ci-cd.yml`

#### Linter Fails

**Symptoms:** Code style violations
**Solutions:**
- Run `make format` to auto-fix
- Run `make lint` to see issues
- Follow code style guidelines

### Viewing Logs

Detailed logs are available in the Actions tab:
```
Repository → Actions → Select Workflow → Select Run → View Job
```

## Performance Optimization

### Lighthouse Thresholds

Default thresholds:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Improving Scores

1. **Performance:**
   - Optimize images
   - Minify CSS/JS
   - Enable caching

2. **Accessibility:**
   - Add alt text to images
   - Use semantic HTML
   - Ensure color contrast

3. **SEO:**
   - Use jekyll-seo-tag
   - Add meta descriptions
   - Create sitemap

## Security Best Practices

### Automated Security Checks

- Weekly dependency audits
- Automated dependency updates
- Vulnerability scanning

### Manual Security Reviews

Before deploying sensitive changes:
1. Review dependencies
2. Check for exposed secrets
3. Validate user inputs
4. Test authentication

## Deployment Strategies

### Staging Environment

To test before production:
1. Create `develop` branch
2. Push changes to `develop`
3. Review deploy preview
4. Merge to `main` when ready

### Rollback Procedure

If deployment fails:
1. Go to **Actions** tab
2. Find last successful deployment
3. Click **Re-run jobs**
4. Or revert commit and push

## Custom Workflows

### Adding New Checks

Edit `.github/workflows/ci-cd.yml`:

```yaml
- name: Custom Check
  run: |
    # Your custom command here
    echo "Running custom check"
```

### Scheduled Tasks

Add to workflow file:

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

## Troubleshooting

### Workflow Not Running

**Check:**
- Workflow file syntax (use YAML validator)
- Branch protection rules
- Repository permissions

### Slow Builds

**Solutions:**
- Enable dependency caching
- Parallelize jobs
- Reduce number of tests

### Failed Deployments

**Steps:**
1. Check workflow logs
2. Verify GitHub Pages is enabled
3. Check repository permissions
4. Review error messages

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [HTMLProofer Documentation](https://github.com/gjtorikian/html-proofer)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)

---

For questions or issues with CI/CD, please open an issue in the repository.

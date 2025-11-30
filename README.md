# My Jekyll Site

A minimal Jekyll site hosted on GitHub Pages, optimized for GitHub Codespaces.

## Setup in GitHub Codespaces

1. Open this repository in GitHub Codespaces (click "Code" → "Codespaces" → "Create codespace on main")
2. Wait for the container to build and dependencies to install automatically
3. Run `./tools/run.sh` to start the development server
4. Click on the "Ports" tab in VS Code and open port 4000 in your browser

## Local Setup

1. Install Ruby and Bundler
2. Clone this repository
3. Run `bundle install`
4. Run `./tools/run.sh` (or `tools\run.bat` on Windows)
5. Visit http://localhost:4000

## Testing

Run `./tools/test.sh` (or `tools\test.bat` on Windows) to build and test the site.

## Deployment

Push to the main branch and GitHub Pages will automatically build and deploy your site.

## Structure

- `.devcontainer/` - Codespaces configuration
- `_config.yml` - Site configuration
- `index.md` - Homepage
- `_posts/` - Blog posts (create this directory for posts)
- `tools/` - Helper scripts for running and testing
- `.editorconfig` - Editor configuration
- `.gitattributes` - Git attributes for line endings
- `.gitignore` - Files to ignore in Git

## Adding Content

Create new posts in `_posts/` with the format `YYYY-MM-DD-title.md` and front matter:

```markdown
---
layout: post
title: "My Post Title"
date: 2024-01-01
---

Your content here...
```

## License

MIT
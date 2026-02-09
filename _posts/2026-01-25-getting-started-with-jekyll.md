---
layout: post
title: "Getting Started with Jekyll"
date: 2026-01-25 09:15:00 -0800
---

Jekyll is a static site generator that transforms plain text into beautiful websites. It's perfect for blogs, documentation sites, and portfolios—anywhere you want the simplicity of static HTML with the convenience of templates and dynamic content generation.

## Why Jekyll?

- **No database**: Everything is files and folders
- **Version control**: Your entire site lives in Git
- **Fast**: Static HTML loads instantly
- **Markdown**: Write in a format you already know
- **Flexible**: Full control over your design and structure

## Basic Workflow

Here's how development typically works:

```bash
# Install dependencies
bundle install

# Start the development server
bundle exec jekyll serve

# Visit http://localhost:4000
```

Jekyll watches your files and automatically rebuilds when you make changes. With LiveReload enabled, your browser refreshes automatically.

## Content Structure

Posts live in the `_posts` directory with filenames like `YYYY-MM-DD-title.md`. Each post has front matter defining its metadata:

```yaml
---
layout: post
title: "Your Title Here"
date: 2026-01-25 09:15:00 -0800
---
```

Everything after the front matter is your content, written in Markdown.

## Layouts and Includes

Layouts wrap your content with common HTML structure. Includes are reusable components you can drop into any template. Together, they keep your code DRY and maintainable.

## Going Further

Jekyll's documentation is excellent. Explore plugins, advanced Liquid templating, data files, and collections to extend your site's capabilities.

Happy building!

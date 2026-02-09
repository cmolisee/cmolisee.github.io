# Minimal — A Refined Jekyll Theme

A minimalistic Jekyll theme designed for clarity, focus, and beautiful typography. Built for GitHub Codespaces with automatic setup and live reload.

![Theme Preview](https://via.placeholder.com/800x400/faf9f7/1a1614?text=Minimal+Jekyll+Theme)

## Features

✨ **Design**
- Refined minimalist aesthetic with warm color palette
- Beautiful typography pairing (Crimson Pro × DM Sans)
- Generous whitespace and asymmetric layouts
- Subtle fade-in animations
- Fully responsive

🛠 **Technical**
- GitHub Codespaces ready (automatic setup)
- SEO optimized with `jekyll-seo-tag`
- RSS feed support
- Sitemap generation
- Fast static site performance

## Quick Start with GitHub Codespaces

### 1. Open in Codespaces

Click the **Code** button on GitHub → **Codespaces** tab → **Create codespace on main**

The devcontainer will automatically:
- Install Ruby and dependencies
- Run `bundle install`
- Start Jekyll server with LiveReload
- Forward ports 4000 (Jekyll) and 35729 (LiveReload)

### 2. View Your Site

Once the container finishes building, you'll see a notification that port 4000 is ready. Click **Open in Browser** or visit the forwarded port URL.

Your site is now live with auto-reload! Any changes you make will automatically refresh in the browser.

### 3. Start Writing

Create new posts in the `_posts` directory:

```bash
touch _posts/2026-02-08-my-first-post.md
```

Posts must follow the naming convention: `YYYY-MM-DD-title.md`

Add front matter to your post:

```yaml
---
layout: post
title: "My First Post"
date: 2026-02-08 10:00:00 -0800
---

Your content here in Markdown...
```

## Project Structure

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

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License — feel free to use for personal or commercial projects.

## Credits

Created with care and attention to detail. Typography powered by Google Fonts (Crimson Pro, DM Sans).

---

**Need help?** Check the [Jekyll documentation](https://jekyllrb.com/docs/) or open an issue.

Happy writing! ✍️

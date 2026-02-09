# Minimal Jekyll Theme - Overview

## 🎨 Design Philosophy

This theme embodies refined minimalism through:

**Typography**
- Crimson Pro (serif) for elegant headings
- DM Sans (sans-serif) for clean, readable body text
- Carefully tuned font sizes and line heights

**Color Palette**
- Primary: #1a1614 (warm dark)
- Accent: #8b6f47 (sophisticated brown)
- Background: #faf9f7 (warm off-white)
- Avoids harsh black/white contrast

**Visual Details**
- Generous whitespace for breathing room
- Subtle fade-in animations on page load
- Underline hover effects on links
- Asymmetric layouts with purpose

## 📁 What's Included

### Configuration Files
- `.devcontainer/devcontainer.json` - GitHub Codespaces setup
- `_config.yml` - Jekyll site configuration
- `Gemfile` - Ruby dependencies
- `.gitignore` - Git ignore rules

### Layouts
- `_layouts/default.html` - Base template
- `_layouts/home.html` - Homepage with post list
- `_layouts/post.html` - Individual blog posts
- `_layouts/page.html` - Static pages

### Components
- `_includes/header.html` - Site header with navigation
- `_includes/footer.html` - Site footer

### Styling
- `assets/css/style.css` - Complete theme stylesheet

### Content
- `index.md` - Homepage
- `about.md` - About page
- `_posts/` - Three example blog posts

### Documentation
- `README.md` - Comprehensive documentation
- `GETTING_STARTED.md` - Quick start guide
- `LICENSE` - MIT license

## 🚀 GitHub Codespaces Setup

### What Happens Automatically:

1. **Container Builds**
   - Ruby 3.2 environment
   - Git and GitHub CLI installed
   - VS Code extensions added (Liquid syntax, Jekyll support)

2. **Dependencies Install**
   - `bundle install` runs automatically
   - Jekyll and all plugins installed

3. **Server Starts**
   - Jekyll serves on port 4000
   - LiveReload enabled on port 35729
   - Ports forwarded automatically

4. **You're Ready!**
   - Click "Open in Browser" notification
   - Edit files and see changes instantly
   - Start writing immediately

### VS Code Extensions Included:
- Shopify Liquid syntax highlighting
- Jekyll snippets and syntax
- Prettier for code formatting

## ✍️ Creating Content

### New Blog Post

1. Create file in `_posts/`:
   ```
   _posts/2026-02-08-my-new-post.md
   ```

2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "My New Post"
   date: 2026-02-08 10:00:00 -0800
   ---
   ```

3. Write content in Markdown below front matter

4. Save and watch it appear instantly!

### New Page

1. Create file in root:
   ```
   contact.md
   ```

2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Contact"
   permalink: /contact/
   ---
   ```

3. Add to navigation in `_includes/header.html`

## 🎯 Customization Guide

### Change Site Info
Edit `_config.yml`:
```yaml
title: Your Name
description: Your tagline
url: "https://yoursite.com"
```

### Modify Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --color-primary: #1a1614;
  --color-accent: #8b6f47;
  --color-background: #faf9f7;
}
```

### Change Fonts
Replace Google Fonts import in `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

Then update variables:
```css
--font-serif: 'Your Font', serif;
--font-sans: 'Your Font', sans-serif;
```

### Add Navigation Links
Edit `_includes/header.html`:
```html
<nav class="site-nav">
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/about' | relative_url }}">About</a>
  <a href="{{ '/projects' | relative_url }}">Projects</a>
</nav>
```

## 🌐 Deployment Options

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from branch
3. Live at `username.github.io/repo-name`

### Netlify
1. Connect repository
2. Build: `bundle exec jekyll build`
3. Publish: `_site`

### Vercel
1. Import repository
2. Framework: Jekyll
3. Build: `bundle exec jekyll build`
4. Output: `_site`

## 📝 Markdown Features

All standard Markdown works:

- **Bold** and *italic*
- [Links](url)
- Images
- Code blocks with syntax highlighting
- Blockquotes
- Lists
- Headings

Plus Jekyll additions:
- Liquid templating
- Front matter
- Includes and layouts

## 💡 Pro Tips

1. **Use descriptive filenames** - They become URLs
2. **Write front matter carefully** - Syntax errors break builds
3. **Preview locally first** - Before pushing to production
4. **Keep posts organized** - Use consistent naming
5. **Leverage includes** - For reusable components
6. **Test responsive** - Use browser dev tools
7. **Optimize images** - Compress before adding

## 🔧 Troubleshooting

**Server won't start?**
- Check `Gemfile.lock` is up to date
- Run `bundle install` again
- Check for errors in `_config.yml`

**Changes not showing?**
- Hard refresh browser (Cmd/Ctrl + Shift + R)
- Check file saved
- Look for Jekyll errors in terminal

**Build errors?**
- Check front matter syntax
- Ensure all required files present
- Validate YAML in `_config.yml`

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Templating](https://shopify.github.io/liquid/)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Ready to start?** Open the theme in GitHub Codespaces and begin writing!

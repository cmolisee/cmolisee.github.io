# Getting Started with Minimal

## GitHub Codespaces (Recommended)

### Step 1: Create a Codespace
1. Push this theme to a GitHub repository
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for the container to build (2-3 minutes)

### Step 2: Automatic Setup
The devcontainer will automatically:
- ✅ Install Ruby and Jekyll
- ✅ Install all dependencies
- ✅ Start the development server
- ✅ Enable LiveReload

### Step 3: View Your Site
- Look for the **Ports** tab in VS Code
- Click the globe icon next to port 4000
- Your site opens in a new browser tab!

### Step 4: Start Writing
```bash
# Create a new post
touch _posts/2026-02-08-hello-world.md

# Edit in VS Code
# Changes auto-reload in your browser!
```

## Local Development

### Prerequisites
- Ruby 3.x
- Bundler

### Setup
```bash
# Install dependencies
bundle install

# Start server
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

## Next Steps

1. **Customize** `_config.yml` with your site info
2. **Edit** `about.md` with your information
3. **Add** new posts in `_posts/` directory
4. **Modify** colors in `assets/css/style.css`

## Tips

- Posts must be named `YYYY-MM-DD-title.md`
- All posts need front matter (the stuff between `---`)
- Use Markdown for content
- Changes auto-reload during development

## Need Help?

- Check `README.md` for detailed documentation
- Visit [Jekyll docs](https://jekyllrb.com/docs/)
- The theme is designed to be simple and hackable!

Happy writing! ✨

---
layout: blog
title: "Hello, world — welcome to the blog"
date: 2026-03-29
author: Your Name
read_time: 3
tags:
  - announcement
  - jekyll
---

This is your first blog post. Edit or delete it, then start writing your own content in the `_posts/` directory.

Posts are named using the format `YYYY-MM-DD-title.md` and automatically picked up by Jekyll.

## Front matter

Each post supports the following front matter fields:

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Always `blog` for posts |
| `title` | Yes | Post title |
| `date` | Yes | Publication date |
| `author` | No | Author name |
| `read_time` | No | Estimated read time in minutes |
| `tags` | No | Array of tag strings |
| `image` | No | Path to hero image |
| `image_alt` | No | Alt text for hero image |

## Writing content

Use standard Markdown — headings, lists, code blocks, images, links — all styled
through the `@tailwindcss/typography` plugin.

```ruby
# Code blocks are syntax-highlighted via Rouge
def hello
  puts "Hello, world!"
end
```

Happy writing!
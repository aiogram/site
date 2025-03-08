# aiogram Blog System

## Structure

The blog system uses the following structure:

```
_blog/                    # Blog-specific files
  index.html              # Main blog index
  README.md               # This documentation file
  tags/                   # Tag pages (generated automatically)
    
_data/
  blog/
    tags.yml              # Tag definitions and metadata

_includes/
  blog/
    sidebar.html          # Reusable sidebar for blog pages
    tag_badge.html        # Reusable tag badge component

_layouts/
  blog.html               # Master layout for blog pages
  post.html               # Layout for individual posts
  tag_page.html           # Layout for tag pages

_plugins/
  tag_generator.rb        # Automatic tag page generator

_posts/                   # Blog posts (standard Jekyll)
  YYYY-MM-DD-title.md     # Individual post files
```

## Adding a New Post

To add a new post, create a file in the `_posts` directory with the format `YYYY-MM-DD-title.md`. Example:

```markdown
---
layout: post
title: "New Features in aiogram 3.0"
author: "John Doe"
excerpt: "A brief overview of the exciting new features in aiogram 3.0"
tags: 
  - update
  - insight
---

Your post content goes here...
```

## Adding a New Tag

To add a new tag, update the `_data/blog/tags.yml` file with the tag details:

```yaml
newtag:
  name: New Tag
  color: primary
  description: Description of what this tag represents
  icon: tag-fill
```

Tag colors can be one of: primary, secondary, success, danger, warning, info, light, dark.
Icons should be Bootstrap icon names without the 'bi-' prefix.

## Features

- Automatic tag page generation
- Consistent styling across blog components
- Reusable components using include files
- Tag metadata in a single data file
- Automatic tag badge styling based on tag type 
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Jekyll-based personal blog/website deployed to GitHub Pages. The site is built automatically via GitHub Actions on every push to the main branch.

## Build and Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve the site locally (usually at http://localhost:4000)
bundle exec jekyll serve

# Build the site (outputs to _site/)
bundle exec jekyll build
```

### Tag Generation
Tags are automatically generated from post frontmatter during the CI/CD build process via `.tag_generator.ps1`:
```bash
# Generate tag pages locally (requires PowerShell and powershell-yaml module)
pwsh ./.tag_generator.ps1
```

## Architecture

### Jekyll Site Structure
- **`_posts/`**: Blog posts in markdown format with YAML frontmatter
- **`_drafts/`**: Draft posts not yet published
- **`_layouts/`**: HTML templates (post.html, page.html, tag_page.html, tag_index.html)
- **`_includes/`**: Reusable HTML components (header, footer, sidebar, social, share buttons, analytics)
- **`_sass/`**: SCSS stylesheets (bootstrap.min.scss, theme.scss)
- **`tag/`**: Auto-generated tag pages (regenerated on each build)
- **`_site/`**: Generated static site output (git-ignored)

### Post Format
Blog posts follow this structure:
```markdown
---
layout: post
title: Your Post Title
date: YYYY-MM-DD HH:MM:SS
description: >
  Brief description of the post
tags:
 - tag1
 - tag2
---

Post content in markdown...
```

### Tag System
- Tags are extracted from all posts in `_posts/` and `_drafts/`
- The PowerShell script `.tag_generator.ps1` parses YAML frontmatter and generates individual tag pages in `tag/`
- Each tag page uses the `tag_page` layout to display all posts with that tag
- Tag generation runs automatically in the GitHub Actions workflow before Jekyll build

### Deployment Pipeline
The site deploys via `.github/workflows/jekyll.yml`:
1. Checkout code
2. Run tag generator (PowerShell script)
3. Setup Ruby and install gems
4. Build Jekyll site with production settings
5. Deploy to GitHub Pages

## Configuration

Key configuration in `_config.yml`:
- Site metadata (title, author, description, URL)
- Social media links and sharing options
- Google Analytics tracking
- Disqus comments integration
- Markdown processor: kramdown with GFM
- Permalink structure: `/:year/:month/:title/`

## Important Notes

- The main branch is the default and deployment branch
- All posts must be in `_posts/` with the naming convention: `YYYY-MM-DD-title-slug.md`
- Tags are case-sensitive and should use lowercase with hyphens for multi-word tags
- The site uses kramdown with GitHub Flavored Markdown for content processing
- Comments are enabled via Disqus (shortname: www-spletzer-com)

# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Overview

Jekyll-based personal blog at **<www.spletzer.com>**. Hosted on GitHub Pages
with Cloudflare in front. Custom domain via `CNAME` file. Licensed under
CC BY 4.0.

## Build and Development Commands

### Local Development

```bash
# Install Ruby dependencies
bundle install

# Serve locally at http://localhost:4000
bundle exec jekyll serve

# Build only (outputs to _site/)
bundle exec jekyll build
```

### Tag Generation

Tags are auto-generated from post frontmatter by `.tag_generator.ps1` during
CI. To generate locally (requires PowerShell and the `powershell-yaml` module):

```bash
pwsh ./.tag_generator.ps1
```

### Visual Regression Tests

Playwright-based screenshot comparison across three viewports (Desktop 1280x720,
Tablet 768x1024, Mobile 375x667). The test suite starts a local Jekyll server
automatically.

```bash
# Install npm dependencies (first time or after package-lock changes)
npm ci

# Install Playwright browser
npx playwright install chromium

# Run visual tests (starts Jekyll server, takes screenshots, compares)
npm run test:visual

# Update baseline screenshots after intentional visual changes
npm run test:visual:update

# Open interactive test UI
npm run test:visual:ui

# View HTML report from last run
npm run test:visual:report
```

Baselines are stored per-platform in `e2e/__snapshots__/` (`darwin/` for macOS,
`linux/` for CI). To update CI baselines, use the **Update Visual Baselines**
workflow dispatch in GitHub Actions.

## Architecture

### Directory Structure

```text
_posts/              Blog posts (YYYY-MM-DD-title-slug.md)
_drafts/             Unpublished draft posts
_layouts/            HTML templates (post, page, tag_page, tag_index)
_includes/           Reusable components (header, footer, sidebar, social,
                     share, google-analytics, disqus-comments, disqus-counts,
                     yandex-metrica)
_sass/               SCSS (bootstrap.min.scss, theme.scss)
assets/css/          Main style.scss that imports _sass files
assets/images/       Post images
tag/                 Auto-generated tag pages (git-ignored)
_site/               Build output (git-ignored)
e2e/                 Playwright visual regression tests
  __snapshots__/     Platform-specific baseline screenshots (in Git LFS)
.github/workflows/   CI/CD (jekyll.yml, update-visual-baselines.yml)
```

### Content Pages

| File | Path | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Homepage, latest 10 posts |
| `about.md` | `/about/` | Bio and skills |
| `archive.md` | `/archive/` | All posts grouped by year |
| `tags.md` | `/tags/` | Tag index with post counts |
| `linkfarm.md` | `/linkfarm/` | Curated reading list |
| `404.md` | `/404.html` | Custom 404 page |
| `feed.xml` | `/feed.xml` | RSS 2.0 feed (latest 10) |
| `sitemap.xml` | `/sitemap.xml` | XML sitemap |

### Post Format

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

Optional frontmatter fields: `header` (image path), `headerwidth`,
`headerheight`, `comments` (override global true/false).

### Tag System

- `.tag_generator.ps1` scans `_posts/` and `_drafts/` for YAML frontmatter
- Extracts all unique tags, generates a page per tag in `tag/`
- Each tag file uses the `tag_page` layout with `robots: noindex`
- Tag filenames replace spaces with underscores
- Runs in CI before Jekyll build; `tag/` is git-ignored

### Deployment Pipeline

`.github/workflows/jekyll.yml` runs on push to `main`, PRs to `main`, and
manual dispatch:

1. **changes** - Detects if visual-related files changed (layouts, includes,
   sass, CSS, config, e2e, Playwright config, package files)
2. **visual-tests** - Runs Playwright screenshot comparison if visual files
   changed (PR gate and pre-deploy check)
3. **build** - Generates tags, builds Jekyll with `JEKYLL_ENV=production`,
   uploads artifact (push/dispatch only, requires visual-tests pass or skip)
4. **deploy** - Deploys to GitHub Pages

A separate **update-visual-baselines.yml** workflow (manual dispatch only)
regenerates Linux baseline screenshots and commits them.

## Configuration

### Jekyll (`_config.yml`)

- **URL:** `https://www.spletzer.com`
- **Permalink:** `/:year/:month/:title/`
- **Markdown:** kramdown with GFM input, hard_wrap false
- **Plugins:** jekyll-gist
- **SASS:** compressed output
- **Excluded:** README.md, LICENSE

### Integrations

- **Google Analytics:** GA4 (`G-92E8FVFHFW`)
- **Disqus comments:** shortname `www-spletzer-com`, enabled globally
- **Social sharing:** Twitter, Facebook, Google+, LinkedIn, Reddit, Email
- **Social links:** Mastodon, LinkedIn, GitHub, Bluesky

### Playwright (`playwright.config.ts`)

- Sequential execution, single worker for deterministic screenshots
- Max diff pixel ratio: 0.2%, threshold: 0.2
- Platform-specific snapshot directories
- Web server: `bundle exec jekyll serve --no-watch` on port 4000

## Dependencies

### Ruby (Gemfile)

jekyll, jekyll-gist, kramdown-parser-gfm, jekyll-watch, webrick, colorator,
concurrent-ruby

### Node.js (package.json)

@playwright/test, @types/node, typescript (dev dependencies only, for visual
testing)

## Important Notes

- The `main` branch is the deployment branch
- Posts go in `_posts/` with naming `YYYY-MM-DD-title-slug.md`
- Tags are case-sensitive; use lowercase with hyphens for multi-word tags
- The `tag/` directory is git-ignored and regenerated on every build
- Visual test baselines in `e2e/__snapshots__/` are tracked in Git LFS
- After CSS/layout changes, run `npm run test:visual:update` locally to update
  macOS baselines, then use the GitHub Actions workflow to update Linux baselines
- The theme is dark (background #292929, text #e7e9ea, accent #35B4DE)
- Bootstrap grid: content in `col-md-9`, sidebar in `col-md-3`

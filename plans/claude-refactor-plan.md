# Site Refactor Plan — Claude's Execution Plan

## Status

- Phase 1: Dead Code Removal and Config Cleanup — **DONE**
- Phase 2: Bug Fixes — **DONE**
- Phase 3: Semantic HTML and Accessibility — **DONE**
- Phase 4: Meta Tags and Structured Data — **DONE**
- Phase 5: CSS Architecture — Build Replacement Stylesheet — **DONE**
- Phase 6: Bootstrap Removal — The Swap — **DONE**
- Phase 7: CSS Cleanup and Modernization — **DONE**
- Phase 8: Accessibility Testing — **DONE**
- **Phase 9: Final Verification and Cleanup — NEXT**

## Context

The blog at www.spletzer.com is a Jekyll site on GitHub Pages
that originally loaded Bootstrap 3.2.0 (~2,700 lines minified)
despite using only ~6 Bootstrap classes.
The refactor removes Bootstrap,
replaces it with modern standards-only CSS (Grid, Flexbox, custom properties),
adds proper semantic HTML and ARIA accessibility,
fixes meta tags,
and adds accessibility testing —
all while preserving the current visual appearance
using the existing Playwright visual regression test suite as the safety net.

Inspired by Rob Eisenberg's philosophy:
zero runtime dependencies, standards-first, minimal page weight.

## Approach: CSS Tooling — SCSS as Thin Bundler

**Keep Jekyll's built-in SCSS pipeline** rather than adding PostCSS or
Lightning CSS.
The only SCSS-specific syntax is `@use` for file concatenation
and `compressed` output mode for minification.

---

## Phases

Each phase is independently testable via `npm run test:visual`.
Phases are designed so that the site remains functional after each one.

### Phase 1: Dead Code Removal and Config Cleanup (DONE)

- Deleted dead includes: share.html, social.html,
  disqus-comments.html, disqus-counts.html, yandex-metrica.html
- Removed dead config from `_config.yml` (share, social, disqus blocks)
- Removed dead CSS from `_sass/theme.scss`
  (social links, share section, sideBarTags, Font Awesome references)

### Phase 2: Bug Fixes (DONE)

- Added `<!DOCTYPE html>` to header.html
- Fixed OG tags: `name="og:*"` changed to `property="og:*"`
- Removed extra `</div>` in page.html
- Added `datetime` attribute to `<time>` in post.html
- Fixed `class=".center-image"` to `class="center-image"` in index.html

### Phase 3: Semantic HTML and Accessibility (DONE)

- Added skip navigation link
- Replaced div-soup with semantic HTML
  (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- Added ARIA labels throughout
- Added `rel="noopener noreferrer"` on external links

### Phase 4: Meta Tags and Structured Data (DONE)

- Added `<meta name="description">`, author, robots meta tags
- Created `_includes/json-ld.html` with WebSite, Article,
  BreadcrumbList, Person schemas
- Fixed Twitter card meta tags

### Phase 5: CSS Architecture — Build Replacement Stylesheet (DONE)

- Created `_sass/variables.scss` (CSS custom properties)
- Created `_sass/layout.scss` (CSS Grid replacing Bootstrap grid)
- Created `_sass/components.scss` (card, nav, sidebar, footer)
- Created `_sass/typography.scss` (text styling)
- Created `_sass/code.scss` (syntax highlighting)
- Created `_sass/utilities.scss` (utility classes)
- Updated `assets/css/style.scss` to import new partials

### Phase 6: Bootstrap Removal — The Swap (DONE)

- Removed all Bootstrap classes from HTML
- Deleted `_sass/bootstrap.min.scss`
- Removed `@use "bootstrap.min"` from style.scss
- Removed Bootstrap-dependent selectors from theme.scss
- CSS output: 33KB vs 143KB on main (77% reduction)

### Phase 7: CSS Cleanup and Modernization

**Files to modify:**

- `_sass/theme.scss`:
  - Remove all remaining vendor prefixes
    (`-webkit-`, `-moz-`, `-ms-`, `-o-`)
  - Replace SCSS `@mixin transition` with plain `transition`
  - Replace `@mixin rounded` with plain `border-radius`
  - Replace `@mixin font-size` if still used
  - Clean up duplicate/redundant rules
  - Consolidate media queries
  - Remove unused `.main-page`, `.box`, `.toc` rules if not used
  - Modernize sticky footer
    (Flexbox on body instead of absolute positioning)
  - Simplify `.post-footer` (currently uses `display: table`)
- Audit final CSS output size vs. original (Bootstrap + theme)

**Verification:** `npm run test:visual` — update baselines as needed.

### Phase 8: Accessibility Testing

**Files to modify:**

- `package.json` — add `@axe-core/playwright` dev dependency
- `e2e/visual-regression.spec.ts` — add axe-core accessibility checks
  to each page test:

  ```typescript
  import AxeBuilder from '@axe-core/playwright';

  // In each test, after visual screenshot:
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  ```

- Fix any violations found (likely color contrast, missing labels, etc.)
- Create `e2e/ACCESSIBILITY_CHECKLIST.md` with manual verification items:
  - Keyboard navigation (Tab through all interactive elements)
  - Screen reader landmark announcement
  - Skip link functionality
  - Focus visibility on all interactive elements
  - Color contrast ratio verification (4.5:1 minimum)

**Verification:** `npm run test:visual` — all tests pass
including accessibility checks.

### Phase 9: Final Verification and Cleanup

- Run full Playwright suite across all viewports
- Update both macOS and CI baselines
- Measure page weight:
  - Before: Bootstrap 3.2.0 minified (~125KB) + theme.scss
  - After: Custom CSS only (estimated ~15-25KB compressed)
- Verify Google Analytics still fires
- Verify RSS feed and sitemap are unchanged
- Verify all post pages render correctly (spot check 3-4 posts)
- Verify 404 page works
- Verify tag generation still works (`pwsh ./.tag_generator.ps1`)
- Cross-browser spot check (Chrome, Firefox, Safari)

---

## Files Summary

### Files deleted (Phases 1, 6)

| File | Reason |
| --- | --- |
| `_includes/share.html` | Dead code |
| `_includes/social.html` | Dead code |
| `_includes/disqus-comments.html` | Dead code |
| `_includes/disqus-counts.html` | Dead code |
| `_includes/yandex-metrica.html` | Dead code |
| `_sass/bootstrap.min.scss` | Replaced by custom CSS |

### Files created (Phases 4, 5)

| File | Purpose |
| --- | --- |
| `_sass/variables.scss` | CSS custom properties for theme |
| `_sass/layout.scss` | CSS Grid layout system |
| `_sass/components.scss` | Card, nav, sidebar, footer components |
| `_sass/typography.scss` | Text styling |
| `_sass/code.scss` | Syntax highlighting (extracted from theme) |
| `_sass/utilities.scss` | Utility classes |
| `_includes/json-ld.html` | JSON-LD structured data |

### Files to create (Phases 8)

| File | Purpose |
| --- | --- |
| `e2e/ACCESSIBILITY_CHECKLIST.md` | Manual a11y verification |

### Files modified (Phases 1-6)

| File | Changes |
| --- | --- |
| `_includes/header.html` | DOCTYPE, meta tags, semantic nav, JSON-LD |
| `_includes/sidebar.html` | Semantic structure, ARIA labels |
| `_includes/footer.html` | Remove Bootstrap container, add role |
| `_layouts/page.html` | Semantic HTML, CSS Grid classes, fix extra div |
| `_layouts/post.html` | Semantic HTML, CSS Grid classes, datetime attr |
| `_layouts/tag_page.html` | Semantic structure |
| `_layouts/tag_index.html` | Semantic structure |
| `index.html` | Article wrappers, fix .center-image bug |
| `archive.md` | datetime attributes |
| `tags.md` | datetime attributes |
| `_config.yml` | Remove dead config (share, social, disqus) |
| `_sass/theme.scss` | Remove dead CSS, vendor prefixes, Bootstrap refs |
| `assets/css/style.scss` | New import structure |

### Files to modify (Phases 7-9)

| File | Changes |
| --- | --- |
| `_sass/theme.scss` | Remove vendor prefixes, simplify mixins, modernize |
| `package.json` | Add axe-core dependency |
| `e2e/visual-regression.spec.ts` | Add accessibility checks |

---

## Verification Strategy

1. **After each phase**: run `npm run test:visual`
2. **Phases 1, 3, 4**: should pass with zero baseline changes
3. **Phase 2**: may need baseline update (DOCTYPE changes rendering)
4. **Phases 5-7**: should pass during co-existence;
   Phase 6 will need baseline updates after Bootstrap removal
5. **Phase 8**: accessibility tests may reveal issues requiring CSS fixes
6. **Phase 9**: full manual verification + baseline updates for both platforms

## Expected Outcome

- **Bootstrap 3.2.0 removed entirely** (0 framework dependencies)
- **Page weight reduced** by ~100KB+ of unused CSS
- **Semantic HTML** with proper landmarks, headings, ARIA
- **WCAG 2.1 AA compliant** with automated checks
- **JSON-LD structured data** for SEO
- **Correct meta tags** (OG, Twitter Card, description, robots)
- **Modern CSS** (Grid, Flexbox, custom properties, no vendor prefixes)
- **Same visual appearance** verified by Playwright screenshots
- **Zero JavaScript** (except Google Analytics)

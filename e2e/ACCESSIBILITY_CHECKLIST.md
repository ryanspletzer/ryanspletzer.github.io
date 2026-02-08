# Accessibility Checklist

Manual verification items for WCAG 2.0 AA compliance.
Run these checks after any HTML or CSS changes.

## Automated Checks

The Playwright test suite (`e2e/visual-regression.spec.ts`) runs axe-core
against every page with `wcag2a` and `wcag2aa` rule tags.

```bash
npm run test:visual
```

## Manual Checks

### Keyboard Navigation

- [ ] Tab through all interactive elements on each page type
- [ ] Verify visible focus indicator on every focusable element
- [ ] Confirm logical tab order (left to right, top to bottom)
- [ ] Verify skip link ("Skip to content") appears on Tab
  and moves focus to `#main-content`
- [ ] Confirm all navigation links are reachable via keyboard
- [ ] Verify Enter/Space activate all links and buttons

### Screen Reader Landmarks

- [ ] `<header role="banner">` announced as banner
- [ ] `<nav aria-label="Main">` announced as main navigation
- [ ] `<main id="main-content">` announced as main content
- [ ] `<aside aria-label="Sidebar">` announced as complementary
- [ ] `<footer role="contentinfo">` announced as content info
- [ ] `<article>` elements announced on post pages
- [ ] Post tag navigation (`aria-label="Post tags"`) announced

### Focus Visibility

- [ ] Focus ring visible on all links
- [ ] Focus ring visible on skip link when focused
- [ ] Focus ring visible on navigation links
- [ ] Focus styles not clipped or hidden by `overflow: hidden`

### Color Contrast

- [ ] Body text (#e7e9ea) on background (#292929): 13.3:1
- [ ] Link text (#35b4de) on panel background (#333): 5.8:1
- [ ] Code comment tokens meet 4.5:1 against #333 background
- [ ] All syntax highlighting tokens meet 4.5:1 against #333
- [ ] Navigation text (#9d9d9d) on dark header (#222): 4.6:1
- [ ] Blockquote text meets 4.5:1 against background

### Content Structure

- [ ] Heading levels increment by one (no skips)
- [ ] All images have meaningful `alt` text or `alt=""`
  for decorative images
- [ ] Lists use proper `<ul>`/`<ol>` markup
- [ ] Tables have proper `<th>` headers
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Language attribute set on `<html lang="en">`

# Stylesheet architecture

This document describes how the site's CSS is organized and which conventions to follow when changing it.
Everything here is derived from the source in `assets/css/style.scss` and `_sass/`.
`_sass/` is a Jekyll special directory, so this file is never copied to `_site/`.

## Philosophy

This stylesheet exists because the browser already knows how to do most of what Bootstrap did.
The principles below explain the rules in the rest of this document.
When a rule is silent on a case, reason from the principles.

**The platform is the base layer.**
Grid, Flexbox, custom properties, `:has()`, `color-mix()`, and the Popover API are used directly.
Anything added on top has to be small, chosen on purpose, and easy to remove.
Right now that is Sass for `@use`, nesting, and one mixin, plus three short inline scripts.
The framing comes from Rob Eisenberg's Web Component Engineering course, which teaches web standards first,
and from his work on FAST, which uses the standard component model instead of inventing one and keeps the library small.
The refactor post puts it as "the web platform is usually enough."

**Tokens are the design.**
Every color, font, size, and radius is a named custom property on `:root`.
Light mode and high contrast change token values, never rules.
A new shade is derived with `color-mix()` from an existing token before it becomes a new token.
The course has lessons on design tokens,
and FAST defines a token as a named, semantic variable emitted as a CSS custom property.

**HTML carries meaning, CSS carries presentation, JavaScript only adds.**
Landmarks and ARIA live in the templates.
Each script enhances a page that already works without it.
Any UI that only works with JavaScript stays hidden until the script has run.
See [Progressive enhancement and JavaScript](#progressive-enhancement-and-javascript).

**Accessibility is a requirement.**
`prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, focus outlines, and 4.5:1 text contrast
are inputs to every change, not a pass at the end.
The course devotes a module to it, covering focus styling, color contrast, forced colors, and logical properties.
The axe-core checks in the visual suite enforce part of this.

**Tell the browser the rules, not the answers.**
Prefer `min()`, `clamp()`, `minmax()`, logical properties, and content-driven sizing to fixed breakpoints.
Andy Bell calls this being the browser's mentor, not its micromanager.
Jeremy Keith describes it as getting the inputs right instead of controlling every output.
Every Layout puts it as choosing properties, values, and units that let the browser calculate the layout.
The known exception is the container ladder in `layout.scss`.
Its widths of 73.125rem, 60.625rem, and 46.875rem, stepping at 74.9375em, 61.9375em, and 47.9375em,
are Bootstrap's 1170px, 970px, and 750px grid converted to rem.
They are kept so the pre-refactor look stays pixel-identical.

**The cascade is the tool.**
Import order and low specificity resolve conflicts.
A base rule never gets a `:not()` exception for a component.
The only `!important` declarations are on `.lineno` in `code.scss`, and new ones are not added.
Miriam Suzanne makes the same case for cascade layers: escalating specificity is the wrong fix for a conflict.
This site does not use `@layer` or `:where()`.
It has seven partials, one site, and no third-party CSS, so import order already is the layering.
Do not add either reflexively.

**Every byte is justified.**
The built `_site/assets/css/style.css` is about 23 KB, or about 5 KB gzipped.
New styles should justify their bytes.
The tool chain stays as thin as the output.

**The look is preserved by tests, not by habit.**
Any change under `_sass/` runs the Playwright suite.
That is also why the container ladder is still here:
the Playwright baselines were captured before the refactor, and matching them was the goal.

## File layout and cascade order

This section implements "the cascade is the tool": the import order is the layering.
This is the site's own choice.
The course has a lesson on organizing CSS, but none on cascade layers or file order.

`assets/css/style.scss` loads the partials with `@use` in this order:

```scss
@use "variables" as *;
@use "typography" as *;
@use "layout" as *;
@use "components" as *;
@use "code" as *;
@use "syntax" as *;
@use "utilities" as *;
```

The order is a deliberate cascade.
At equal specificity, later files win, and `utilities.scss` loads last so its classes are meant to win.
Put a rule in the earliest file where it belongs, and do not reorder the imports.

| File | Contents |
| --- | --- |
| `_sass/variables.scss` | Every custom property: dark values on `:root`, the `light-theme` mixin, and the `prefers-contrast: more` overrides. |
| `_sass/typography.scss` | Reset and base element rules: `body`, `p`, headings, `img`, `blockquote`, `a`, `:focus-visible`, lists, `dl`, `hr`, `table`. |
| `_sass/layout.scss` | Page structure: `.layout-container`, sticky-footer `body`, the `.site-content` grid, `.site-nav` and the Popover-based mobile menu, the transition and reduced-motion blocks, `.site-footer`, print styles. |
| `_sass/components.scss` | Named UI pieces: `.panel` and `.sidebar-panel`, `.post-content` link and footnote rules, `.post-meta`, `.skip-link`, the theme toggle, `#markdown-toc`, footnote tooltips. |
| `_sass/code.scss` | Code containers: `code`, `pre`, `.highlight`, inline code, line numbers, and the `forced-colors` rule for code blocks. |
| `_sass/syntax.scss` | Rouge token colors, scoped under `.highlight pre`, using the `--syn-*` properties. |
| `_sass/utilities.scss` | Author-facing and helper classes: `.center-image`, `kbd`, `.filename`, the `.note` and `.warning` callouts, `.sr-only`. |

## Specificity rules

Both rules below apply "the cascade is the tool":
conflicts are settled by order and by the smallest specificity that works.

### Use the hook the generator gives you

When a component has to beat a base or `.post-content` rule, it does so on its own selector.
It does not add specificity it did not need.
Examples already in `_sass/components.scss`:

```scss
// Table of contents (kramdown {:toc})
// ID selector gives sufficient specificity to override .post-content rules.
#markdown-toc {
```

The ID is not a tactic.
It is the hook kramdown emits for `{:toc}`, so the component uses it.

```scss
  // Nested lists inherit sans font from parent; override .post-content ul
  ul {
    font-family: var(--font-sans);
```

The anti-pattern is adding a `:not(.something)` exception to a base rule.
That couples the base rule to every component that needs to opt out.

### Do not repeat base element rules inside `.post-content`

`typography.scss` already sets `p { font-family: var(--font-body) }`.
PR #140 (commit `88d44ba`) fixed a bug where `.post-content p` repeated that value.
The extra specificity outranked the bare `.filename` class,
so filename labels above code blocks rendered in Charter instead of monospace.
The fix removed `p` and kept `ul, ol`, which need the declaration because lists inherit the sans body font from `body`:

```scss
  // Lists inherit the sans body font; paragraphs already get --font-body
  // from typography.scss, and repeating it here would outrank class-level
  // utilities such as .filename.
  ul, ol {
    font-family: var(--font-body);
  }
```

Before adding a declaration inside `.post-content`, check whether a base rule in `typography.scss` already provides it.
Repeat a value only when the element would not otherwise inherit it.

## Tokens and theming

This section implements "tokens are the design": color lives in custom properties and nowhere else.
All colors and fonts are custom properties declared in `_sass/variables.scss`.
Dark is the default and lives on `:root`.
The light palette is the `light-theme` mixin, included in two places:

- `@media (prefers-color-scheme: light)` for `:root:not([data-theme="dark"])`,
  which follows the OS unless the user chose dark.
- `:root[data-theme="light"]`, which applies when the user chose light with the toggle.

### Property prefixes

| Prefix | Use |
| --- | --- |
| `--color-*` | Surface, text, border, and component colors, including shadows such as `--color-panel-shadow`. |
| `--syn-*` | Syntax highlighting token colors. |
| `--font-*` | Font stacks: `--font-body`, `--font-sans`, `--font-mono`. |
| `--size-*` | Type sizes: `--size-body`, `--size-code`. |
| `--radius-*` | Border radii: `--radius-inline`, `--radius-block`. |
| `--transition-*` | Durations and easing: `--transition-base`, `--transition-fast`. |
| `--layout-*` | Layout constants: `--layout-max-width`. |

A few properties do not fit a prefix: `--line-height-body`, `--bg-image`, `--bg-overlay`.
Prefer an existing prefix for anything new.

A new color must be defined in both the dark `:root` block and the `light-theme` mixin.
A property defined in only one will leak the dark value into light mode, or the reverse.

Any selector that depends on the active theme must handle all three cases: OS light, explicit light, explicit dark.
The toggle thumb position in `components.scss` shows the pattern.

### High contrast

`prefers-contrast: more` overrides live only in `variables.scss`.
They raise `--color-border`, `--color-table-border`, and `--color-blockquote`, and drop `--bg-image`.
In light mode they also darken `--color-text`.
There are three blocks: dark, light by OS preference, and light by explicit choice.
Add new contrast overrides as custom property changes there rather than as component rules.

### Derived colors and callouts

Callouts in `_sass/utilities.scss` set one `--callout-color` per variant.
The tint, border, and icon are derived from it:

```scss
  border: 1px solid color-mix(in srgb, var(--callout-color) 35%, transparent);
  border-inline-start: 4px solid var(--callout-color);
  background-color: color-mix(in srgb, var(--callout-color) 9%, transparent);
```

The icon is a CSS `mask` filled with `background-color: var(--callout-color)`, so it follows the same color.
Use `color-mix(in srgb, ...)` for tints and borders instead of defining extra `--color-*` properties for each shade.

## Progressive enhancement and JavaScript

This section implements "JavaScript only adds".
Each of the three inline scripts enhances a page that already works without it:

- The theme init in `_includes/header.html`.
- The `aria-expanded` sync for the mobile menu in `_includes/header.html`.
- The footnote tooltips in `_includes/footer.html`.

Any UI that only works with JavaScript is hidden until the script adds `.js-ready`.
`.theme-toggle` in `components.scss` is the pattern.
The refactor post set "zero JavaScript" as a goal.
This rule supersedes that one.
Analytics is a separate include and is not covered here.

Theme switching shows how the pieces fit:

- The inline script in `_includes/header.html` reads `localStorage` key `theme`
  and sets `data-theme` on `<html>` before first paint,
  which prevents a flash of the wrong theme.
- The `ThemeToggle` class in `_includes/footer.html` flips `data-theme`, persists the choice,
  and clears the override when the user picks the same theme as the OS preference.
- The toggle is a `role="switch"` button with `aria-checked`.
  It is hidden until JavaScript adds `.js-ready`.

## Accessibility

This section implements "accessibility is a requirement".
The gates below are where each preference or assistive need is handled.

| Gate | Where |
| --- | --- |
| `:focus-visible` outline on interactive elements | `_sass/typography.scss`; the theme toggle adds a radius in `components.scss`. |
| `.skip-link` | `_sass/components.scss`. |
| `.sr-only` | `_sass/utilities.scss`. |
| `prefers-reduced-motion` | `_sass/layout.scss` (two blocks, see below). |
| `prefers-contrast: more` | `_sass/variables.scss`. |
| `forced-colors: active` | `_sass/code.scss` (code blocks wrap) and `_sass/utilities.scss` (callout border and icon use `CanvasText`). |
| Underlined links in prose | `.post-content a` in `_sass/components.scss`, for WCAG link-in-text-block. |

### Transitions

Theme transitions are gated behind `@media (prefers-reduced-motion: no-preference)` in `_sass/layout.scss`.
That block holds the selector list for color, background, border, and shadow transitions.
A new selector that transitions on theme change goes into that list.
Do not give it its own `transition` declaration.

Some navigation rules in `layout.scss` set `transition` unconditionally (`.site-title`, the nav links, the hamburger bars).
Those are listed in the `prefers-reduced-motion: reduce` block, which sets `transition: none`.
If you add an unconditional `transition`, add its selector to that block.

## Browser support floor

This section sets the limit of "the platform is the base layer".
Features at Baseline "widely available", or Baseline 2023 and later, are acceptable.
The code already uses:

- `:has()` for the hamburger-to-X animation (`layout.scss`) and footnote tooltips (`components.scss`).
- `color-mix()` and CSS `mask` in the callouts (`utilities.scss`).
- The Popover API (`popover="auto"` in `_includes/header.html`, `:popover-open` in `layout.scss`).
- Logical properties such as `inset-inline-start`, `margin-block-end`, and `padding-inline-start`, throughout.
  Use them instead of `left`, `margin-bottom`, and similar.
- `content: "" / "Note: "` for alt text on decorative pseudo-elements (`utilities.scss`).

## Author-facing classes

These are the hooks a post author can use from Markdown.
They keep presentation in the stylesheet and meaning in the Markdown.

### Callouts

Add a kramdown inline attribute list on the line after a paragraph:

```markdown
This is a note.
{: .note}

This is a warning.
{: .note .warning}
```

### Filename label

Place a raw HTML paragraph directly above a fenced code block.
Wrap it in markdownlint disable comments, because it triggers MD033:

````markdown
<!-- markdownlint-disable MD033 -->
<p class="filename">src/utils/helpers.js</p>
<!-- markdownlint-enable MD033 -->

```javascript
export const x = 1;
```
````

`_drafts/filename-demo.md` is a working example.
The `.filename + .highlighter-rouge` rule joins the label and block visually, so nothing else may sit between them.

### Keyboard keys

Use plain inline HTML: `<kbd>Cmd</kbd>`.
Wrap it in the same markdownlint disable comments if it appears in a post.

### Centered image

Add an inline attribute list after the image: `![alt text](/assets/images/example.png){: .center-image}`.
The base `img` rule in `typography.scss` already sets `display: block` and `margin: 0 auto`,
so `.center-image` is currently redundant.
It is kept pending a decision.

### Footnotes and table of contents

Both are kramdown features with styling hooks in `components.scss`:

- Footnotes: `sup a.footnote`, `.reversefootnote`, and the `.footnote-tooltip`
  that JavaScript in `_includes/footer.html` adds.
- `{:toc}` produces `#markdown-toc`.

## Generated class names

Several classes are emitted by Rouge or kramdown and never appear in source files.
Style the hook the generator gives you:

- Rouge token classes such as `.k`, `.nf`, and `.s1`, styled in `_sass/syntax.scss`.
- `.highlighter-rouge` and `.highlight`, styled in `_sass/code.scss` and used by `.filename + .highlighter-rouge` in `_sass/utilities.scss`.
- `.footnotes`, `.footnote`, `.reversefootnote`, and `#markdown-toc`, styled in `_sass/components.scss`.
- `.footnote-tooltip`, `.flip-inline`, and `.is-dismissed`, added at runtime by `_includes/footer.html`.
- `.js-ready`, added at runtime to the theme toggle.

A grep-based audit for unused classes must account for these.
Check `_layouts/`, `_includes/`, and the built `_site/` output before deleting a selector.

## Visual regression gate

This section implements "the look is preserved by tests".
Any change under `_sass/` or `assets/css/` sets the `visual` output of the `changes` job in `.github/workflows/jekyll.yml`.
That triggers the Playwright `visual-tests` job on the pull request.

```bash
# Run the suite locally (starts its own Jekyll server)
bun run test:visual

# Update macOS baselines after an intentional change
bun run test:visual:update
```

Linux baselines are updated with the **Update Visual Baselines** workflow dispatch in GitHub Actions.

Do not run the suite while `jekyll serve --drafts` is up.
`playwright.config.ts` reuses an existing server on port 4000 when not in CI,
so drafts leak into Recent Posts and the listing-page snapshots fail.

## How to add

### A new color token

Serves "tokens are the design": color lives only in custom properties.

1. Add `--color-<name>` to the dark `:root` block in `_sass/variables.scss`.
2. Add the same property to the `light-theme` mixin.
3. If high contrast needs a different value, add it to the `prefers-contrast: more` blocks (all three).
4. Check contrast in both themes: 4.5:1 for text.
5. Run `bun run test:visual`.

Try `color-mix()` from an existing token first.

### A new callout variant

Serves "tokens are the design": the variant sets one color and everything else is derived.
For example, a future `.tip`:

1. Add `--color-tip` to both the dark `:root` block and the `light-theme` mixin.
2. In `_sass/utilities.scss`, add a modifier that sets the two properties:

   ```scss
   .tip {
     --callout-color: var(--color-tip);
     --callout-icon: url("data:image/svg+xml;utf8,<svg ...>");
   }
   ```

3. Add a matching `.tip::before { content: "" / "Tip: "; }` so assistive technology announces the variant,
   as `.warning::before` does.
4. Use it as `{: .note .tip}`.
   The base `.note` rule supplies the layout, and the modifier overrides only the color and icon.
   Declare the modifier after `.note` so it wins at equal specificity.

### A component that must override a `.post-content` default

Serves "the cascade is the tool": settle the conflict with the component's own selector, not with force.

1. Put the rule in `_sass/components.scss` under the component's own selector.
2. Raise specificity on that selector (an ID, as `#markdown-toc` does, or a nested descendant such as `#markdown-toc ul`).
   Do not edit the `.post-content` rule to exclude the component.
3. Re-declare only the properties that differ.
4. If it transitions on theme change, add the selector to the list in `_sass/layout.scss`.
5. Check whether the rule you are overriding duplicates a base rule in `typography.scss`.
   If it does, remove the duplicate rather than fighting it.
6. Run `bun run test:visual`.

## Further reading

- Rob Eisenberg, [Web Component Engineering](https://bluespire.com/course/web-component-engineering/):
  the course behind the platform-first approach.
- `_posts/2026-02-08-one-day-nine-phases-93-percent-less-css.md`: the February refactor post.
- Andy Bell, [Be the browser's mentor, not its micromanager](https://buildexcellentwebsit.es/) (2022).
- Heydon Pickering and Andy Bell, [Every Layout: Axioms](https://every-layout.dev/rudiments/axioms/).
- Jeremy Keith, [Declarative design](https://adactio.com/journal/18982) (April 2022).
- Miriam Suzanne, [A Complete Guide to CSS Cascade Layers](https://css-tricks.com/css-cascade-layers/).

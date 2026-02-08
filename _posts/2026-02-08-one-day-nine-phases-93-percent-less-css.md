---
layout: post
title: One Day, Nine Phases, 93% Less CSS
date: 2026-02-08 00:00:00
description: >
  For years my blog ran Bootstrap 3.2.0 despite needing almost none of it.
  A single day with Claude Code fixed that—and a whole lot more.
tags:
 - ai
 - web-standards
 - accessibility
 - css
---

For years,
this blog ran Bootstrap 3.2.0—a CSS framework released in 2014—despite
using roughly only six of its classes.

I knew modern CSS had made frameworks like Bootstrap largely unnecessary
for a site this simple.

Then [Rob Eisenberg](https://eisenbergeffect.com/) got in my head.

## The Philosophy

Rob has been advocating for a standards-first approach to web development:
zero runtime dependencies,
minimal page weight,
letting the platform do what the platform was built to do.

The web platform in 2026 gives you CSS Grid, Flexbox, custom properties,
and a dozen other capabilities
that didn't exist when Bootstrap was the answer to everything.
Why ship framework CSS when the browser already knows how to do it natively?

And especially when AI can help you make it happen more easily?

## The Safety Net

Before touching a single line of CSS,
I had already invested in a [Playwright](https://playwright.dev/)
visual regression test suite:
27 tests across three viewports (desktop, tablet, mobile),
with pixel-comparison screenshots that catch any unintended visual change.

This was the key enabler.
Without automated visual tests, a refactor like this is a leap of faith.
With them, it's a controlled experiment.
Every change gets verified.
Every phase ends with green tests or it doesn't end.

## Nine Phases, One Day

Working with Claude Code,
I broke the work into nine phases, each independently testable:

1. **Dead code removal** — Deleted unused includes and dead CSS
2. **Bug fixes** — Fixed a missing `<!DOCTYPE html>`, broken OG tags, stray HTML
3. **Semantic HTML** — Replaced `<div>` soup with `<header>`, `<nav>`,
   `<main>`, `<article>`, `<aside>`, `<footer>`
4. **Meta tags and structured data** — Added JSON-LD schemas,
   fixed Twitter cards, added descriptions
5. **CSS architecture** — Built a replacement stylesheet from scratch
   using CSS Grid, Flexbox, and custom properties
6. **Bootstrap removal** — The big swap:
   deleted Bootstrap, removed all its classes from HTML
7. **CSS cleanup** — Removed vendor prefixes,
   modernized layout patterns, converted to `rem`/`em` units
8. **Accessibility testing** — Added
   [axe-core](https://github.com/dequelabs/axe-core) WCAG 2.0 A/AA
   checks to every test
9. **Final verification** — Full suite pass, metrics validation,
   cross-browser spot checks

The site remained functional after every single phase.
No "big bang" rewrite.

## The AI in the Room

I brought the vision, the philosophy,
and the years of experience knowing what "good" looks like.
Claude Code brought the ability to read every file in the codebase,
understand the relationships between templates and stylesheets,
write precise CSS replacements,
fix accessibility violations,
and iterate through test failures—all
at a pace that would have taken me days to match on my own.

The entire nine-phase refactor was completed in a single day.[^single-day]

I set the constraints:
zero JavaScript (besides Google Analytics),
zero framework dependencies,
WCAG 2.0 AA compliance,
identical visual appearance.
Claude Code operated within those constraints.
And when it proposed a solution I didn't agree with—like
adding a JavaScript snippet to make scrollable code blocks
keyboard-accessible—I
pushed back, and we found a CSS-only alternative.[^pre-wrap]

The human taste and judgment were irreplaceable.
The AI velocity was irreplaceable.
Together, they produced something neither could have achieved alone
in the same timeframe.

## The Numbers

| Metric | Before | After | Change |
| --- | --- | --- | --- |
| CSS (uncompressed) | 143 KB | 10.7 KB | **-92.5%** |
| CSS (gzipped) | 25.1 KB | 2.7 KB | **-89.2%** |
| Framework dependencies | Bootstrap 3.2.0 | None | **Eliminated** |
| JavaScript | None | None | **Same** |
| Semantic HTML landmarks | None | Full | **New** |
| WCAG automated checks | 0 | 27 tests | **New** |
| JSON-LD schemas | 0 | 4 | **New** |

93% less CSS.
Same visual appearance.
Better accessibility.
Better SEO.
Better semantics.

## Under the Hood

For the technically curious,
the new CSS architecture is six small SCSS files:

- **`variables.scss`** — CSS custom properties for colors, spacing, typography
- **`typography.scss`** — Font stacks, heading scales, prose styling
- **`layout.scss`** — CSS Grid for the content/sidebar layout
- **`components.scss`** — Navigation, cards, sidebar panels, footer
- **`code.scss`** — Syntax highlighting with WCAG-compliant Solarized colors
- **`utilities.scss`** — A handful of helper classes

I wanted to just use pure CSS and bundle,
but that would have traded one tool for another—I
already have to use Jekyll,
and that already comes with a Sass/SCSS bundler.
(Else it would have just shifted that to some other node-based bundling approach.)

The HTML moved from Bootstrap's `col-md-9` / `col-md-3` grid classes
to semantic elements with meaningful names.
A screen reader now knows what's the navigation,
the main content,
and the sidebar—because the HTML tells it.

## Accessibility Wasn't an Afterthought

One of the most rewarding phases was adding automated accessibility testing
with axe-core.
Every one of the 27 visual regression tests now also runs
a WCAG 2.0 A/AA audit.
If a future change introduces a color contrast violation or a missing label,
the tests catch it before it ships.

The initial audit uncovered two classes of violations:

**Color contrast.**
Seven of nine Solarized syntax highlighting colors
didn't meet the 4.5:1 ratio against the dark code block background.
Each was lightened to the minimum value that passes—close
enough to the original palette that you'd never notice by eye.

**Link distinguishability.**
Links within body text matched the surrounding text color with no underline,
making them invisible to anyone who can't perceive the accent color.
We added underlines to in-content links
while keeping navigational elements (tags, menus) underline-free.

These are the kinds of issues that exist on _millions_ of websites.
Automated tooling makes them trivially detectable.[^axe-core-everyone]

## Less Is More

The web spent the last decade accumulating dependencies:
build tools, framework CSS, JavaScript bundles,
polyfills for features that browsers implemented years ago.

For a personal blog—a site that serves static HTML and CSS—almost
none of that is necessary anymore.
CSS Grid replaced Bootstrap's grid.
Custom properties replaced SCSS variables for theming.
`<nav>`, `<main>`, and `<article>` replaced
the `<div role="navigation">` hacks we used to write.

The platform caught up.
We just have to let go of the scaffolding.

Rob was right.[^rob-footnote]

And if you've been looking for a concrete example
of AI-assisted development
that isn't [vibe coding](/2025/09/pinocchio-is-not-a-real-boy/)
a greenfield app from a prompt,
this is it:
a precise, phase-by-phase modernization of an existing codebase,
with automated tests as the safety net
and a human at the wheel.[^meta-tidying]

The AI didn't dream up the philosophy.
It didn't decide that Bootstrap should go,
or that accessibility mattered,
or that zero JavaScript was a worthy constraint.

But it made the execution _fast_.

## Footnotes

[^single-day]: Spread across a few focused sessions,
    but the total active time was well under a day.
    The pace was limited more by running tests and reviewing output
    than by figuring out what to change.

[^pre-wrap]: The issue: wide code blocks created horizontal scrolling,
    and axe-core flagged the scrollable regions as needing keyboard focus
    (`tabindex="0"`).
    Claude Code proposed a small JavaScript snippet to add the attribute.
    I said no—zero JavaScript is zero JavaScript.
    We landed on `white-space: pre-wrap` instead,
    which wraps long lines and eliminates the scrollable region entirely.
    Problem solved, principles preserved.

[^axe-core-everyone]: If you have a Playwright test suite,
    adding axe-core takes about five minutes and an `npm install`.
    There's really no excuse.

[^rob-footnote]: This is not an endorsement of any particular
    framework or tool Rob has built—it's
    an endorsement of the _philosophy_.
    Use the platform. Ship less. Let the browser do its job.

[^meta-tidying]: There's something delightfully meta about this.
    I wrote a [post about tidying your data house](/2026/01/tidying-your-home-for-your-ai-guests/)
    a few weeks ago
    and then turned around and tidied my own.
    Practice what you preach, I guess.

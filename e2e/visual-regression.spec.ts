import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Visual regression tests for the Jekyll blog.
 * These tests capture screenshots of all major page types to ensure
 * visual consistency during HTML/CSS refactoring.
 */

/**
 * Prepare the page for consistent screenshots:
 * - Wait for fonts to load
 * - Wait for network to be idle
 * - Disable all animations and transitions
 */
async function preparePageForScreenshot(page: Page): Promise<void> {
  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Wait for network to settle
  await page.waitForLoadState('networkidle');

  // Disable animations, transitions, scrollbar flicker, and caret blink
  // for deterministic screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
      }
      * {
        scrollbar-width: none !important;
      }
    `,
  });

  // Wait for styles to apply and rendering to fully settle
  await page.waitForTimeout(500);
}

/**
 * Take a full-page screenshot with a descriptive name.
 * Use for pages with fixed content (individual posts, about, 404, linkfarm).
 */
async function takeFullPageScreenshot(page: Page, name: string): Promise<void> {
  await preparePageForScreenshot(page);

  // Force a full layout pass by scrolling to the bottom and back.
  // This ensures the browser resolves the final page height before
  // Playwright's stability check resizes the viewport for full-page capture.
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);

  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    timeout: 15000,
  });
}

/**
 * Take a viewport-only screenshot with a descriptive name.
 * Use for content-listing pages (homepage, archive, tags) whose length
 * changes when new posts are published. This avoids baseline churn
 * while still catching CSS/layout regressions in the visible area.
 */
async function takeViewportScreenshot(page: Page, name: string): Promise<void> {
  await preparePageForScreenshot(page);

  await expect(page).toHaveScreenshot(`${name}.png`, {
    timeout: 15000,
  });
}

/**
 * Run axe-core accessibility checks against the current page.
 * Checks WCAG 2.0 Level A and AA conformance.
 */
async function checkAccessibility(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
}

test.describe('Homepage', () => {
  test('visual appearance', async ({ page }) => {
    await page.goto('/');
    await takeViewportScreenshot(page, 'homepage');
    await checkAccessibility(page);
  });
});

test.describe('Blog Post', () => {
  test('post with code blocks', async ({ page }) => {
    // Test a post that contains code blocks to verify syntax highlighting
    await page.goto('/2024/04/a-no-nonsense-guide-to-setting-up-python-environments/');
    await takeFullPageScreenshot(page, 'post-with-code');
    await checkAccessibility(page);
  });

  test('standard post', async ({ page }) => {
    // Test a standard text-heavy post
    await page.goto('/2023/03/the-return/');
    await takeFullPageScreenshot(page, 'post-standard');
    await checkAccessibility(page);
  });
});

test.describe('Archive', () => {
  test('visual appearance', async ({ page }) => {
    await page.goto('/archive/');
    await takeViewportScreenshot(page, 'archive');
    await checkAccessibility(page);
  });
});

test.describe('Tags', () => {
  test('tags index page', async ({ page }) => {
    await page.goto('/tags/');
    await takeViewportScreenshot(page, 'tags-index');
    await checkAccessibility(page);
  });

  test('individual tag page', async ({ page }) => {
    // Test a tag page with multiple posts
    await page.goto('/tag/ai/');
    await takeViewportScreenshot(page, 'tag-ai');
    await checkAccessibility(page);
  });
});

test.describe('About', () => {
  test('visual appearance', async ({ page }) => {
    await page.goto('/about/');
    await takeFullPageScreenshot(page, 'about');
    await checkAccessibility(page);
  });
});

test.describe('Linkfarm', () => {
  test('visual appearance', async ({ page }) => {
    await page.goto('/linkfarm/');
    await takeFullPageScreenshot(page, 'linkfarm');
    await checkAccessibility(page);
  });
});

test.describe('404 Page', () => {
  test('visual appearance', async ({ page }) => {
    await page.goto('/404.html');
    await takeFullPageScreenshot(page, '404');
    await checkAccessibility(page);
  });
});

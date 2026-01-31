import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing.
 * Tests run against the local Jekyll development server.
 */
export default defineConfig({
  testDir: './e2e',

  // Run tests sequentially for consistent screenshots
  fullyParallel: false,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Single worker for visual tests to ensure consistency
  workers: 1,

  // Reporter configuration
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'on-failure' }]],

  // Shared settings for all projects
  use: {
    // Base URL for the Jekyll dev server
    baseURL: 'http://localhost:4000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot settings
    screenshot: 'only-on-failure',
  },

  // Configure snapshot settings
  snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{testFileName}/{arg}-{projectName}{ext}',
  expect: {
    toHaveScreenshot: {
      // Allow 0.2% pixel difference for cross-platform font rendering differences
      maxDiffPixelRatio: 0.002,
      // Threshold for per-pixel color difference (0-1)
      threshold: 0.2,
    },
  },

  // Projects for different viewport sizes (all use Chromium for consistency)
  projects: [
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'Tablet',
      use: {
        browserName: 'chromium',
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'Mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        isMobile: true,
      },
    },
  ],

  // Run local Jekyll server before starting tests
  webServer: {
    command: 'bundle exec jekyll serve --no-watch',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Jekyll can take a while to build
  },
});

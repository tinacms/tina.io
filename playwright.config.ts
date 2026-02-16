import { defineConfig, devices } from '@playwright/test';

/**
 * Pass BASE_URL to test against a staging/production site instead of localhost:
 *   BASE_URL=https://tina.io pnpm exec playwright test tests/visual-compare/capture.spec.ts
 */
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const isExternalTarget = !!process.env.BASE_URL;

export default defineConfig({
  timeout: 120000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  /* Keep concurrency low to avoid overwhelming targets */
  workers: isExternalTarget ? 5 : 2,
  reporter: 'html',

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--ignore-certificate-errors'],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Only start local dev server when not using an external URL */
  ...(!isExternalTarget && {
    webServer: {
      command: 'pnpm dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  }),
  use: {
    baseURL,
  },
});

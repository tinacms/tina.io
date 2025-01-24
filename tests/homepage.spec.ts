import { devices, expect, test } from '@playwright/test';

test.use(devices['iPhone 12']);
test('TinaCMS homepage loads and displays successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sites, Docs and Llamas. No' })).toBeVisible();

  await expect(page.getByText('TinaCMS is an open-source,')).toBeVisible();
});

test.use(devices['iPhone 12']);
test('TinaCMS homepage scrolls without breaking', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Sites, Docs and Llamas. No' })).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
});

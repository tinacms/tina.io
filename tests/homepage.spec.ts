import { devices, expect, test } from '@playwright/test';

test.use(devices['iPhone 11']);
test('TinaCMS homepage loads and displays successfully on iPhone 11', async ({
  page,
}) => {
  await page.goto('https://tina.io/');

  await page.pause(); 

  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Loved by Developers' })
  ).toBeVisible();
});

test.use(devices['iPhone 11']);
test('TinaCMS homepage scrolls without breaking on iPhone 11', async ({ page }) => {
  await page.goto('https://tina.io/');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // wait for 1 second

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000); // wait for 1 second

  // Check if the page is still functional by verifying an element is visible
  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
});
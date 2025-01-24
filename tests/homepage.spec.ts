import { devices, expect, test } from '@playwright/test';



test.use(devices['iPhone 12']);
test('TinaCMS homepage loads and displays successfully', async ({
  page,
}) => {
  await page.goto('/', {waitUntil: 'load'});
  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Loved by Developers' })
  ).toBeVisible();
});

test.use(devices['iPhone 12']);
test('TinaCMS homepage scrolls without breaking', async ({ page }) => {
  await page.goto('/', {waitUntil: 'load'});

  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000); 

});
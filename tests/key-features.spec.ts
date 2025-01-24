import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();

  await page.getByRole('heading', { name: 'Develop Locally' }).click();
  await page.getByText('Easily set up and run Tina').click();
});

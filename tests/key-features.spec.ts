import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible({timeout: 10000});
  await page.getByRole('heading', { name: 'Visual Editing' }).click();
  await expect(page.getByRole('heading', { name: 'Visual Editing' })).toBeVisible({timeout: 10000});
  await page.getByRole('heading', { name: 'Open Source' }).click();
  await expect(page.getByRole('heading', { name: 'Open Source' })).toBeVisible({timeout: 10000});
  await page.getByRole('heading', { name: 'Develop Locally' }).click();
  await expect(page.getByRole('heading', { name: 'Develop Locally' })).toBeVisible({timeout: 10000});
});
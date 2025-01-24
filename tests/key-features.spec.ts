import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await page.getByRole('heading', { name: 'Visual Editing' }).click();
  await expect(page.getByRole('heading', { name: 'Visual Editing' })).toBeVisible();
  await page.getByRole('heading', { name: 'Open Source' }).click();
  await expect(page.getByRole('heading', { name: 'Open Source' })).toBeVisible();
  await page.getByRole('heading', { name: 'Develop Locally' }).click();
  await expect(page.getByRole('heading', { name: 'Develop Locally' })).toBeVisible();
});
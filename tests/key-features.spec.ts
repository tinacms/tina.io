import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tina.io/');
  await page.getByRole('heading', { name: 'Visual Editing' }).click();
  await expect(page.getByRole('heading', { name: 'Visual Editing' })).toBeVisible();
  await page.getByRole('heading', { name: 'Open Source' }).click();
  await expect(page.getByRole('heading', { name: 'Open Source' })).toBeVisible();
  await page.getByRole('heading', { name: 'Develop Locally' }).click();
  await expect(page.getByRole('heading', { name: 'Develop Locally' })).toBeVisible();
  await page.getByRole('link', { name: 'READ MORE', exact: true }).click();

  await expect(page.url()).toBe('https://tina.io/docs/setup-overview');
  await expect(page.getByText('Getting Started With Tina')).toBeVisible();
});
import { devices, expect, test } from '@playwright/test';

test.use(devices['iPhone 11']);

test('TinaCMS homepage loads and displays successfully on iPhone 11', async ({
  page,
}) => {
  await page.goto('https://tina.io/');

  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Loved by Developers' })
  ).toBeVisible();
});

test.use(devices['iPhone 13 Mini']);

test('TinaCMS homepage loads and displays successfully on iPhone 13 Mini', async ({
  page,
}) => {
  await page.goto('https://tina.io/');

  await expect(page.getByText('Loving Tina? ⭐️ us on GitHub')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Trusted By' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Loved by Developers' })
  ).toBeVisible();
});

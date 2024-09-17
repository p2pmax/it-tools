import { test, expect } from '@playwright/test';

test.describe('Tool - Yt dlp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/yt-dlp');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Yt dlp - IT Tools');
  });

  test('', async ({ page }) => {

  });
});
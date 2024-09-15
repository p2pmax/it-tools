import { test, expect } from '@playwright/test';

test.describe('Tool - P2p proxy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/p2p-proxy');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('P2p proxy - IT Tools');
  });

  test('', async ({ page }) => {

  });
});
import { test, expect } from '@playwright/test';

test('order modal opens and traps focus', async ({ page }) => {
  // Adjust this URL if your dev server is running on a different port
  const base = process.env.TEST_URL || 'http://localhost:5174/';
  await page.goto(base);

  // Click the first "Order Now" button on the Home page
  await page.locator('.card .button.primary').first().click();

  // Wait for modal to be visible
  await page.waitForSelector('.modal-panel', { state: 'visible' });
  const modal = page.locator('.modal-panel');
  await expect(modal).toBeVisible();

  // Ensure the currently focused element is inside the modal
  const focusedInside = await page.evaluate(() => {
    const m = document.querySelector('.modal-panel');
    return !!m && m.contains(document.activeElement);
  });
  expect(focusedInside).toBeTruthy();

  // Count focusable elements inside modal
  const focusableCount = await page.evaluate(() => {
    const m = document.querySelector('.modal-panel');
    if (!m) return 0;
    return m.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').length;
  });

  // Press Tab repeatedly and ensure focus stays inside the modal
  for (let i = 0; i < Math.max(3, focusableCount + 2); i++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => {
      const m = document.querySelector('.modal-panel');
      return !!m && m.contains(document.activeElement);
    });
    expect(inside).toBeTruthy();
  }

  // Close the modal using Escape and ensure it's removed
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);
});

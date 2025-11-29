const playwright = require('playwright');

(async () => {
  const url = process.env.TEST_URL || 'http://localhost:5174/';
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });

    // Click the first Order Now button
    const orderBtn = await page.locator('.card .button.primary').first();
    await orderBtn.click();

    // Wait for modal
    await page.waitForSelector('.modal-panel', { state: 'visible', timeout: 5000 });
    console.log('Modal visible');

    // Ensure focus is inside modal
    const focusedInside = await page.evaluate(() => {
      const m = document.querySelector('.modal-panel');
      return !!m && m.contains(document.activeElement);
    });
    if (!focusedInside) throw new Error('Focused element is not inside modal');

    // Count focusable elements and tab through, ensuring focus stays inside
    const focusableCount = await page.evaluate(() => {
      const m = document.querySelector('.modal-panel');
      if (!m) return 0;
      return m.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').length;
    });

    for (let i = 0; i < Math.max(3, focusableCount + 2); i++) {
      await page.keyboard.press('Tab');
      const insideNow = await page.evaluate(() => {
        const m = document.querySelector('.modal-panel');
        return !!m && m.contains(document.activeElement);
      });
      if (!insideNow) throw new Error('Focus escaped modal during tabbing');
    }

    // Close with Escape
    await page.keyboard.press('Escape');
    // Small wait
    await page.waitForTimeout(300);
    const remaining = await page.evaluate(() => document.querySelectorAll('.modal-panel').length);
    if (remaining !== 0) throw new Error('Modal did not close on Escape');

    console.log('SUCCESS: modal opened, trapped focus, and closed via Escape');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('TEST FAILED:', err);
    try { await browser.close(); } catch (e) {}
    process.exit(2);
  }
})();

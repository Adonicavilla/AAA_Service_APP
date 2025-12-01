import { test, expect } from '@playwright/test'

test('select items, proceed to checkout, and place order', async ({ page }) => {
  const base = process.env.TEST_URL || 'http://localhost:5173/'
  await page.goto(base)

  // Click the first "Order Now" on Home
  await page.locator('a.button.primary').first().click()

  // Wait for delivery page and modal Menu to appear
  await page.locator('text=Menu').first().waitFor({ state: 'visible', timeout: 3000 })

  // Increase first menu item twice
  const inc = page.locator('button[aria-label^="Increase"]').first()
  await inc.click()
  await inc.click()

  // Confirm to proceed to checkout (saves cartDraft)
  await page.locator('button', { hasText: 'Confirm Order' }).click()

  // Wait for checkout page
  await page.waitForURL('**/checkout')

  // Fill delivery details
  await page.fill('#checkout-name', 'Test User')
  await page.fill('#checkout-phone', '123456789')
  await page.fill('#checkout-address', '1 Test Ln')

  // Place order
  await page.locator('button', { hasText: 'Place Order' }).click()

  // Wait for account page
  await page.waitForURL('**/account')

  // Verify localStorage orders include an order with items and subtotal
  const orders = await page.evaluate(() => JSON.parse(localStorage.getItem('orders') || '[]'))
  expect(Array.isArray(orders)).toBeTruthy()
  expect(orders.length).toBeGreaterThan(0)
  const recent = orders[0]
  expect(recent).toHaveProperty('items')
  expect(recent.items.length).toBeGreaterThan(0)
  expect(recent).toHaveProperty('subtotal')
  expect(recent.subtotal).toBeGreaterThan(0)
  expect(recent.name).toBe('Test User')
})

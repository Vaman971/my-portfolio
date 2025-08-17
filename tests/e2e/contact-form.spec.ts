import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
  // Mock API so we skip reCAPTCHA
  await page.route('/api/contact', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto('/');

  // Scroll into view so Framer Motion actually renders inputs
  await page.locator('#contact').scrollIntoViewIfNeeded();

  // Wait for input to be ready
  await page.waitForSelector('#name', { state: 'visible', timeout: 10000 });

  // Fill form
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#message', 'Hello from Playwright!');
  await page.click('button[type="submit"]');

  // Wait for status element to appear before checking text
  const statusMessage = page.getByRole('status');
  await expect(statusMessage).toBeVisible({ timeout: 10000 });
  await expect(statusMessage).toHaveText(/message sent successfully/i, { timeout: 5000 });
});

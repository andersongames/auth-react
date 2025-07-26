import { test, expect } from '@playwright/test';

test.describe('/unauthorized', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/unauthorized');
  });

  test('should be accessible by unauthenticated users and show access denied message', async ({ page }) => {
    await expect(page).toHaveURL('/unauthorized');
    await expect(page.getByRole('heading', { name: /access denied/i })).toBeVisible();
    await expect(page.getByText(/you do not have permission/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /back to login/i })).toBeVisible();
  });

  test('should navigate to /login when unauthenticated user clicks "Back to login"', async ({ page }) => {
    await page.getByRole('link', { name: /back to login/i }).click();
    await expect(page).toHaveURL('/login');
  });

  test('should show "Back to dashboard" for authenticated users and navigate to /dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-5',
          name: 'User Five',
          email: 'user5@mail.com',
          password: 'User@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-5',
        expiresAt: Date.now() + 10000,
      }));
    });

    await expect(page.getByRole('link', { name: /back to dashboard/i })).toBeVisible();

    await page.getByRole('link', { name: /back to dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });
});

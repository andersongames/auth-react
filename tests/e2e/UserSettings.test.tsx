import { test, expect } from '@playwright/test';

test.describe('/user-settings', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('/user-settings');
  });

  test('should redirect unauthenticated users to /login', async ({ page }) => {
    await expect(page).toHaveURL('/login');
  });

  test('should render correctly for authenticated user', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-4',
          name: 'User Four',
          email: 'user4@mail.com',
          password: 'User@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-4',
        expiresAt: Date.now() + 10000,
      }));
    });

    await expect(page).toHaveURL('/user-settings');
    await expect(page.getByRole('heading', { name: /user settings/i })).toBeVisible();
  });

  test('should navigate to daashboard page when clicking the Go to Dashboard link', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'admin-123',
          name: 'Admin User',
          email: 'test_admin@mail.com',
          password: 'Admin@123',
          role: 'admin',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'admin-123',
        expiresAt: Date.now() + 10000,
      }));
    });

    await page.getByRole('link', { name: /go to dashboard/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });
});

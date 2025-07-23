import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard - Access Control', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin-dashboard');
  });

  test('should redirect unauthenticated users to /login', async ({ page }) => {
    await page.waitForURL('/login', { timeout: 3000 });
    await expect(page).toHaveURL('/login');
  });

  test('should redirect users with non-admin roles to /unauthorized', async ({ page }) => {
    // simulate authenticated user with role 'user'
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-123',
          name: 'Test User',
          email: 'test_user@mail.com',
          password: 'Test@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-123',
        expiresAt: Date.now() + 10000,
      }));
    });

    await page.goto('/admin-dashboard');
    await page.waitForURL('/unauthorized', { timeout: 3000 });
    await expect(page).toHaveURL('/unauthorized');
    await expect(page.getByText(/this page requires admin/i)).toBeVisible();
  });

  test('should allow access and render page for admin users', async ({ page }) => {
    // simulate authenticated user with role 'admin'
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

    await page.goto('/admin-dashboard');
    await expect(page).toHaveURL('/admin-dashboard');
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible();
  });

  test('should navigate to user list page when clicking the View All Registered Users link', async ({ page }) => {
    // simulate authenticated user with role 'admin'
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

    await page.getByRole('link', { name: /view all registered users/i }).click();
    await expect(page).toHaveURL('/admin-dashboard/user-list');
  });
});

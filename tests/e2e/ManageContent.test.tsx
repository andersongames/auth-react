// tests/e2e/ManageContent.test.tsx
import { test, expect } from '@playwright/test';

test.describe('Manage Content - Access Control', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/manage-content');
  });

  test('should redirect unauthenticated users to /login', async ({ page }) => {
    await page.waitForURL('/login', { timeout: 3000 });
    await expect(page).toHaveURL('/login');
  });

  test('should redirect users with role "user" to /unauthorized', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-456',
          name: 'User Basic',
          email: 'user@mail.com',
          password: 'Test@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-456',
        expiresAt: Date.now() + 10000,
      }));
    });

    await page.waitForURL('/unauthorized', { timeout: 3000 });
    await expect(page).toHaveURL('/unauthorized');
    await expect(page.getByText(/admin or editor/i)).toBeVisible();
  });

  test('should allow access for users with role "admin"', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'admin-789',
          name: 'Admin User',
          email: 'admin@mail.com',
          password: 'Admin@123',
          role: 'admin',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'admin-789',
        expiresAt: Date.now() + 10000,
      }));
    });

    await expect(page).toHaveURL('/manage-content');
    await expect(page.getByRole('heading', { name: /content management/i })).toBeVisible();
  });

  test('should allow access for users with role "editor"', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'editor-001',
          name: 'Editor User',
          email: 'editor@mail.com',
          password: 'Editor@123',
          role: 'editor',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'editor-001',
        expiresAt: Date.now() + 10000,
      }));
    });

    await expect(page).toHaveURL('/manage-content');
    await expect(page.getByRole('heading', { name: /content management/i })).toBeVisible();
  });

  test('should navigate to dashboard page when clicking the Go to dashboard link', async ({ page }) => {
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

import { test, expect } from '@playwright/test';

test.describe('Dashboard - Access Control & Role-Based Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should redirect unauthenticated users to /login', async ({ page }) => {
    await page.waitForURL('/login', { timeout: 3000 });
    await expect(page).toHaveURL('/login');
  });

  test('should render dashboard for authenticated users (role: user)', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-1',
          name: 'User One',
          email: 'user@mail.com',
          password: 'User@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-1',
        expiresAt: Date.now() + 10000,
      }));
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Name: User One')).toBeVisible();
    await expect(page.getByText(/user@mail.com/i)).toBeVisible();
    await expect(page.getByText(/role: user/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /access personal settings/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /learn more about this app/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /go to admin panel/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /manage content/i })).toHaveCount(0);
  });

  test('should render dashboard for authenticated users (role: admin)', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'admin-1',
          name: 'Admin One',
          email: 'admin@mail.com',
          password: 'Admin@123',
          role: 'admin',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'admin-1',
        expiresAt: Date.now() + 10000,
      }));
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Name: Admin One')).toBeVisible();
    await expect(page.getByText(/admin@mail.com/i)).toBeVisible();
    await expect(page.getByText(/role: admin/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /go to admin panel/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /manage content/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /learn more about this app/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /access personal settings/i })).toHaveCount(0);
  });

  test('should render dashboard for authenticated users (role: editor)', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'editor-1',
          name: 'Editor One',
          email: 'editor@mail.com',
          password: 'Editor@123',
          role: 'editor',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'editor-1',
        expiresAt: Date.now() + 10_000,
      }));
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Name: Editor One')).toBeVisible();
    await expect(page.getByText(/editor@mail.com/i)).toBeVisible();
    await expect(page.getByText(/role: editor/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /manage content/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /go to admin panel/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /access personal settings/i })).toHaveCount(0);
  });

  test('should navigate to correct pages from dashboard links', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'admin-2',
          name: 'Admin Two',
          email: 'admin2@mail.com',
          password: 'Admin@123',
          role: 'admin',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'admin-2',
        expiresAt: Date.now() + 10_000,
      }));
    });

    await page.goto('/dashboard');

    await page.getByRole('link', { name: /learn more about this app/i }).click();
    await expect(page).toHaveURL('/about');
    await page.goBack();

    await page.getByRole('link', { name: /go to admin panel/i }).click();
    await expect(page).toHaveURL('/admin-dashboard');
    await page.goBack();

    await page.getByRole('link', { name: /manage content/i }).click();
    await expect(page).toHaveURL('/manage-content');
  });

  test('should navigate to /user-settings when clicking link (role: user)', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([
        {
          id: 'user-3',
          name: 'User Three',
          email: 'user3@mail.com',
          password: 'User@123',
          role: 'user',
        }
      ]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: 'user-3',
        expiresAt: Date.now() + 10_000,
      }));
    });

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    await page.getByRole('link', { name: /access personal settings/i }).click();
    await expect(page).toHaveURL('/user-settings');
  });
});

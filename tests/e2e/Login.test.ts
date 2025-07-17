// /tests/e2e/Login.test.ts
import { test, expect } from '@playwright/test'
import { errorMessages } from '../../src/constants/errorMessages'
import { successMessages } from '../../src/constants/successMessages'

test.describe('Login Page - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should log in successfully and redirect to /dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([{
        email: "test_adm@mail.com",
        id: "4248dd16-8ab9-4ef9-b65a-5a53335a3a65",
        name: "adm",
        password: "FdT&8njCbVF5WAPF",
        role: "admin",
      }]));
    });

    await page.fill('input[name="email"]', 'test_adm@mail.com')
    await page.fill('input[name="password"]', 'FdT&8njCbVF5WAPF')
    await page.click('button[type="submit"]')

    await expect(page.getByTestId('spinner')).toBeVisible();
    await expect(page).toHaveURL('/dashboard', { timeout: 5000 });
  })

  test('should show error on invalid login credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('spinner')).toBeVisible();
    const toast = page.getByText(errorMessages.invalidCredentials);
    await expect(toast).toBeVisible();
  })

  test('should show logout success toast and stay on /login when ?loggedOut=true', async ({ page }) => {
    await page.goto('/login?loggedOut=true');
    const toast = page.getByText(successMessages.loggedOut);
    await expect(toast).toBeVisible();
    await expect(page).toHaveURL('/login');
  })

  test('should show session expired toast and stay on /login when ?expired=true', async ({ page }) => {
    await page.goto('/login?expired=true');
    const toast = page.getByText(errorMessages.sessionExpired);
    await expect(toast).toBeVisible();
    await expect(page).toHaveURL('/login');
  })

  test('should redirect to /dashboard if already authenticated', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([{
        email: "test_adm@mail.com",
        id: "4248dd16-8ab9-4ef9-b65a-5a53335a3a65",
        name: "adm",
        password: "FdT&8njCbVF5WAPF",
        role: "admin",
      }]));
      localStorage.setItem('mock_auth', JSON.stringify({
        userId: "4248dd16-8ab9-4ef9-b65a-5a53335a3a65",
        expiresAt: 9999999999999
      }));
    })

    await page.goto('/login');;
    await expect(page).toHaveURL('/dashboard', { timeout: 3000 });
  })

  test('should navigate to register page when clicking the Register link', async ({ page }) => {
    await page.getByRole('link', { name: /register/i }).click()
    await expect(page).toHaveURL('/register')
  })
})

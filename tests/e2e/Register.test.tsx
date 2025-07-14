import { test, expect } from '@playwright/test';
  
test.describe('Register Page - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should register successfully and redirect to /login', async ({ page }) => {
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="password"]', 'Abc123!@');
    await page.fill('input[name="confirmPassword"]', 'Abc123!@');
    await page.selectOption('select[name="role"]', 'admin');
    await page.click('button[type="submit"]');

    // Aguarda redirecionamento
    await page.waitForURL('/login', { timeout: 5000 });
    await expect(page).toHaveURL('/login');
  });

  test('should redirect to /dashboard if already authenticated', async ({ page }) => {
    // simulate login
    await page.evaluate(() => {
      localStorage.setItem('mock_users', JSON.stringify([{
        email: "anderson_adm@mail.com",
        id: "4248dd16-8ab9-4ef9-b65a-5a53335a3a65",
        name: "anderson",
        password: "FdT&8njCbVF5WAPF",
        role: "admin",
      }]));
      localStorage.setItem('mock_auth', JSON.stringify({ expiresAt: 9999999999999, userId: "4248dd16-8ab9-4ef9-b65a-5a53335a3a65" }));
    });

    await page.goto('/register');
    await page.waitForURL('/dashboard', { timeout: 3000 });
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show validation errors for invalid fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByText(/name must have at least/i)).toBeVisible();
    await expect(page.getByText(/invalid email/i)).toBeVisible();
    await expect(page.getByText(/password must have at least/i)).toBeVisible();
  });

  test('should show password requirements in green when valid', async ({ page }) => {
    await page.fill('input[name="password"]', 'Abc123!@');

    await expect(page.getByText('At least 8 characters')).toHaveClass(/text-green/);
    await expect(page.getByText('One uppercase letter')).toHaveClass(/text-green/);
    await expect(page.getByText('One lowercase letter')).toHaveClass(/text-green/);
    await expect(page.getByText('One number')).toHaveClass(/text-green/);
    await expect(page.getByText('One special character')).toHaveClass(/text-green/);
  });

  test('should navigate to login page when clicking login link', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL('/login');
  });
});

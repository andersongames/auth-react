## ✅ Register.tsx Page — Test Plan
### 🧪 Unit Tests
Test isolated elements and behaviors of the form.

**Fields and Rendering**
- [x] Renders all mandatory fields (name, email, password, confirmPassword, role)
- [ ] Renders the "Sign Up" button correctly enabled/disabled
- [x] Displays error messages when:
  - [x] Name has less than 2 characters
  - [x] Invalid email
  - [x] Password has less than 8 characters
  - [x] Password is missing a number, symbol, uppercase, or lowercase letter
  - [x] Passwords don't match
- [x] Shows password requirements with the correct color (green/red) while typing

### 🔄 Integration Tests
Verify the interaction between the form, authentication context, services, navigation, and toasts.

- [x] Submits with valid data and:
  - [x] Calls registerUser() with the correct data
  - [x] Shows a success toast (toast.success(...))
  - [x] Redirects to /login after 2 seconds
- [x] Shows toast.error(...) if registerUser() throws an error
- [x] Verifies if handleUnexpectedError() is called on unknown errors
- [x] Redirects immediately to /dashboard if isAuthenticated is true (simulated via AuthContext)

### 🌐 End-to-End (E2E) Tests
Require a real browser environment (Cypress or Playwright), focus on the real user flow.

- [x] Access /register, fill in valid data, and confirm redirection to /login
- [x] Access /register already authenticated → redirected to /dashboard
- [x] Fill in invalid data and check for inline error messages
- [x] Fill in password with Abc123!@#, check for visual highlight of requirements (green)
- [x] Click on "Already have an account? Login" and verify redirection to /login

### 🧠 Technical Notes
- Unit tests should be done with @testing-library/react and userEvent.setup()
- Integration tests should use renderWithProviders() with MemoryRouter + AuthProvider
- E2E tests should be isolated in /tests/e2e/Register.test.ts (Playwright)
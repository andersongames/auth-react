# ✅ Test Plan — Login.tsx Page

## 🧪 Unit Tests
Test isolated elements and behaviors of the form.

**Fields and Rendering**
- [x] Renders all required fields (email, password)
- [x] Renders the "Login" button correctly enabled/disabled

**Error Messages**
- [x] Displays a message if the email is invalid
- [x] Displays a message if the password field is empty

**Visual Feedback**
- [x] Shows a spinner while `isSubmitting` is `true`

---

## 🔄 Integration Tests
Verify the interaction between the form, AuthContext, navigation, toasts, and feedback.

- [x] Submits with valid data and:
  - [x] Calls `login()` with the correct data (mocked)
  - [x] Redirects to `/dashboard`
- [x] Submits with invalid credentials:
  - [x] Shows `toast.error(...)` (via `handleUnexpectedError`)
- [x] Redirects immediately to `/dashboard` if `isAuthenticated` is `true` (simulated via context)
- [x] Displays `toast.success(...)` if `?loggedOut=true` in the URL
- [x] Displays `toast.error(...)` if `?expired=true` in the URL
- [x] Correctly navigates to `/register` when clicking on "Don't have an account?"

---

## 🌐 End-to-End (E2E) Tests
Complete browser validation with Playwright.

- [x] Access `/login`, fill in valid data, and verify redirection to `/dashboard`
- [x] Try to log in with invalid data → shows an error (backend mock or real validation)
- [x] Access `/login?loggedOut=true` → displays logout toast and redirects to `/login`
- [x] Access `/login?expired=true` → displays expired session toast and redirects to `/login`
- [x] If the user is already logged in (mock session), access `/login` → redirects to `/dashboard`
- [x] Click on "Register" → redirects to `/register`

---

## 🧠 Technical Observations

- Unit tests should be done with `@testing-library/react` and `userEvent.setup()`
- Integration tests should use `renderWithProviders()` with `MemoryRouter + AuthProvider`
- E2E tests should be implemented in `/tests/e2e/Login.test.ts` with Playwright
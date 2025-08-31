# ✅ Items That Can Be Implemented

## 🔒 Authentication Features
- [x] User registration with validation
- [x] User login with validation
- [x] Logout with session cleanup
- [x] Session persistence with `localStorage`
- [x] Route protection via `ProtectedRoute`
- [x] Global authentication context (`AuthContext`)
- [x] Redirect authenticated users from the login page
- [x] Redirect authenticated users from the registration page
- [x] Automatically redirect user to `/dashboard` after login
- [x] Automatically redirect user to `/login` after registration
- [x] Add navigation between `/register` and `/login`
- [x] Session expiration (due to inactivity or fixed time)
- [x] Migrate user `id` to `string` type with UUID

---

## 🎯 Role-Based Access Control (RBAC)
- [x] Protected page exclusive for users with "admin" role (`/admin-dashboard`)
- [x] Protected page exclusive for users with "user" role (`/user-settings`)
- [x] Public page with dynamic content based on the role (ex: /about)
- [x] Support for multiple roles in `ProtectedRoute` (ex: ["admin", "editor"])
- [x] Display logged-in user metadata on the interface (ex: name, role, email)
- [x] Hide or disable buttons based on the role (ex: "Delete User" only for admin)
- [x] Admin panel with a list of all mocked users
- [x] Denied access page with a contextual message based on the required role
- [x] Role change by admin (promote/demote users)
- [x] Delete users by admin

---

## 🎨 User Experience (UX)
- [x] Visual loading feedback (spinners) during login, registration, etc.
- [x] Disable submit button while sending data
- [x] Visual confirmation message after logout
- [x] Fully functional keyboard navigation
- [x] Labels correctly associated with inputs (accessibility)
- [x] Full responsiveness on mobile devices

---

## 🌙 Theme and Style
- [x] Implement dark mode (Dark Mode Toggle)
- [x] Layout with a more modern and accessible design
- [x] Show logged-in user name on the `Dashboard` (instead of ID)
- [x] 404 / unauthorized access error page

---

## 🧪 Tests
### ✅ Unit Tests
- [ ] Create unit tests for the registration form
- [ ] Create unit tests for the login form
- [ ] Create tests for the `AuthContext`
- [ ] Create unit tests for the `ProtectedRoute` component
- [ ] Test `handleUnexpectedError` behavior

### ✅ Integration Tests
- [ ] Test role change by admin (UserList)
- [ ] Test user deletion by admin (UserList)
- [ ] Test role-based access control on protected routes
- [ ] Test session persistence across multiple tabs
- [ ] Test automatic session expiration
- [ ] Test visual feedback in forms (messages, loading, toasts)

### ✅ End-to-end (E2E) Tests
- [ ] Validate navigation and redirects with e2e tests (Cypress or Playwright)
- [ ] Test complete login flow + redirect (e2e)

### ✅ Test Utilities and Quality
- [ ] Configure test coverage report with `vitest --coverage`

---

## 🚀 Integration and Deploy
- [ ] Deploy the project on Vercel or Netlify
- [ ] Add simple CI/CD with GitHub Actions
- [ ] Automatic linter and formatting (ESLint + Prettier)
- [ ] Integration with OAuth (Google, GitHub) as an alternative login

---

## 📄 Extras
- [x] Display a standard error for any unexpected failure
- [x] Separate error messages into a utility file for reuse
- [x] Use Toasts instead of `<p>` for success/error messages (using `react-hot-toast` or similar)
- [ ] Write a README
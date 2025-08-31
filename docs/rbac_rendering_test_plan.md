# ✅ RBAC and Role-Based Rendering Test Plan

This plan covers two fundamental aspects of the application:
1. Access control to protected routes (RBAC).
2. Conditional rendering based on the user's role.

---

## 1. 🔐 Route Access Control (RBAC)
### **End-to-End (e2e) Tests:**

#### /admin-dashboard
- [x] Should redirect **unauthenticated** users to `/login`.
- [x] Should redirect authenticated users with a role other than `admin` to `/unauthorized`.
- [x] Should render correctly for users with the `admin` role.
- [x] Should navigate to `/user-list` when clicking on "View All Registered Users".

#### /manage-content
- [x] Should redirect **unauthenticated** users to `/login`.
- [x] Should redirect users with the `user` role to `/unauthorized`.
- [x] Should render correctly for users with the `admin` or `editor` role.
- [x] Should navigate to `/dashboard` when clicking on "Go to Dashboard".

#### /dashboard
- [x] Should redirect **unauthenticated** users to `/login`.
- [x] Should render correctly for any authenticated user.
- [x] Should navigate to `/about` when clicking on "Learn more about this app".
- [x] Should navigate to `/admin-dashboard` when clicking on "Go to Admin Panel".
- [x] Should navigate to `/user-settings` when clicking on "Access Personal Settings".
- [x] Should navigate to `/manage-content` when clicking on "Manage Content".

#### /user-settings
- [x] Should redirect **unauthenticated** users to `/login`.
- [x] Should render correctly for any authenticated user.
- [x] Should navigate to `/dashboard` when clicking on "Go to Dashboard".

#### /unauthorized
- [x] Should be accessible by any user (authenticated or not).
- [x] Should display an access denied message.
- [x] Should navigate to `/dashboard` when clicking on "Go to Dashboard" if authenticated.
- [x] Should navigate to `/login` when clicking on "Back to Login" if not authenticated.

### **Unit Tests:**
### Component: `ProtectedRoute`

- [x] Should render the child content if the user is authenticated and has the necessary role.
- [x] Should redirect to `/unauthorized` if the user is authenticated but does not have the necessary role.
- [x] Should redirect to `/login` if the user is not authenticated.

### Component: `RoleBased`

- [x] Should render the child elements if the user has one of the allowed roles.
- [x] Should not render the child elements if the user does not have any of the allowed roles.

---

## 2. 🎭 Conditional Content Rendering
**Recommended test type:** Integration (Vitest + Testing Library)

### About.tsx

- [x] Should display the text "You are not logged in. Log in here." with a link to `/login` only for **unauthenticated** users.
- [x] Should not display role messages when the user is **not authenticated**.
- [x] Should display the text "Welcome, user! You have access to basic features." only for users with the `user` role.
- [x] Should display the text "Welcome, admin! You can manage users and system data." only for users with the `admin` role.


### Dashboard.tsx

- [x] Should display the authenticated user's name, email, and role.
- [x] Should display the link "Go to Admin Panel" only for users with the `admin` role.
- [x] Should display the link "Access Personal Settings" only for users with the `user` role.
- [x] Should display the link "Manage Content" only for users with the `admin` or `editor` role.

---

## Observations

- RBAC tests should simulate authentication and different roles in storage (e.g., cookies, localStorage, or backend mocks).
- Conditional rendering tests should use a mocked authentication context (`AuthContext.Provider`) with different combinations of `isAuthenticated` and `user.role`.

---
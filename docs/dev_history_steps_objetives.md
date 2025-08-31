# 📋 Project Stages and Objectives for ReactJS Authentication

---

✅ **Stage: Registration Screen (/register)**
🎯 **Objective:**
- Create a registration form with validations (name, email, password, and confirmation)
- Store data in `localStorage` to simulate persistence
- Show error and success messages
- Redirect to `/login` after registration with visual feedback

---

✅ **Stage: Login Screen (/login)**
🎯 **Objective:**
- Allow simulated authentication using email and password
- Validate data with clear feedback
- Simulate request with `setTimeout` and a loading spinner
- Redirect the authenticated user to `/dashboard`
- Show a logout message if coming from `/login?loggedOut=true`

---

✅ **Stage: Protected Area (/dashboard) + Authentication Context**
🎯 **Objective:**
- Create a protected page visible only to authenticated users
- Protect routes with the `ProtectedRoute` component
- Create `AuthContext` with states: `user`, `isAuthenticated`, `loading`, `logout()`
- Retrieve a saved session from `localStorage` (mock_auth)
- Display the logged-in user's name

---

✅ **Stage: Navigation between screens**
🎯 **Objective:**
- Add navigation links between `/login` and `/register`
- Improve the experience for new and returning users

---

✅ **Stage: Dark Mode**
🎯 **Objective:**
- Enable dark mode support with Tailwind using `.dark`
- Create a toggle button (`🌙` / `☀️`) with `useDarkMode()`
- Apply conditional classes `bg-white dark:bg-gray-900`, etc.
- Persist the theme with `localStorage`

---

✅ **Stage: Loading Spinners**
🎯 **Objective:**
- Show a `spinner` on form submission buttons and on logout
- Disable buttons while loading
- Use an animated icon with Tailwind's `animate-spin`

---

✅ **Stage: Logout + Visual Feedback**
🎯 **Objective:**
- Separate logout logic into `authService.logoutUser()`
- Simulate network delay with `setTimeout` inside the service
- Execute `logout()` from the context + `logoutUser()` to clear state and storage
- Redirect with `Maps("/login?loggedOut=true")`
- Display the message “You have been logged out.”

---

✅ **Stage: Adjust login with global state (context)**
🎯 **Objective:**
- Change `loginUser()` to return user data (`id`, `name`)
- Create a `login(email, password)` function in `AuthContext`
- Use `login(...)` in `Login.tsx` to authenticate and update the context directly

---

✅ **Stage: Responsiveness of the Registration Form**
🎯 **Objective:**
- Ensure the registration screen is readable, fluid, and well-spaced on different screen sizes
- Avoid overflow or collapsing on mobile devices
- Apply good responsive practices with Tailwind

---

✅ **Stage: Accessibility and Keyboard Navigation**
🎯 **Objectives:**
- Allow the entire form to be navigated with Tab
- Ensure all inputs have correctly associated labels
- Improve usability for users with screen readers or reduced mobility
- Use the `autocomplete` property on fields like email, name, password, to facilitate auto-filling

---

✅ **Stage: Replace messages with Toasts**
🎯 **Objective:**
- Swap fixed error/success messages (e.g., `<p className="text-red-600">...`) for floating toasts
- Use a lightweight and easy-to-integrate library like react-hot-toast
- Ensure fast and non-blocking feedback for actions like:
  - Registration
  - Login
  - Logout
  - Unexpected failures

---

✅ **Stage: Session Expiration**
🎯 **Objective:**
- Automatically end the user's session after a determined time (e.g., 30 minutes)
- Redirect to `/login` with a message “Your session has expired”
- Show an error toast to the user (without reloading the page)

---

✅ **Stage: Error Pages (404 and Unauthorized Access)**
🎯 **Objective:**
- Display a friendly and clear page for:
  - Non-existent routes (404)
  - Attempts to access without permission/authentication (401/403)
- Ensure a good UX even in error cases
- Reinforce visual identity and navigation (e.g., a “Back to login” button)

---

✅ **Stage: Encapsulate role-based visibility control**
🎯 **Objective:**
- Create a reusable structure that allows displaying interface elements only for users with certain roles
- Reduce repetitions and direct `user?.role === "admin"` comparisons scattered throughout the code
- Improve readability, scalability, and maintenance of role-based access control (RBAC)
- Establish a single source of truth for available roles in the system, using a `roles.ts` constants file
- Make the intention of each conditional block clearer through a semantic component: `<RoleBased allowedRoles={...}>...</RoleBased>`

---

✅ **Stage: Exclusive pages and routes by role (/admin-dashboard and /user-settings)**
🎯 **Objective:**
- Create dedicated pages for each user type (admin and user)
- Protect access using the `ProtectedRoute` component with `requiredRole`
- Demonstrate fine-grained role-based access control (RBAC)
- Ensure each user sees only the content allowed by their profile
- Conditionally display links using the `RoleBased` component, keeping navigation clear and secure

---

✅ **Stage: Public page with dynamic content based on role (/about)**
🎯 **Objective:**
- Create a public route accessible to all (visitors and authenticated users)
- Display different messages or content blocks based on the user's role
- Demonstrate mastery of conditional rendering using the authentication context and the `RoleBased` component
- Reinforce the concept of personalized UX by profile type

---

✅ **Stage: Support for multiple roles and shared route for a group (/manage-content)**
🎯 **Objectives:**
- Add support for multiple roles in the `ProtectedRoute` component
- Allow different user types to securely and controlledly access the same pages
- Create a new protected page, accessible to users with the "admin" or "editor" roles
- Demonstrate access control by role group, reinforcing the flexibility of the permission system
- Consolidate the use of constants and types (`Role`, `ROLES`) to ensure type safety and code clarity
- Offer a solid foundation for routes that will be shared by different user types in the future

---

✅ **Stage: Display logged-in user's metadata on the interface (name, role, email)**
🎯 **Objectives:**
- Show the user basic information about their own profile, such as name, email, and role
- Visually reinforce the context of the active session
- Facilitate testing and manual validation of access control during development
- Demonstrate good practices of transparency, context, and UX in authenticated interfaces

---

✅ **Stage: Access denied page with a contextual message based on the required role**
🎯 **Objectives:**
- Display access denied messages that indicate which role would be necessary to access the page
- Improve user experience and interface feedback
- Facilitate testing and debugging by showing the context of the block
- Make the interface more educational, especially in technical demonstration environments

---

✅ **Stage: Admin panel with a list of all mocked users**
🎯 **Objectives:**
- Display a table with the data of registered users (mocked via localStorage)
- Restrict access to the panel only to those with the "admin" role
- Reinforce the use of `AuthContext` and roles in access control
- Facilitate viewing the current state of the simulated database
- Demonstrate the ability to consume, map, and render data in a structured way

---

✅ **Stage: Admin can change the role of other users (promote/demote)**
🎯 **Objectives:**
- Allow a user with the "admin" role to change the role of other users through the interface
- Safely update the data directly in `localStorage` (mock)
- Reflect the change in the interface in real time
- Prevent the admin from editing their own role (to avoid accidental lockouts)
- Demonstrate mastery of CRUD and higher-level access control

---

✅ **Stage: Validate role when changing a user's role**
🎯 **Objective:**
- Prevent invalid role values from being saved in `localStorage`
- Reinforce the security and reliability of the mocked data
- Reuse centralized validation logic

---

✅ **Stage: Hide or disable buttons based on role**
🎯 **Objectives:**
- Demonstrate interface control (visibility and actions) based on the logged-in user's role
- Reinforce the use of the `RoleBased` component as a visual authorization layer
- Avoid exposing actions and links to users without permission, even on protected pages
- Promote a cleaner and more secure user experience
- Simulate a common behavior in real systems with multiple permissions (e.g., admin, editor, user)

---

✅ **Stage: Layout with a more modern and accessible design**
🎯 **Objectives:**
- Improve the visual aspect and usability of the interface with a more current, clean, and accessible look
- Apply good practices of responsive and visual design with exclusive use of Tailwind CSS (without heavy libraries like MUI or Chakra)
- Ensure the interface is readable, intuitive, and friendly on different screen sizes and usage contexts
- Make keyboard navigation clear and functional, with visible focus and well-highlighted interactive fields
- Elevate the overall project presentation for technical demonstrations and interviews

---

✅ **Stage: Implementation of a base layout with Header and Footer (AppLayout)**
🎯 **Objectives:**
- Create a consistent and reusable visual structure for all pages of the application
- Centralize common elements (like header and footer) in a single control point
- Reflect a modern and responsive layout pattern with the support of Tailwind CSS
- Improve the readability, organization, and visual identity of the interface
- Facilitate future maintenance and avoid repetition of structure between pages

---

✅ **Stage: Replace `<a>` with a Link component**
🎯 **Objective:**
- Create a reusable `<Link>` component that accepts `href`, `children`, and optional styling
- Apply Tailwind CSS directly (eliminating the old global CSS)
- Maintain accessibility, focus, and responsiveness

---

✅ **Stage: Create reusable Input component**
🎯 **Objectives:**
- Reuse the same base style on all inputs (visual, focus, dark mode, responsiveness)
- Reduce code repetition on pages like `Register.tsx` and `Login.tsx`
- Standardize accessibility with `id`, `aria-*`, `label`, `autoComplete`, etc.
- Support Zod errors, with consistent display of messages
- Facilitate future maintenance (changing styles, interactions, themes)

---

✅ **Stage: Global error handling and standardized messages**
🎯 **Objectives:**
- Centralize the handling of unexpected exceptions, ensuring that any critical failure (e.g., localStorage parsing, service errors, permission failures) is correctly captured and displayed to the user.
- Standardize error messages, avoiding string duplication and facilitating project maintenance.
- Improve user experience with consistent error toasts in all scenarios, avoiding silent errors or blocking alerts.
- Increase application reliability, preventing crashes caused by unhandled failures in the authentication flow or role changes.

✅ **Stage: Implementation of `userService` and improvements in `UserList`**
🎯 **Objectives:**
- Create a dedicated service (`userService`) to encapsulate operations with mocked users using `localStorage`
- Ensure consistency with other services (`authService`), simulating network delays via `Promise + setTimeout`
- Centralize and reuse the logic for accessing user data (like `getAllUsers` and `updateUserRole`)
- Eliminate the direct use of `localStorage` in the `UserList` component, favoring separation of responsibilities
- Add visual feedback with loading states during:
- Initial loading of the user list
- Individual role updates
- Display success feedback with `toast.success(...)` after a successful role change
- Use `handleUnexpectedError(...)` to capture and notify unexpected failures

---

✅ **Stage: Session Management and Expiration Monitoring**
🎯 **Objectives:**
- Centralize the logic for reading the session (`mock_auth`) in a reusable service (`getAuthSession`)
- Remove direct accesses to `localStorage` within `AuthContext`, favoring cohesion and maintenance
- Safely handle session read failures, avoiding silent exceptions
- Implement automatic session expiration verification with a `setInterval` that revokes the session when necessary
- Add monitoring via the `storage` event to capture manual session removals in other tabs or via DevTools

---

✅ **Stage: Admin can delete users on the UserList page**
🎯 **Objectives:**
- Allow a user with the "admin" role to permanently remove users from the list.
- Demonstrate interface control and permission based on the current role.
- Display clear visual feedback (success or error toast) after the action.
- Simulate network delay with `setTimeout` to represent a real backend operation.
- Ensure the “Delete” button is not visible to users who are not an admin.
- Prevent the admin from deleting themselves (self-exclusion).

---

✅ **Stage: Inline confirmation for user deletion**
🎯 **Objectives:**
- Add a visual confirmation step before the definitive deletion of a user
- Replace the "Delete" button with two "Confirm" and "Cancel" buttons inline, without modals
- Prevent accidental deletions with a simple, clear, and accessible interface
- Implement the logic with `useState(confirmingUserId)` for confirmation control
- Restore the original button if the user clicks "Cancel"
- Maintain visual consistency with the rest of the project (colors, accessibility, and responsiveness with TailwindCSS)
- Ensure the "Confirm" button safely invokes the deletion function
- Make the functionality more robust and aligned with good UX practices and error prevention

---

**✅ Stage: Start of Test Implementation (Registration Form)**
**🎯 Objectives:**
- Begin the project's test coverage, starting with unit tests
- Create tests for the `Register.tsx` component, focusing on:
- Form rendering
- Input behavior and validation
- Disabling the submit button when the form is invalid
- Displaying error messages for incorrect data
- Use the `jest` and `@testing-library/react` tools
- Follow the guidelines defined in `tests_guidelines.md`
- Ensure reliable, simple, and cost-effective tests to maintain
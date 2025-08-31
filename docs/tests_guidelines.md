## ✅ Types of Tests in Front-End Applications
### 1. 🧪 Unit Tests
**👉 What they are:**
They test a single function, component, or piece of logic in isolation, without depending on other modules, navigation, or global state.

**✅ Examples in your project:**
- Validate that the Input component renders correctly.
- Verify that handleUnexpectedError() calls the correct toast.
- Test that ProtectedRoute shows or blocks the child based on the role.

**🛠️ Common tools:**
- jest
- @testing-library/react

**🧠 Objective:** Ensure that each unit of code works as expected in all possible use cases.

### 2. 🔄 Integration Tests
**👉 What they are:**
They test the interaction between two or more parts of the application: components, hooks, contexts, services, or local navigation.

**✅ Examples in your project:**
- Test if AuthContext correctly sets the user after login.
- Verify if the error toast appears after a form submission failure.
- Ensure that UserList correctly renders data from the service.

**🛠️ Common tools:**
- jest + @testing-library/react
- Context simulations (renderWithContext, MemoryRouter, etc.)

**🧠 Objective:** Verify that the pieces integrate correctly without depending on a real interface.

### 3. 🌐 End-to-End (E2E) Tests
**👉 What they are:**
They simulate the real behavior of the end user, with navigation, form filling, clicks, and redirections, in a real or simulated browser.

**✅ Examples in your project:**
- Open the application, register, log in, be redirected to /dashboard
- Log in as an admin and change a user's role
- Verify if a user with an invalid role is blocked from navigation

**🛠️ Common tools:**
- Cypress
- Playwright

**🧠 Objective:** Ensure that the app works from the end user's perspective, covering complete flows.

## 🧭 Quick Comparison
| Type        | Scope                | Speed ⚡ | Reliability 🔒 | Maintenance Cost 💸 |
|-------------|----------------------|----------|----------------|----------------------|
| Unit        | A function/component | High     | High           | Low                  |
| Integration | Several modules      | Medium   | Medium         | Medium               |
| E2E         | Full real flow       | Low      | High           | High                 |

## ✅ Recommended Strategy
The decision of which type of test to use depends on 3 main factors:

**1. Importance of the functionality**
If it's critical for business or security, test it in more depth.
Ex: Login, session persistence, access control → deserve integration and E2E tests.

**2. Code complexity**
Simple and isolated code → usually only requires unit tests.
Ex: Functions like handleUnexpectedError, isValidRole.

**3. Cost-benefit**
E2E tests are slower and more expensive to maintain, so use them only for the most important flows.
Unit tests are cheap and fast, so they are ideal for isolated logic.

## 🧪 Recommendation for your current project
| Part                              | Ideal Test(s)      | Justification                                      |
|-----------------------------------|--------------------|----------------------------------------------------|
| `AuthContext`                     | Integration        | Interacts with storage, context, navigation        |
| Forms (`Register`, `Login`)       | Unit + Integration | Validates inputs + submission behavior             |
| ProtectedRoute / RoleBased        | Unit               | Pure logic based on props                          |
| Full login flow                   | E2E                | Validates from the end user's perspective          |
| Change role in UserList           | Integration        | Needs to simulate the change and verify the effect |
| Toasts, loading                   | UI / Integration   | Verifies visual feedback                           |
| Session (expiration, persistence) | Integration + E2E  | Complexity and importance                          |

## Guidelines
🔸 Start with unit tests for isolated logic
🔸 Use integration tests for contexts, pages, and interactions
🔸 Reserve E2E tests for critical and complete flows
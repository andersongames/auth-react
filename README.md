# 📄 General Proposal Summary (back-end + front-end)

The complete project will be a user authentication and management system divided into two main modules:

- **Frontend (Vite + ReactJS)**
  - Custom interface for login, registration, and dashboards (admin, user, editor).
  - Session persistence and RBAC (already implemented with mock/localStorage).
  - Will evolve to consume the real backend.
  - Continues to focus on UX, accessibility, responsiveness, and React best practices.

- **Backend (Node.js + Fastify + Keycloak + PostgreSQL via Drizzle ORM)**
  - Keycloak manages user authentication and roles (JWT tokens).
  - REST APIs expose user CRUD operations and integration with Keycloak.
  - Modular structure, use tools like: Node.js + TypeScript + Fastify + Drizzle ORM + Zod + Docker.
  - PostgreSQL database can be used to persist additional metadata (e.g., profile, preferences), while Keycloak maintains authentication data.

- **Monorepo**
  - Both projects (front + back) gathered in a single organized structure.
  - Orchestration tool (Turborepo or Nx) to run, build, and test both sides together.
  - Possibility of sharing TypeScript typings between front and back.

## 👉 Final Goal:
Present a robust, modern, and scalable authentication system that demonstrates mastery in frontend (ReactJS), backend (Node.js + Fastify), access control with Keycloak, good architectural practices, and monorepo organization.
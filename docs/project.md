# 💼 Technical Project: Authentication with ReactJS (Login and Sign Up)

## 🎯 Objective

Build a web application with **ReactJS** that implements complete **Login**, **Sign Up**, and **Route Protection** functionalities, using authentication and security best practices.

The application should simulate a user authentication system with a fictitious or real backend (you can use a mocked API or implement a simple backend with Node.js, Firebase, or any BaaS), and allow:

- Account creation with email and password
- Login with email and password
- Maintenance of the authenticated session
- Redirection and protection of private routes
- Logout

---

## 📦 Technology Stack

### ✅ Frontend
- **ReactJS (with Hooks and functional components)**
- **React Router DOM** – for navigation control and protected routes
- **Zod or Yup** – for form validation
- **React Hook Form** – for efficient input management
- **Axios or Fetch API** – for backend communication
- **JWT (simulated or real)** – to simulate token-based authentication
- **TailwindCSS or CSS Modules** – for styling

### ⚙️ (Optional) Backend
- Node.js + Express + Prisma/SQLite/PostgreSQL
- Firebase Authentication (quick alternative)
- JSON Server or mock API

---

## 🔐 Security Requirements

- **Client-side and server-side validation (if applicable)**
- **Store the token only in `httpOnly cookies` (if using a real backend)** or, if simulated, **simulate secure storage in localStorage/sessionStorage with a warning about limitations**
- **Use HTTPS for communication (even if local with a proxy)**
- **Sanitize inputs**
- **Use generic error messages to prevent user enumeration**

---

## 📋 Expected Functionalities

### 1. **Sign Up**
- Form with fields: name, email, password, password confirmation
- Data validation (minimum characters, email format, matching passwords, etc.)
- Submission of data to the simulated/real backend
- Redirection to login upon success

### 2. **Login**
- Form with email and password
- Field validation
- Storage of the authentication token (simulated or real)
- Redirection to an authenticated area

### 3. **Protected Area**
- A page that can only be accessed by a logged-in user
- Automatic redirection to login if not authenticated
- Display of user data (e.g., name or email)
- Logout button

### 4. **Session Persistence**
- Keep the user authenticated on page refresh
- Logout correctly clears the token and redirects

---

## 🧠 What will be technically evaluated

| Capability                  | Evaluation                                                  |
|-----------------------------|-------------------------------------------------------------|
| **Project organization** | Separation of components, folder structure                  |
| **Code quality** | Clarity, cohesion, readability, proper use of hooks         |
| **Security best practices** | Validation, secure credential storage                       |
| **State management** | Correct use of global/local state and context if needed     |
| **Authentication knowledge**| Understanding the login/logout/token/session lifecycle      |
| **User Experience (UX)** | Feedback for errors, loading, fluid navigation              |
| **Styling** | Clean and responsive layout, proper use of classes/utilities|
| **Light documentation** | A README explaining how to run the project and technologies used |

---

## 📌 Extras (Differentiators)

- Dark mode toggle
- Unit tests with Jest + Testing Library
- OAuth integration (Google, GitHub, etc.)
- Deploy on Vercel or Netlify with a demo link
- Simple CI/CD (GitHub Actions for lint or build)

---

## 📁 Suggested Project Structure

```
/src
  /components
    Input.tsx
    ProtectedRoute.tsx
  /pages
    Login.tsx
    Register.tsx
    Dashboard.tsx
  /services
    authService.ts
  /context
    AuthContext.tsx
  /utils
    validators.ts
  App.tsx
  main.tsx
```

---

## 📝 Delivery

You can upload the project to GitHub, with an explanatory README containing:

- Technologies used
- How to run locally
- Explanation of key technical decisions
- Link to the deploy, if any

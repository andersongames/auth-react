# ✅ RBAC and Role-Based Rendering Test Plan

Este plano cobre dois aspectos fundamentais da aplicação:
1. Controle de acesso a rotas protegidas (RBAC).
2. Renderização condicional com base na role do usuário.

---

## 1. 🔐 Controle de Acesso a Rotas (RBAC)
### **Testes End-to-End (e2e):**

#### /admin-dashboard
- [x] Deve redirecionar usuários **não autenticados** para `/login`.
- [x] Deve redirecionar usuários autenticados com role diferente de `admin` para `/unauthorized`.
- [x] Deve renderizar corretamente para usuários com role `admin`.
- [x] Deve navegar para `/user-list` ao clicar em "View All Registered Users".

#### /manage-content
- [x] Deve redirecionar usuários **não autenticados** para `/login`.
- [x] Deve redirecionar usuários com role `user` para `/unauthorized`.
- [x] Deve renderizar corretamente para usuários com role `admin` ou `editor`.
- [x] Deve navegar para `/dashboard` ao clicar em "Go to Dashboard".

#### /dashboard
- [x] Deve redirecionar usuários **não autenticados** para `/login`.
- [x] Deve renderizar corretamente para qualquer usuário autenticado.
- [x] Deve navegar para `/about` ao clicar em "Learn more about this app".
- [x] Deve navegar para `/admin-dashboard` ao clicar em "Go to Admin Panel".
- [x] Deve navegar para `/user-settings` ao clicar em "Access Personal Settings".
- [x] Deve navegar para `/manage-content` ao clicar em "Manage Content".

#### /user-settings
- [ ] Deve redirecionar usuários **não autenticados** para `/login`.
- [ ] Deve renderizar corretamente para qualquer usuário autenticado.

#### /unauthorized
- [ ] Deve ser acessível por qualquer usuário (autenticado ou não).
- [ ] Deve exibir mensagem de acesso negado.
- [ ] Deve navegar para `/dashboard` ao clicar em "Go to Dashboard".

### **Testes Unitários:**
### Componente: `ProtectedRoute`

- [ ] Deve renderizar o conteúdo filho se o usuário estiver autenticado e tiver a role necessária.
- [ ] Deve redirecionar para `/unauthorized` se o usuário estiver autenticado mas não tiver a role necessária.
- [ ] Deve redirecionar para `/login` se o usuário não estiver autenticado.

### Componente: `RoleBased`

- [ ] Deve renderizar os elementos filhos se o usuário possuir uma das roles permitidas.
- [ ] Não deve renderizar os elementos filhos se o usuário não possuir nenhuma das roles permitidas.

---

## 2. 🎭 Renderização Condicional de Conteúdo
**Tipo de teste recomendado:** Integração (Vitest + Testing Library)

### About.tsx

- [x] Deve exibir o texto "You are not logged in. Log in here." com link para `/login` apenas para usuários **não autenticados**.
- [x] Não deve exibir mensagens de role quando o usuário **não estiver autenticado**.
- [x] Deve exibir o texto "Welcome, user! You have access to basic features." apenas para usuários com role `user`.
- [x] Deve exibir o texto "Welcome, admin! You can manage users and system data." apenas para usuários com role `admin`.


### Dashboard.tsx

- [x] Deve exibir o nome, email e role do usuário autenticado.
- [x] Deve exibir o link "Go to Admin Panel" apenas para usuários com role `admin`.
- [x] Deve exibir o link "Access Personal Settings" apenas para usuários com role `user`.
- [x] Deve exibir o link "Manage Content" apenas para usuários com role `admin` ou `editor`.

---

## Observações

- Testes de RBAC devem simular autenticação e diferentes roles no armazenamento (ex: cookies, localStorage ou mocks do backend).
- Testes de renderização condicional devem utilizar contexto de autenticação mockado (`AuthContext.Provider`) com diferentes combinações de `isAuthenticated` e `user.role`.

---

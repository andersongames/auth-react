# ✅ RBAC and Role-Based Rendering Test Plan

Este plano cobre dois aspectos fundamentais da aplicação:
1. Controle de acesso a rotas protegidas (RBAC).
2. Renderização condicional com base na role do usuário.

---

## 1. 🔐 Controle de Acesso a Rotas (RBAC)
**Tipo de teste recomendado:** E2E (Playwright)

#### /admin-dashboard
- [ ] Deve redirecionar usuários **não autenticados** para `/login`.
- [ ] Deve redirecionar usuários autenticados com role diferente de `admin` para `/unauthorized`.
- [ ] Deve renderizar corretamente para usuários com role `admin`.

#### /manage-content
- [ ] Deve redirecionar usuários **não autenticados** para `/login`.
- [ ] Deve redirecionar usuários com role `user` para `/unauthorized`.
- [ ] Deve renderizar corretamente para usuários com role `admin` ou `editor`.

#### /dashboard
- [ ] Deve redirecionar usuários **não autenticados** para `/login`.
- [ ] Deve renderizar corretamente para qualquer usuário autenticado.

#### /user-settings
- [ ] Deve redirecionar usuários **não autenticados** para `/login`.
- [ ] Deve renderizar corretamente para qualquer usuário autenticado.

#### /unauthorized
- [ ] Deve ser acessível por qualquer usuário (autenticado ou não).
- [ ] Deve exibir mensagem de acesso negado.

---

## 2. 🎭 Renderização Condicional de Conteúdo
**Tipo de teste recomendado:** Integração (Vitest + Testing Library)

### About.tsx

- [ ] Deve exibir o texto "You are not logged in. Log in here." com link para `/login` apenas para usuários **não autenticados**.
- [ ] Não deve exibir mensagens de role quando o usuário **não estiver autenticado**.
- [ ] Deve exibir o texto "Welcome, user! You have access to basic features." apenas para usuários com role `user`.
- [ ] Deve exibir o texto "Welcome, admin! You can manage users and system data." apenas para usuários com role `admin`.


### Dashboard.tsx

- [ ] Deve exibir o nome, email e role do usuário autenticado.
- [ ] Deve exibir o link "Go to Admin Panel" apenas para usuários com role `admin`.
- [ ] Deve exibir o link "Access Personal Settings" apenas para usuários com role `user`.
- [ ] Deve exibir o link "Manage Content" apenas para usuários com role `admin` ou `editor`.

---

## Observações

- Testes de RBAC devem simular autenticação e diferentes roles no armazenamento (ex: cookies, localStorage ou mocks do backend).
- Testes de renderização condicional devem utilizar contexto de autenticação mockado (`AuthContext.Provider`) com diferentes combinações de `isAuthenticated` e `user.role`.

---

# ✅ RBAC and Role-Based Rendering Test Plan

Este plano cobre dois aspectos fundamentais da aplicação:
1. Controle de acesso a rotas protegidas (RBAC).
2. Renderização condicional com base na role do usuário.

---

## 1. 🔐 Controle de Acesso a Rotas (RBAC)
**Tipo de teste recomendado:** E2E (Playwright)

| Página/Rota | Requisitos de acesso | Cenários de teste |
|-------------|----------------------|-------------------|
| `/admin-dashboard` | Apenas `admin` | - Redirecionar usuários não autenticados para `/login`<br>- Redirecionar usuários autenticados com role diferente de `admin` para `/unauthorized`<br>- Renderizar a página corretamente para usuários com role `admin` |
| `/manage-content` | `admin` ou `editor` | - Redirecionar usuários não autenticados para `/login`<br>- Redirecionar usuários com role `user` para `/unauthorized`<br>- Renderizar para usuários com role `admin` ou `editor` |
| `/dashboard` | Qualquer usuário autenticado | - Redirecionar usuários não autenticados para `/login`<br>- Renderizar corretamente para qualquer usuário autenticado |
| `/user-settings` | Qualquer usuário autenticado | - Redirecionar usuários não autenticados para `/login`<br>- Renderizar corretamente para usuários autenticados |
| `/unauthorized` | Pública | - Acessível por qualquer usuário<br>- Deve exibir mensagem de acesso negado |

---

## 2. 🎭 Renderização Condicional de Conteúdo
**Tipo de teste recomendado:** Integração (Vitest + Testing Library)

### Página: `/about`

| Condição | Elementos esperados |
|----------|---------------------|
| Usuário não autenticado | - Texto: "You are not logged in. Log in here." com link para `/login`<br>- **Não** deve renderizar as mensagens específicas de role |
| Usuário autenticado com role `user` | - Mensagem: "Welcome, user! You have access to basic features." |
| Usuário autenticado com role `admin` | - Mensagem: "Welcome, admin! You can manage users and system data." |

### Página: `/manage-content`

| Condição | Elementos esperados |
|----------|---------------------|
| Usuário com role `admin` ou `editor` | - Renderização da página com título "Content Management" e instruções |
| Qualquer outro usuário | - Não acessa essa página (testado como parte do RBAC) |

---

## Observações

- Testes de RBAC devem simular autenticação e diferentes roles no armazenamento (ex: cookies, localStorage ou mocks do backend).
- Testes de renderização condicional devem utilizar contexto de autenticação mockado (`AuthContext.Provider`) com diferentes combinações de `isAuthenticated` e `user.role`.

---

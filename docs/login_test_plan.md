# ✅ Plano de Testes — Página Login.tsx

## 🧪 Testes Unitários  
Testam elementos e comportamentos isolados do formulário.

**Campos e renderização**
- [x] Renderiza todos os campos obrigatórios (email, password)
- [x] Renderiza o botão "Login" habilitado/desabilitado corretamente

**Mensagens de erro**
- [x] Exibe mensagem se o email for inválido
- [x] Exibe mensagem se o campo de senha estiver vazio

**Feedback visual**
- [x] Mostra o spinner enquanto `isSubmitting` estiver `true`

---

## 🔄 Testes de Integração  
Verificam a interação entre o formulário, AuthContext, navegação, toasts e feedbacks.

- [x] Submete com dados válidos e:
  - [x] Chama `login()` com os dados corretos (mockado)
  - [x] Redireciona para `/dashboard`
- [x] Submete com credenciais inválidas:
  - [x] Mostra `toast.error(...)` (via `handleUnexpectedError`)
- [x] Redireciona imediatamente para `/dashboard` se `isAuthenticated` for `true` (simulado via contexto)
- [x] Exibe `toast.success(...)` se `?loggedOut=true` na URL
- [x] Exibe `toast.error(...)` se `?expired=true` na URL
- [x] Navega corretamente para `/register` ao clicar em "Don't have an account?"

---

## 🌐 Testes de Ponta a Ponta (E2E)  
Validação completa no navegador com Playwright.

- [x] Acessar `/login`, preencher dados válidos e verificar redirecionamento para `/dashboard`
- [x] Tentar logar com dados inválidos → exibe erro (mock do backend ou validação real)
- [x] Acessar `/login?loggedOut=true` → exibe toast de logout e redireciona para `/login`
- [x] Acessar `/login?expired=true` → exibe toast de sessão expirada e redireciona para `/login`
- [x] Se usuário já estiver logado (mock session), acessar `/login` → redireciona para `/dashboard`
- [x] Clicar em "Register" → redireciona para `/register`

---

## 🧠 Observações técnicas

- Os testes unitários devem ser feitos com `@testing-library/react` e `userEvent.setup()`
- Os testes de integração devem usar `renderWithProviders()` com `MemoryRouter + AuthProvider`
- Os testes E2E devem ser implementados em `/tests/e2e/Login.test.ts` com Playwright

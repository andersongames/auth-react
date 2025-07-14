## ✅ Página Register.tsx — Plano de Testes
### 🧪 Testes Unitários
Testam elementos e comportamentos isolados do formulário.  

**Campos e renderização**
- [x] Renderiza todos os campos obrigatórios (name, email, password, confirmPassword, role)
- [ ] Renderiza o botão "Sign Up" habilitado/desabilitado corretamente
- [x] Exibe mensagens de erro quando:
  - [x] Nome tem menos de 2 caracteres
  - [x] Email inválido
  - [x] Senha com menos de 8 caracteres
  - [x] Senha sem número, símbolo, maiúscula ou minúscula
  - [x] Senhas diferentes
- [x] Mostra os requisitos da senha com cor correta (verde/vermelho) ao digitar

### 🔄 Testes de Integração
Verificam a interação entre o formulário, o contexto de autenticação, serviços, navegação e toasts.  

- [x] Submete com dados válidos e:
  - [x] Chama registerUser() com os dados corretos
  - [x] Mostra toast de sucesso (toast.success(...))
  - [x] Redireciona para /login após 2 segundos
- [x] Mostra toast.error(...) se o registerUser() lançar erro
- [x] Verifica se handleUnexpectedError() é chamado em erros desconhecidos
- [x] Redireciona imediatamente para /dashboard se isAuthenticated for true (simulado via AuthContext)

### 🌐 Testes de Ponta a Ponta (E2E)
Requerem ambiente com navegador real (Cypress ou Playwright), focam no fluxo real de uso.  

- [x] Acessar /register, preencher dados válidos e confirmar redirecionamento para /login
- [x] Acessar /register já autenticado → redirecionado para /dashboard
- [x] Preencher dados inválidos e verificar mensagens de erro inline
- [x] Preencher senha com Abc123!@#, verificar destaque visual dos requisitos (verde)
- [x] Clicar em "Already have an account? Login" e verificar redirecionamento para /login

### 🧠 Observações técnicas
- Os testes unitários devem ser feitos com @testing-library/react e userEvent.setup()
- Os testes de integração devem usar renderWithProviders() com MemoryRouter + AuthProvider
- Os testes E2E devem ser isolados em /tests/e2e/register.cy.ts (com Cypress ou Playwright)
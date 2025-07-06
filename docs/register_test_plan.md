## ✅ Página Register.tsx — Plano de Testes
### 🧪 Testes Unitários
Testam elementos e comportamentos isolados do formulário.  

**Campos e renderização**
- [ ] Renderiza todos os campos obrigatórios (name, email, password, confirmPassword, role)
- [ ] Renderiza o botão "Sign Up" habilitado/desabilitado corretamente
- [ ] Exibe mensagens de erro quando:
  - [ ] Nome tem menos de 2 caracteres
  - [ ] Email inválido
  - [ ] Senha com menos de 8 caracteres
  - [ ] Senha sem número, símbolo, maiúscula ou minúscula
  - [ ] Senhas diferentes
- [ ] Mostra os requisitos da senha com cor correta (verde/vermelho) ao digitar

### 🔄 Testes de Integração
Verificam a interação entre o formulário, o contexto de autenticação, serviços, navegação e toasts.  

- [ ] Submete com dados válidos e:
  - [ ] Chama registerUser() com os dados corretos
  - [ ] Mostra toast de sucesso (toast.success(...))
  - [ ] Redireciona para /login após 2 segundos
- [ ] Mostra toast.error(...) se o registerUser() lançar erro
- [ ] Verifica se handleUnexpectedError() é chamado em erros desconhecidos
- [ ] Redireciona imediatamente para /dashboard se isAuthenticated for true (simulado via AuthContext)
- [ ] Desabilita o botão "Sign Up" enquanto isLoading é true
- [ ] Mostra spinner de loading durante submissão

### 🌐 Testes de Ponta a Ponta (E2E)
Requerem ambiente com navegador real (Cypress ou Playwright), focam no fluxo real de uso.  

- [ ] Acessar /register, preencher dados válidos e confirmar redirecionamento para /login
- [ ] Acessar /register já autenticado → redirecionado para /dashboard
- [ ] Preencher dados inválidos e verificar mensagens de erro inline
- [ ] Preencher senha com Abc123!@#, verificar destaque visual dos requisitos (verde)
- [ ] Clicar em "Already have an account? Login" e verificar redirecionamento para /login

### 🧠 Observações técnicas
- Os testes unitários devem ser feitos com @testing-library/react e userEvent.setup()
- Os testes de integração devem usar renderWithProviders() com MemoryRouter + AuthProvider
- Os testes E2E devem ser isolados em /tests/e2e/register.cy.ts (com Cypress ou Playwright)
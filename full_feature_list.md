# ✅ Itens que Podem Ser Implementados

## 🔒 Funcionalidades de Autenticação
- [x] Registro de usuário com validação
- [x] Login de usuário com validação
- [x] Logout com limpeza de sessão
- [x] Persistência de sessão com localStorage
- [x] Proteção de rotas via `ProtectedRoute`
- [x] Contexto de autenticação global (`AuthContext`)
- [x] Redirecionar usuários autenticados da página de login
- [x] Redirecionar usuários autenticados da página de registro
- [x] Redirecionar usuário automaticamente para `/dashboard` após login
- [x] Redirecionar usuário automaticamente para `/login` após registro
- [x] Adicionar navegação entre `/register` e `/login`
- [ ] Expiração de sessão (por inatividade ou tempo fixo)
- [x] Migrar `id` do usuário para tipo `string` com UUID

---

## 🎨 Experiência do Usuário (UX)
- [x] Feedback visual de carregamento (spinners) durante login, registro, etc.
- [x] Desabilitar botão de submit enquanto envia dados
- [x] Mensagem de confirmação visual após logout
- [ ] Navegação por teclado totalmente funcional
- [ ] Labels associadas corretamente aos inputs (acessibilidade)
- [ ] Responsividade completa em dispositivos móveis

---

## 🌙 Tema e Estilo
- [x] Implementar modo escuro (Dark Mode Toggle)
- [ ] Layout com design mais moderno e acessível
- [x] Mostrar nome do usuário logado no `Dashboard` (em vez do ID)
- [ ] Página de erro 404 / acesso não autorizado

---

## 🧪 Testes
- [ ] Criar testes unitários para o formulário de registro (React Testing Library)
- [ ] Criar testes unitários para o formulário de login
- [ ] Criar testes para o `AuthContext`
- [ ] Criar testes para `ProtectedRoute`
- [ ] Validar navegação e redirecionamentos com testes e2e (Cypress ou Playwright)

---

## 🚀 Integração e Deploy
- [ ] Deploy do projeto no Vercel ou Netlify
- [ ] Adicionar CI/CD simples com GitHub Actions
- [ ] Linter e formatação automática (ESLint + Prettier)
- [ ] Integração com OAuth (Google, GitHub) como alternativa de login

---

## 📄 Extras
- [ ] Exibir erro padrão para qualquer falha inesperada
- [ ] Separar as mensagens de erro em um arquivo utilitário para reutilização
- [ ] Usar Toasts em vez de `<p>` para mensagens de sucesso/erro (usando `react-hot-toast` ou similar)

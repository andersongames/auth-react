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
- [x] Expiração de sessão (por inatividade ou tempo fixo)
- [x] Migrar `id` do usuário para tipo `string` com UUID

---

## 🎯 Controle de Acesso por Papel (RBAC)
- [x] Página protegida exclusiva para usuários com role "admin" (`/admin-dashboard`)
- [x] Página protegida exclusiva para usuários com role "user" (`/user-settings`)
- [x] Página pública com conteúdo dinâmico baseado na role (ex: /about)
- [x] Suporte a múltiplas roles no ProtectedRoute (ex: ["admin", "editor"])
- [x] Exibir metadados do usuário logado na interface (ex: nome, role, email)
- [x] Esconder ou desabilitar botões baseados na role (ex: "Delete User" apenas para admin)
- [x] Painel admin com listagem de todos os usuários mockados
- [x] Página de acesso negado com mensagem contextual baseada na role exigida
- [x] Alteração de role por parte do admin (promover/demover usuários)

---

## 🎨 Experiência do Usuário (UX)
- [x] Feedback visual de carregamento (spinners) durante login, registro, etc.
- [x] Desabilitar botão de submit enquanto envia dados
- [x] Mensagem de confirmação visual após logout
- [x] Navegação por teclado totalmente funcional
- [x] Labels associadas corretamente aos inputs (acessibilidade)
- [x] Responsividade completa em dispositivos móveis

---

## 🌙 Tema e Estilo
- [x] Implementar modo escuro (Dark Mode Toggle)
- [x] Layout com design mais moderno e acessível
- [x] Mostrar nome do usuário logado no `Dashboard` (em vez do ID)
- [x] Página de erro 404 / acesso não autorizado

---

## 🧪 Testes
- [ ] Criar testes unitários para o formulário de registro (React Testing Library)
- [ ] Criar testes unitários para o formulário de login
- [ ] Criar testes para o `AuthContext`
- [ ] Criar testes para `ProtectedRoute`
- [ ] Testes unitários para o componente ProtectedRoute
- [ ] Validar navegação e redirecionamentos com testes e2e (Cypress ou Playwright)

---

## 🚀 Integração e Deploy
- [ ] Deploy do projeto no Vercel ou Netlify
- [ ] Adicionar CI/CD simples com GitHub Actions
- [ ] Linter e formatação automática (ESLint + Prettier)
- [ ] Integração com OAuth (Google, GitHub) como alternativa de login

---

## 📄 Extras
- [x] Exibir erro padrão para qualquer falha inesperada
- [x] Separar as mensagens de erro em um arquivo utilitário para reutilização
- [x] Usar Toasts em vez de `<p>` para mensagens de sucesso/erro (usando `react-hot-toast` ou similar)
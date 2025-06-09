# ✅ Checklist de Testes

## 📄 `/dashboard` – Protected Area

### 1. Com usuário NÃO autenticado:
- [ ] Acesso direto a `/dashboard` redireciona para `/login`
- [ ] Nenhum dado é exibido na tela
- [ ] `mock_auth` não está presente no `localStorage`

### 2. Com usuário autenticado:
- [ ] Acesso a `/dashboard` é permitido
- [ ] Mensagem de boas-vindas exibe o ID do usuário
- [ ] Botão de **Logout** está visível

### 3. Logout:
- [ ] Ao clicar em "Logout", o `mock_auth` é removido do `localStorage`
- [ ] O usuário é redirecionado para `/login`
- [ ] A página `/dashboard` volta a ser protegida se acessada novamente

---

## 🧪 Extras futuros
- [ ] Exibir nome do usuário em vez do ID (a partir do `localStorage`)
- [ ] Redirecionar para `/dashboard` automaticamente após login
- [ ] Implementar timeout de sessão (inatividade)
- [ ] Feedback visual após logout (ex: toast de confirmação)

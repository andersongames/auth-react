# ✅ Checklist de Testes

## 📄 `/login` – Login Page

### 1. Ao preencher o formulário:
- [ ] Campos obrigatórios exibem mensagens de erro se deixados em branco
- [ ] Campo **email** valida formato correto (`example@domain.com`)
- [ ] Campo **password** exige preenchimento
- [ ] Mensagens de erro aparecem com estilo visual (vermelho ou destacado)

### 2. Ao enviar credenciais inválidas:
- [ ] Aparece mensagem de erro `Invalid email or password.`
- [ ] Nada é salvo no `localStorage`
- [ ] Não há redirecionamento para `/dashboard`

### 3. Ao enviar credenciais válidas:
- [ ] O formulário exibe feedback visual ou loading (opcional)
- [ ] Os dados de autenticação são salvos em `localStorage` sob a chave `mock_auth`
- [ ] O usuário é redirecionado para `/dashboard`

---

## 🧪 Extras futuros para essa tela
- [ ] Feedback visual de carregamento durante autenticação
- [ ] Prevenir múltiplos envios simultâneos (botão desativado)
- [ ] Link para a tela de cadastro se o usuário não tiver conta
- [ ] Acessibilidade: navegação por teclado, uso de labels associados
- [ ] Design responsivo em dispositivos móveis

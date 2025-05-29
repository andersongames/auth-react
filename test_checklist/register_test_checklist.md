# ✅ Checklist de Testes

## 📄 `/register` – Sign Up Page

### 1. Ao preencher o formulário:
- [ ] Campos obrigatórios exibem mensagens de erro se deixados em branco
- [ ] Campo **email** valida formato correto (`example@domain.com`)
- [ ] Campo **password** exige pelo menos 6 caracteres
- [ ] Campo **confirm password** exige correspondência com **password**
- [ ] Mensagens de erro aparecem com estilo visual (vermelho ou destacado)

### 2. Ao enviar dados válidos:
- [ ] O formulário exibe mensagem de sucesso (`User successfully registered!`)
- [ ] Os dados do usuário são armazenados no `localStorage` sob a chave `mock_users`
- [ ] O console mostra os dados corretamente (debug provisório)
- [ ] O formulário é limpo (opcional)
- [ ] O botão de envio pode mostrar loading (opcional)

### 3. Ao enviar e-mail já cadastrado:
- [ ] Aparece mensagem de erro `Email already registered.`
- [ ] Nenhum novo usuário é adicionado ao `localStorage`

---

## 🧪 Extras futuros para essa tela
- [ ] Redirecionar automaticamente para `/login` após cadastro
- [ ] Testar comportamento com JavaScript desativado (progressive enhancement)
- [ ] Acessibilidade: navegação por teclado, labels associadas corretamente
- [ ] Design responsivo em dispositivos móveis

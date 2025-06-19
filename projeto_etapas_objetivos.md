# 📋 Etapas e Objetivos do Projeto de Autenticação ReactJS

---

✅ **Etapa: Tela de Registro (/register)**  
🎯 **Objetivo:**
- Criar formulário de cadastro com validações (nome, email, senha e confirmação)
- Armazenar os dados no `localStorage` para simular persistência
- Mostrar mensagens de erro e sucesso
- Redirecionar para `/login` após registro com feedback visual

---

✅ **Etapa: Tela de Login (/login)**  
🎯 **Objetivo:**
- Permitir autenticação simulada usando email e senha
- Validar os dados com feedback claro
- Simular requisição com `setTimeout` e loading spinner
- Redirecionar o usuário autenticado para `/dashboard`
- Mostrar mensagem de logout se vier de `/login?loggedOut=true`

---

✅ **Etapa: Área Protegida (/dashboard) + Contexto de Autenticação**  
🎯 **Objetivo:**
- Criar a página protegida visível apenas para usuários autenticados
- Proteger rotas com componente `ProtectedRoute`
- Criar `AuthContext` com estados: `user`, `isAuthenticated`, `loading`, `logout()`
- Recuperar sessão salva no `localStorage` (mock_auth)
- Exibir nome do usuário logado

---

✅ **Etapa: Navegação entre telas**  
🎯 **Objetivo:**
- Adicionar links de navegação entre `/login` e `/register`
- Melhorar a experiência de usuários novos e recorrentes

---

✅ **Etapa: Dark Mode (Modo Escuro)**  
🎯 **Objetivo:**
- Ativar suporte a modo escuro com Tailwind usando `.dark`
- Criar botão de toggle (`🌙` / `☀️`) com `useDarkMode()`
- Aplicar classes condicionais `bg-white dark:bg-gray-900` etc.
- Persistir tema com `localStorage`

---

✅ **Etapa: Loading Spinners**  
🎯 **Objetivo:**
- Mostrar `spinner` nos botões de envio dos formulários e no logout
- Desabilitar os botões enquanto carrega
- Usar ícone animado com `animate-spin` do Tailwind

---

✅ **Etapa: Logout + Feedback visual**  
🎯 **Objetivo:**
- Separar a lógica de logout em `authService.logoutUser()`
- Simular atraso de rede com `setTimeout` dentro do serviço
- Executar `logout()` do contexto + `logoutUser()` para limpar estado e storage
- Redirecionar com `navigate("/login?loggedOut=true")`
- Exibir mensagem “You have been logged out.”

---

✅ **Etapa: Ajuste do login com estado global (contexto)**  
🎯 **Objetivo:**
- Alterar `loginUser()` para retornar os dados do usuário (`id`, `name`)
- Criar função `login(email, password)` no `AuthContext`
- Usar `login(...)` no `Login.tsx` para autenticar e atualizar o contexto diretamente

---

✅ **Etapa: Responsividade do Formulário de Registro**
🎯 **Objetivo:**
- Garantir que a tela de registro fique legível, fluida e bem espaçada em diferentes tamanhos de tela
- Evitar overflow ou colapsos em dispositivos móveis
- Aplicar boas práticas de responsividade com Tailwind

---

✅ **Etapa: Acessibilidade e Navegação por Teclado**
🎯 **Objetivos:**
- Permitir que todo o formulário seja navegado com Tab
- Garantir que todos os inputs tenham labels associadas corretamente
- Melhorar a usabilidade para usuários com leitores de tela ou mobilidade reduzida
- Utilizar a propriedade autocomplete em campos como email, name, password, para facilitar o preenchimento automático

---

✅ **Etapa: Substituir mensagens por Toasts**
🎯 **Objetivo:**
- Trocar mensagens de erro/sucesso fixas (ex: <p className="text-red-600">...) por toasts flutuantes
- Usar uma biblioteca leve e fácil de integrar como react-hot-toast
- Garantir feedback rápido e não bloqueante em ações como:
  - Cadastro
  - Login
  - Logout
  - Falhas inesperadas
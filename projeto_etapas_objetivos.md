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

---

✅ **Etapa: Expiração de Sessão**
🎯 **Objetivo:**
- Encerrar a sessão do usuário automaticamente após um tempo determinado (ex: 30 minutos)
- Redirecionar para /login com uma mensagem “Your session has expired”
- Mostrar toast de erro ao usuário (sem recarregar a página)

---

✅ **Etapa: Páginas de Erro (404 e Acesso Não Autorizado)**
🎯 **Objetivo:**
- Exibir uma página amigável e clara para:
  - Rotas inexistentes (404)
  - Tentativas de acesso sem permissão/autenticação (401/403)
- Garantir uma boa UX mesmo em casos de erro
- Reforçar identidade visual e navegação (ex: botão “Voltar para login”)

---

✅ **Etapa: Encapsular controle de visibilidade por role**
🎯 **Objetivo:**
- Criar uma estrutura reutilizável que permita exibir elementos da interface somente para usuários com determinados papéis (roles)
- Reduzir repetições e comparações diretas de user?.role === "admin" espalhadas pelo código
- Melhorar legibilidade, escalabilidade e manutenção do controle de acesso baseado em papéis (RBAC)
- Estabelecer uma fonte única de verdade para os papéis disponíveis no sistema, utilizando um arquivo de constantes roles.ts
- Tornar mais clara a intenção de cada bloco condicional por meio de um componente semântico: <RoleBased allowedRoles={...}>...</RoleBased>

---

✅ **Etapa: Páginas e Rotas exclusivas por role (/admin-dashboard e /user-settings)**
🎯 **Objetivo:**
- Criar páginas dedicadas para cada tipo de usuário (admin e user)
- Proteger o acesso usando o componente ProtectedRoute com requiredRole
- Demonstrar controle de acesso refinado por papel (RBAC)
- Garantir que cada usuário veja apenas o conteúdo permitido de acordo com seu perfil
- Exibir links condicionalmente usando o componente RoleBased, mantendo a navegação clara e segura

---

✅ **Etapa: Página pública com conteúdo dinâmico baseado na role (/about)**
🎯 **Objetivo:**
- Criar uma rota pública acessível a todos (visitantes e usuários autenticados)
- Exibir mensagens ou blocos de conteúdo diferentes com base no papel (role) do usuário
- Demonstrar domínio de renderização condicional usando o contexto de autenticação e o componente RoleBased
- Reforçar o conceito de UX personalizada por tipo de perfil

---

✅ **Etapa: Suporte a múltiplas roles e rota compartilhada por grupo (/manage-content)**
🎯 **Objetivos:**
- Adicionar suporte a múltiplos papéis (roles) no componente ProtectedRoute
- Permitir que diferentes tipos de usuários tenham acesso às mesmas páginas de forma segura e controlada
- Criar uma nova página protegida, acessível a usuários com os papéis "admin" ou "editor"
- Demonstrar controle de acesso por grupo de papéis, reforçando a flexibilidade do sistema de permissões
- Consolidar o uso de constantes e tipos (Role, ROLES) para garantir segurança de tipo e clareza no código
- Oferecer uma base sólida para rotas que serão compartilhadas por diferentes tipos de usuário no futuro

---

✅ **Etapa: Exibir metadados do usuário logado na interface (nome, role, email)**
🎯 **Objetivos:**
- Mostrar ao usuário informações básicas do seu próprio perfil, como nome, e-mail e papel (role)
- Reforçar visualmente o contexto da sessão ativa
- Facilitar testes e validação manual do controle de acesso durante o desenvolvimento
- Demonstrar boas práticas de transparência, contexto e UX em interfaces autenticadas
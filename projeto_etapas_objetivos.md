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

---

✅ **Etapa: Página de acesso negado com mensagem contextual baseada na role exigida**  
🎯 **Objetivos:**
- Exibir mensagens de acesso negado que indiquem qual role seria necessária para acessar a página
- Melhorar a experiência do usuário e o feedback da interface
- Facilitar testes e depuração ao mostrar o contexto do bloqueio
- Tornar a interface mais educativa, especialmente em ambientes de demonstração técnica

---

✅ **Etapa: Painel admin com listagem de todos os usuários mockados**  
🎯 **Objetivos:**
- Exibir uma tabela com os dados dos usuários cadastrados (mockados via localStorage)
- Restringir o acesso ao painel apenas para quem tem a role "admin"
- Reforçar o uso do AuthContext e das roles no controle de acesso
- Facilitar a visualização do estado atual do banco simulado
- Demonstrar capacidade de consumir, mapear e renderizar dados de forma estruturada

---

✅ **Etapa: Alteração de role por parte do admin (promover/demover usuários)**  
🎯 **Objetivos:**
- Permitir que um usuário com role "admin" possa alterar o papel (role) de outros usuários através da interface
- Atualizar os dados diretamente no localStorage (mock) de forma segura
- Refletir a mudança na interface em tempo real
- Impedir que o admin edite o próprio papel (para evitar bloqueios acidentais)
- Demonstrar domínio de CRUD e controle de acesso de nível superior

---

✅ **Etapa: Validar role na alteração de papel de usuário**  
🎯 **Objetivo:**
- Prevenir que valores inválidos de role sejam salvos no localStorage
- Reforçar segurança e confiabilidade dos dados mockados
- Reaproveitar a lógica de validação centralizada

---

✅ **Etapa: Esconder ou desabilitar botões baseados na role**  
🎯 **Objetivos:**
- Demonstrar controle de interface (visibilidade e ações) com base na role do usuário logado
- Reforçar o uso do componente RoleBased como camada de autorização visual
- Evitar exposição de ações e links para usuários sem permissão, mesmo em páginas protegidas
- Promover uma experiência de usuário mais limpa e segura
- Simular um comportamento comum em sistemas reais com múltiplas permissões (ex: admin, editor, user)

---

✅ **Etapa: Layout com design mais moderno e acessível**  
🎯 **Objetivos:**
- Melhorar o aspecto visual e a usabilidade da interface com um visual mais atual, limpo e acessível
- Aplicar boas práticas de design responsivo e visual com uso exclusivo de Tailwind CSS (sem bibliotecas pesadas como MUI ou Chakra)
- Garantir que a interface seja legível, intuitiva e amigável em diferentes tamanhos de tela e contextos de uso
- Tornar a navegação por teclado clara e funcional, com foco visível e campos interativos bem destacados
- Elevar a apresentação geral do projeto para demonstrações técnicas e entrevistas

---

✅ **Etapa: Implementação de layout base com Header e Footer (AppLayout)**  
🎯 **Objetivos:**
- Criar uma estrutura visual consistente e reutilizável para todas as páginas da aplicação
- Centralizar elementos comuns (como cabeçalho e rodapé) em um único ponto de controle
- Refletir um padrão de layout moderno e responsivo com apoio do Tailwind CSS
- Melhorar a legibilidade, organização e identidade visual da interface
- Facilitar a manutenção futura e evitar repetição de estrutura entre páginas

---

✅ **Etapa: Substituir <a> por um componente Link**  
🎯 **Objetivo:**
- Criar um componente <Link> reutilizável que aceite href, children, e estilização opcional
- Aplicar Tailwind CSS diretamente (eliminando o CSS global antigo)
- Manter acessibilidade, foco e responsividade

---

✅ **Etapa: Criar componente reutilizável Input**  
🎯 **Objetivos:**
- Reutilizar o mesmo estilo base em todos os inputs (visual, foco, dark mode, responsividade)
- Reduzir repetição de código em páginas como Register.tsx e Login.tsx
- Padronizar acessibilidade com id, aria-*, label, autoComplete, etc.
- Suporte a erros do Zod, com exibição de mensagens de forma consistente
- Facilitar manutenção futura (troca de estilos, interações, temas)

---

✅ **Etapa: Tratamento global de erros e mensagens padronizadas**  
🎯 **Objetivos:**
- Centralizar o tratamento de exceções inesperadas, garantindo que qualquer falha crítica (ex: parsing de localStorage, erros em serviços, falhas de permissão) seja corretamente capturada e exibida ao usuário.
- Padronizar mensagens de erro, evitando duplicação de strings e facilitando a manutenção do projeto.
- Melhorar a experiência do usuário com toasts de erro consistentes em todos os cenários, evitando erros silenciosos ou alertas bloqueantes.
- Aumentar a confiabilidade da aplicação, evitando travamentos causados por falhas não tratadas no fluxo de autenticação ou alteração de roles.

✅ **Etapa: Implementação do userService e melhorias no UserList**  
🎯 **Objetivos:**
- Criar um serviço dedicado (userService) para encapsular operações com usuários mockados usando localStorage
- Garantir consistência com os outros serviços (authService), simulando delays de rede via Promise + setTimeout
- Centralizar e reutilizar lógica de acesso aos dados dos usuários (como getAllUsers e updateUserRole)
- Eliminar o uso direto de localStorage no componente UserList, favorecendo separação de responsabilidades
- Adicionar feedback visual com estados de loading durante:
- Carregamento inicial da lista de usuários
- Atualização de role individual
- Exibir feedback de sucesso com toast.success(...) após alteração bem-sucedida de role
- Usar handleUnexpectedError(...) para capturar e notificar falhas inesperadas

---

✅ **Etapa: Gerenciamento de Sessão e Monitoramento de Expiração**  
🎯 **Objetivos:**
- Centralizar a lógica de leitura da sessão (mock_auth) em um serviço reutilizável (getAuthSession)
- Remover acessos diretos ao localStorage dentro do AuthContext, favorecendo coesão e manutenção
- Tratar falhas de leitura da sessão com segurança, evitando exceções silenciosas
- Implementar verificação automática de expiração da sessão com um setInterval que revoga a sessão quando necessário
- Adicionar monitoramento via evento storage para capturar remoções manuais da sessão em outras abas ou via DevTools

---

✅ **Etapa: Admin pode deletar usuários na página UserList**
🎯 **Objetivos:**
- Permitir que um usuário com role "admin" remova permanentemente usuários da lista.
- Demonstrar controle de interface e permissão com base na role atual.
- Exibir feedback visual claro (toast de sucesso ou erro) após a ação.
- Simular atraso de rede com setTimeout para representar uma operação real de backend.
- Garantir que o botão “Delete” não seja visível para usuários que não sejam admin.
- Impedir que o admin delete a si mesmo (autoexclusão).

---

✅ **Etapa: Confirmação inline para exclusão de usuário**
🎯 **Objetivos:**
- Adicionar uma etapa de confirmação visual antes da exclusão definitiva de um usuário
- Substituir o botão "Delete" por dois botões "Confirm" e "Cancel" de forma inline, sem modais
- Prevenir exclusões acidentais com uma interface simples, clara e acessível
- Implementar a lógica com useState(confirmingUserId) para controle da confirmação
- Restaurar o botão original se o usuário clicar em "Cancel"
- Manter consistência visual com o restante do projeto (cores, acessibilidade e responsividade com TailwindCSS)
- Garantir que o botão "Confirm" invoque a função de exclusão com segurança
- Tornar a funcionalidade mais robusta e alinhada com boas práticas de UX e prevenção de erro

## ✅ Tipos de Testes em Aplicações Front-End
### 1. 🧪 Testes Unitários (Unit Tests)
**👉 O que são:**  
Testam uma única função, componente ou lógica isoladamente, sem depender de outros módulos, navegação ou estado global.

**✅ Exemplos no seu projeto:**
- Validar que o componente Input renderiza corretamente.
- Verificar que handleUnexpectedError() chama o toast certo.
- Testar que ProtectedRoute mostra ou bloqueia o filho baseado na role.

**🛠️ Ferramentas comuns:**
- jest
- @testing-library/react

**🧠 Objetivo:** Garantir que cada unidade de código funcione como esperado em todos os casos de uso possíveis.

### 2. 🔄 Testes de Integração (Integration Tests)
**👉 O que são:**
Testam a interação entre duas ou mais partes da aplicação: componentes, hooks, contextos, serviços ou navegação local.

**✅ Exemplos no seu projeto:**
- Testar se AuthContext define user corretamente após login.
- Verificar se o toast de erro aparece após falha na submissão de formulário.
- Garantir que a UserList renderize corretamente os dados vindos do service.

**🛠️ Ferramentas comuns:**
- jest + @testing-library/react
- Simulações de contexto (renderWithContext, MemoryRouter, etc.)

**🧠 Objetivo:** Verificar se as peças se integram corretamente sem depender de uma interface real.

### 3. 🌐 Testes de Ponta a Ponta (End-to-End / E2E)
**👉 O que são:**
Simulam o comportamento real do usuário final, com navegação, preenchimento de formulários, cliques e redirecionamentos, em um navegador real ou simulado.

**✅ Exemplos no seu projeto:**
- Abrir a aplicação, se registrar, fazer login, ser redirecionado para /dashboard
- Entrar como admin e alterar a role de um usuário
- Verificar se um usuário com role inválida é bloqueado na navegação

**🛠️ Ferramentas comuns:**
- Cypress
- Playwright

**🧠 Objetivo:** Garantir que o app funcione do ponto de vista do usuário final, cobrindo fluxos completos.

## 🧭 Comparativo rápido
| Tipo       | Escopo                | Velocidade ⚡ | Confiabilidade 🔒 | Custo de Manutenção 💸 |
| ---------- | --------------------- | ------------ | ----------------- | ---------------------- |
| Unitário   | Uma função/componente | Alta         | Alta              | Baixo                  |
| Integração | Vários módulos        | Média        | Média             | Médio                  |
| E2E        | Fluxo completo real   | Baixa        | Alta              | Alto                   |

## ✅ Estratégia recomendada
A decisão de qual tipo de teste usar depende de 3 fatores principais:

**1. Importância da funcionalidade**
Se for crítico para o negócio ou segurança, teste com mais profundidade.
Ex: Login, persistência de sessão, controle de acesso → merecem integração e E2E.

**2. Complexidade do código**
Códigos simples e isolados → geralmente bastam testes unitários.
Ex: Funções como handleUnexpectedError, isValidRole.

**3. Custo-benefício**
Testes E2E são mais lentos e caros de manter, então use apenas nos fluxos mais importantes.
Testes unitários são baratos e rápidos, então são ideais para lógica isolada.

## 🧪 Recomendação para seu projeto atual
| Parte                             | Teste Ideal(es)       | Justificativa                                |
| --------------------------------- | --------------------- | -------------------------------------------- |
| `AuthContext`                     | Integração            | Interage com storage, contexto, navegação    |
| Formulários (`Register`, `Login`) | Unitário + Integração | Valida entradas + comportamento de submit    |
| ProtectedRoute / RoleBased        | Unitário              | Lógica pura baseada em props                 |
| Fluxo completo de login           | E2E                   | Valida do ponto de vista do usuário final    |
| Altera role em UserList           | Integração            | Precisa simular alteração e verificar efeito |
| Toasts, loading                   | UI / Integração       | Verifica feedback visual                     |
| Sessão (expiração, persistência)  | Integração + E2E      | Complexidade e importância                   |

## Guidelines
🔸 Comece com testes unitários para lógica isolada  
🔸 Use testes de integração para contextos, páginas e interações  
🔸 Reserve testes E2E para fluxos críticos e completos  
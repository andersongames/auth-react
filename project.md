# 💼 Projeto Técnico: Autenticação com ReactJS (Login e Sign Up)

## 🎯 Objetivo

Construir uma aplicação web com **ReactJS** que implemente funcionalidades completas de **Login**, **Cadastro (Sign Up)** e **Proteção de Rotas**, utilizando boas práticas de autenticação e segurança.

A aplicação deve simular um sistema de autenticação de usuários com backend fictício ou real (você pode usar uma API mockada ou implementar um backend simples com Node.js, Firebase ou qualquer BaaS), e permitir:

- Criação de conta com e-mail e senha
- Login com e-mail e senha
- Manutenção da sessão autenticada
- Redirecionamento e proteção de rotas privadas
- Logout

---

## 📦 Stack Tecnológica

### ✅ Frontend
- **ReactJS (com Hooks e functional components)**
- **React Router DOM** – para controle de navegação e rotas protegidas
- **Zod ou Yup** – para validação de formulários
- **React Hook Form** – para gerenciar os inputs de forma eficiente
- **Axios ou Fetch API** – para comunicação com backend
- **JWT (simulado ou real)** – para simular autenticação baseada em token
- **TailwindCSS ou CSS Modules** – para estilização

### ⚙️ (Opcional) Backend
- Node.js + Express + Prisma/SQLite/PostgreSQL
- Firebase Authentication (alternativa rápida)
- JSON Server ou mock API

---

## 🔐 Requisitos de Segurança

- **Validação do lado cliente e servidor (se aplicável)**
- **Armazenamento do token apenas em `httpOnly cookies` (se tiver backend real)** ou, se simulado, **simular armazenamento seguro no localStorage/sessionStorage com aviso das limitações**
- **Uso de HTTPS na comunicação (mesmo que local com um proxy)**
- **Sanitização de inputs**
- **Mensagens de erro genéricas para evitar enumeração de usuários**

---

## 📋 Funcionalidades Esperadas

### 1. **Sign Up**
- Formulário com campos: nome, e-mail, senha, confirmação de senha
- Validação de dados (mínimo de caracteres, formato de e-mail, senhas iguais, etc)
- Envio dos dados para o backend simulado/real
- Redirecionamento para login após sucesso

### 2. **Login**
- Formulário com e-mail e senha
- Validação de campos
- Armazenamento do token de autenticação (simulado ou real)
- Redirecionamento para uma área autenticada

### 3. **Área Protegida**
- Página que só pode ser acessada com o usuário logado
- Redirecionamento automático para login se não autenticado
- Exibição de dados do usuário (nome ou e-mail, por exemplo)
- Botão de logout

### 4. **Persistência de Sessão**
- Manter usuário autenticado ao recarregar a página
- Logout limpa corretamente o token e redireciona

---

## 🧠 O que será avaliado tecnicamente

| Capacidade                 | Avaliação                                                  |
|---------------------------|------------------------------------------------------------|
| **Organização do projeto**| Separação de componentes, estrutura de pastas              |
| **Qualidade de código**   | Clareza, coesão, legibilidade, uso adequado de hooks       |
| **Boas práticas de segurança** | Validação, armazenamento seguro de credenciais     |
| **Gerenciamento de estado**| Uso correto do estado global/local e contexto se necessário|
| **Conhecimento de autenticação**| Entendimento do ciclo de login/logout/token/session |
| **Experiência do usuário (UX)**| Feedback de erros, carregamento, navegação fluida   |
| **Estilização**           | Layout limpo e responsivo, uso adequado de classes/utilitários |
| **Documentação leve**     | Um README explicando como rodar o projeto e tecnologias usadas |

---

## 📌 Extras (Diferenciais)

- Dark mode toggle
- Testes unitários com Jest + Testing Library
- Integração com OAuth (Google, GitHub, etc)
- Deploy no Vercel ou Netlify com link de demonstração
- CI/CD simples (GitHub Actions para lint ou build)

---

## 📁 Estrutura Sugerida do Projeto

```
/src
  /components
    Input.tsx
    ProtectedRoute.tsx
  /pages
    Login.tsx
    Register.tsx
    Dashboard.tsx
  /services
    authService.ts
  /context
    AuthContext.tsx
  /utils
    validators.ts
  App.tsx
  main.tsx
```

---

## 📝 Entrega

Você pode subir o projeto no GitHub, com um README explicativo contendo:

- Tecnologias usadas
- Como rodar localmente
- Explicação das principais decisões técnicas
- Link do deploy, se houver

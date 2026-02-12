# 📍 Órgãos Públicos de Ituiutaba – MVP

## 🏛 Sistema Informativo Municipal com Geolocalização

---

## 📌 1. Sobre o Projeto

O projeto **Órgãos Públicos de Ituiutaba** é uma solução digital desenvolvida durante estágio supervisionado, composta por:

- 💻 Sistema Web Administrativo  
- 📱 Aplicativo Mobile para o cidadão  

A plataforma tem como objetivo centralizar, organizar e disponibilizar informações dos órgãos públicos municipais de forma moderna, intuitiva e acessível, utilizando **geolocalização e integração com o Google Maps**.

---

## 🎯 2. Objetivo Geral

Desenvolver uma plataforma digital que permita aos cidadãos localizar órgãos públicos do município de Ituiutaba, visualizar informações detalhadas e traçar rotas até esses locais, ao mesmo tempo em que oferece à prefeitura um painel administrativo para gerenciamento dos dados.

---

## 🎯 3. Objetivos Específicos

- Exibir órgãos públicos em mapa interativo  
- Permitir busca por nome  
- Filtrar por tipo de órgão  
- Exibir informações detalhadas:
  - Endereço  
  - Telefone  
  - Email  
  - Horário de funcionamento  
  - Status (Aberto/Fechado)  
- Possibilitar criação de rotas no mapa  
- Permitir abertura da rota diretamente no Google Maps  
- Oferecer painel administrativo com controle de acesso  
- Centralizar e padronizar informações municipais  

---

## 🧠 4. Problema Identificado

Antes do sistema:

- Informações estavam dispersas  
- Dificuldade de localização dos órgãos  
- Falta de mapa centralizado  
- Dependência de atendimento presencial para dados básicos  

O projeto propõe resolver esse problema através da digitalização e centralização das informações públicas.

---

## 🏗 5. Arquitetura do Sistema

### 🔹 Backend

- Node.js  
- Express  
- Prisma ORM  
- PostgreSQL (Supabase)  
- JWT (Autenticação)  
- API REST  

**Responsabilidades:**

- CRUD completo  
- Autenticação segura  
- Controle de acesso  
- Validação de dados  
- Expiração de token  
- Integração com banco de dados  

---

### 🔹 Frontend Web (Admin)

- React.js (Vite)  
- React Router DOM  
- Axios  
- Google Maps JavaScript API  

**Funcionalidades:**

- Login administrativo  
- Proteção de rotas  
- Cadastro de órgãos com mapa  
- Edição e exclusão  
- Gerenciamento de tipos e secretarias  

---

### 🔹 Mobile (Cidadão)

- React Native (Expo)  
- react-native-maps  
- Google Maps SDK  
- Google Directions API  
- Bottom Sheet  
- Geolocalização do dispositivo  

**Funcionalidades:**

- Mapa interativo  
- Localização atual do usuário  
- Pins personalizados por tipo  
- Busca com autocomplete  
- Filtros horizontais  
- Bottom Sheet com detalhes  
- Traçar rota no mapa  
- Abrir no Google Maps  
- Status do órgão (🟢 Aberto / 🔴 Fechado)  

---

## 📂 6. Estrutura do Projeto

```
orgaos-publicos-ituiutaba/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend-web/
│   └── admin/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── services/
│       │   └── App.jsx
│       └── package.json
│
├── mobile/
│   └── app/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── constants/
│       └── package.json
│
└── README.md
```

---

## 📅 7. Fases de Desenvolvimento

### ✅ Fase 1 – Planejamento

- Definição do escopo  
- Modelagem de dados  
- Configuração do ambiente  
- Estruturação do repositório  

---

### ✅ Fase 2 – Backend

- API REST funcional  
- CRUD completo  
- Autenticação JWT  
- Integração com banco PostgreSQL  
- Controle de expiração de token  

---

### ✅ Fase 3 – Sistema Web Administrativo

- Login administrativo  
- Proteção de rotas  
- Cadastro com mapa  
- Gerenciamento completo de dados  

---

### ✅ Fase 4 – Aplicativo Mobile (Base)

- Mapa com localização do usuário  
- Exibição de órgãos  
- Bottom Sheet com detalhes  
- Traçado de rota  
- Abertura no Google Maps  

---

### 🔄 Fase 5 – Melhorias de UX/UI

- Ícones personalizados por tipo  
- Filtros horizontais  
- Autocomplete na busca  
- Feedback visual ao traçar rota  
- Status do órgão (aberto/fechado)  
- Melhorias de estabilidade no iOS  
- Correções de crash  
- Experiência semelhante ao Google Maps  

---

### ⏳ Fase 6 – Próximos Passos

- Melhorias visuais no painel web  
- Deploy da API  
- Deploy do app (Play Store)  
- Dashboard com métricas  
- Sistema de logs  
- Controle de permissões por nível  

---

## ▶️ 8. Como Rodar o Projeto

### 🖥️ TERMINAL 1 — BACKEND

```bash
cd backend
npm install
npm run dev
```

API disponível em:

```
http://localhost:3000
```

---

### 🖥️ TERMINAL 2 — FRONTEND WEB (ADMIN)

```bash
cd frontend-web/admin
npm install
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

### 🖥️ TERMINAL 3 — MOBILE (APP)

```bash
cd mobile/app
npm install
npx expo start
```

---

## 🔐 Login Administrativo de Teste

```
Email: admin@ituiutaba.mg.gov.br
Senha: ********
```

*(Recomenda-se alterar credenciais antes de produção)*

---

## 🚀 Diferenciais do Projeto

- Integração real com Google Maps  
- Geolocalização dinâmica  
- Sistema administrativo completo  
- Separação clara de responsabilidades  
- Arquitetura escalável  
- Controle de autenticação com expiração de token  
- Foco em usabilidade e experiência do usuário  

---

## 🏛 Contexto Acadêmico

Projeto desenvolvido como parte de estágio supervisionado, com foco em:

- Arquitetura de software  
- Segurança  
- UX/UI  
- Boas práticas  
- Versionamento  
- Estrutura escalável  

---

## 📌 Status do Projeto

🟢 MVP Funcional  
🟡 Melhorias em andamento  
🔵 Preparação para apresentação final  

---

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for more information.

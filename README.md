# Órgãos Públicos de Ituiutaba – MVP

## 📌 Descrição do Projeto
Este projeto consiste no desenvolvimento de um **sistema informativo de órgãos públicos do município de Ituiutaba**, composto por:

- 💻 Um **sistema web administrativo** para uso da Prefeitura
- 📱 Um **aplicativo mobile** voltado ao cidadão

A solução tem como finalidade **centralizar, organizar e disponibilizar informações dos órgãos públicos municipais**, utilizando **geolocalização e integração com o Google Maps**, facilitando o acesso da população aos serviços públicos.

---

## 🎯 Objetivo Geral
Desenvolver uma plataforma digital que permita aos cidadãos localizar órgãos públicos do município de Ituiutaba, visualizar informações detalhadas e traçar rotas até esses locais, ao mesmo tempo em que oferece à prefeitura um painel administrativo para gerenciamento dos dados.

---

## 🎯 Objetivos Específicos
- Exibir órgãos públicos em mapa interativo
- Permitir busca e filtragem por tipo de órgão
- Exibir informações detalhadas (endereço, telefone, horário de funcionamento)
- Possibilitar criação de rotas no mapa e via Google Maps
- Permitir à prefeitura gerenciar os dados por meio de um painel administrativo
- Centralizar e padronizar as informações dos órgãos públicos municipais
- Garantir segurança e controle de acesso administrativo

---

## 🧱 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (Supabase)
- JWT (autenticação)

### Frontend Web (Admin)
- React.js (Vite)
- Axios
- React Router DOM
- Google Maps JavaScript API

### Mobile
- React Native (Expo)
- react-native-maps
- Google Maps SDK (Android / iOS)
- Google Directions API
- Geolocalização do dispositivo
- Bottom Sheet

### Outras Ferramentas
- Git / GitHub
- Postman / Insomnia
- Google Cloud Console

---

## 🗂 Estrutura do Projeto

```text
orgaos-publicos-ituiutaba/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend-web/
│   └── admin/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── services/
│       │   └── App.jsx
│       ├── .env
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
├── .gitignore
└── README.md
```

---

## 📆 Fases de Desenvolvimento

### 🔹 Fase 1 – Planejamento e Ambiente ✅
- Definição do escopo
- Modelagem de dados
- Configuração do ambiente
- Repositório Git

### 🔹 Fase 2 – Backend ✅
- API REST
- CRUD completo
- Autenticação JWT
- Integração com banco de dados

### 🔹 Fase 3 – Sistema Web Administrativo ✅
- Login administrativo
- Proteção de rotas
- CRUD completo
- Cadastro com mapa

### 🔹 Fase 4 – Aplicativo Mobile (Base) ✅
- Mapa com localização do usuário
- Exibição de órgãos
- Bottom Sheet com detalhes
- Rotas no mapa
- Abertura no Google Maps

---

## 🚧 Fase 5 – Melhorias (EM ANDAMENTO)

### 🗓️ DIA 1 — Revisão Geral ✅
- Revisão completa do código
- Organização do projeto
- Planejamento técnico das melhorias

### 🗓️ DIA 2 — Ícones Personalizados no Mapa (Mobile) ✅
- Ícones por tipo de órgão
- Pins personalizados
- Melhor leitura visual do mapa

### 🗓️ DIA 3 — Busca e Filtros no Mobile ✅
- Campo de busca por nome
- Filtro por tipo de órgão
- Layout otimizado para mobile
- Safe Area (iOS e Android)
- Correção de crashes no iOS
- Delay controlado para traçar rotas
- UX semelhante ao Google Maps

✅ **Resultado:** navegação mais rápida, mapa limpo e experiência estável.
---

## 📅 Planejamento Ajustado (Escopo Reduzido)

Para garantir a entrega do MVP dentro do prazo do estágio, o escopo foi ajustado:

### 🗓️ DIA 4 — Autocomplete e Centralização (PRÓXIMO)
- Autocomplete simples na busca
- Centralizar o mapa ao selecionar um órgão
- Abrir Bottom Sheet automaticamente ao selecionar

### 🗓️ DIA 5 — Ajustes Finais de UX/UI
- Refinar espaçamentos
- Melhorar visual do Bottom Sheet
- Pequenos ajustes de usabilidade

### 🗓️ DIA 6 — Testes Finais e Documentação
- Testes gerais
- Correção de pequenos bugs
- Preparação para apresentação do estágio

> Funcionalidades como **status aberto/fechado** e **fotos dos órgãos** foram
> **adiadas**, pois não são essenciais para o MVP.

---

### 🔹 Fase 6 – Demonstração
⬜ Testes finais  
⬜ Documentação  
⬜ Apresentação  

---

## 🏛 Observações Finais
Projeto desenvolvido como parte de um **estágio supervisionado**, com foco em qualidade, usabilidade e evolução futura.

---

## Rodar o Programa 

    🖥️ TERMINAL 1 — BACKEND (API)
    📁 Caminho
    cd backend

    ▶️ Comando para rodar
    npm install   # só na primeira vez
    npm run dev

    ✅ Resultado esperado

    No terminal:

    Servidor rodando na porta 3000


    📌 A API ficará em:

    http://localhost:3000


    ou

    http://SEU_IP:3000

    🖥️ TERMINAL 2 — FRONTEND WEB (ADMIN)
    📁 Caminho
    cd frontend-web/admin

    ▶️ Comando para rodar
    npm install   # só na primeira vez
    npm run dev

    ✅ Resultado esperado

    No terminal:

    Local: http://localhost:5173

    login de teste: admin@ituiutaba.mg.gov.br

    📌 Acesse no navegador:

    http://localhost:5173

    🖥️ TERMINAL 3 — MOBILE (APP)
    📁 Caminho
    cd mobile/app

    ▶️ Comando para rodar
    npm install   # só na primeira vez
    npx expo start
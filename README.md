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

### 🔹 Fase 1 – Planejamento e Ambiente (CONCLUÍDA)
✔ Definição conceitual das telas  
✔ Definição do modelo de dados  
✔ Criação do repositório Git  
✔ Configuração do backend  
✔ Integração do Prisma com PostgreSQL  
✔ Ambiente validado  

---

### 🔹 Fase 2 – Backend (CONCLUÍDA)
✔ Modelagem do banco de dados  
✔ API REST com Express  
✔ CRUD de Tipos de Órgão, Secretarias e Órgãos  
✔ Autenticação com JWT  

---

### 🔹 Fase 3 – Sistema Web Administrativo (CONCLUÍDA)
✔ Login administrativo  
✔ Proteção de rotas  
✔ CRUD completo  
✔ Cadastro com mapa  

---

### 🔹 Fase 4 – Aplicativo Mobile (CONCLUÍDA)
✔ Mapa com localização do usuário  
✔ Detalhes do órgão (Bottom Sheet)  
✔ Rotas no mapa e Google Maps  

---

### 🔹 Fase 5 – Melhorias (EM ANDAMENTO)
🚧 Ícones por tipo  
🚧 Filtros  
🚧 Busca com autocomplete  
🚧 UX/UI  

---

### 🔹 Fase 6 – Demonstração (PLANEJADA)
⬜ Testes finais  
⬜ Documentação  
⬜ Apresentação  

---

## 🏛 Observações Finais
Projeto desenvolvido como parte de um **estágio supervisionado**, com foco em qualidade, usabilidade e evolução futura.

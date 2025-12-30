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
- Exibir informações detalhadas (endereço, telefone, horário)
- Possibilitar criação de rotas via Google Maps
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

### Mobile (planejado)
- React Native
- Google Maps API
- Geolocalização do dispositivo

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
├── mobile/           # Aplicativo mobile (a desenvolver)
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
✔ CRUD de Tipos, Secretarias e Órgãos  
✔ Testes de API  

---

### 🔹 Fase 3 – Sistema Web Administrativo (CONCLUÍDA)
✔ Autenticação JWT  
✔ Painel administrativo  
✔ CRUD completo com delete lógico  
✔ Integração com Google Maps  
✔ Cadastro de órgão por CEP + mapa interativo  

---

### 🔹 Fase 4 – Aplicativo Mobile (A FAZER)
⬜ Mapa com localização do usuário  
⬜ Exibição dos órgãos  
⬜ Tela de detalhes  
⬜ Rotas via Google Maps  

---

### 🔹 Fase 5 – Ajustes Finais e Demonstração (A FAZER)
⬜ Testes finais  
⬜ Ajustes visuais  
⬜ Dados de demonstração  
⬜ Apresentação do MVP  

---

## 🏛 Observações Finais
Projeto desenvolvido como parte de um **estágio supervisionado**, seguindo boas práticas de desenvolvimento e visando futura implantação em ambiente oficial da Prefeitura de Ituiutaba.

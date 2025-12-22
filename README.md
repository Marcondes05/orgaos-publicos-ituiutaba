# Órgãos Públicos de Ituiutaba – MVP

## 📌 Descrição do Projeto
Este projeto consiste no desenvolvimento de um **sistema informativo de órgãos públicos do município de Ituiutaba**, composto por:

- 📱 Um **aplicativo mobile** voltado ao cidadão
- 💻 Um **sistema web administrativo** destinado à Prefeitura

O sistema tem como objetivo **facilitar o acesso da população às informações dos órgãos públicos**, utilizando geolocalização e integração com o Google Maps.

---

## 🎯 Objetivo Geral
Disponibilizar uma plataforma digital que permita aos cidadãos localizar órgãos públicos do município de Ituiutaba, visualizar informações relevantes e traçar rotas até esses locais.

---

## 🎯 Objetivos Específicos
- Exibir órgãos públicos em um mapa interativo
- Permitir busca e filtragem por tipo de órgão
- Exibir informações detalhadas dos órgãos
- Possibilitar criação de rotas via Google Maps
- Permitir à prefeitura gerenciar os dados por meio de um painel administrativo
- Centralizar e padronizar as informações dos órgãos públicos municipais

---

## 🧱 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (Supabase)

### Frontend Web (Admin)
- React.js

### Mobile
- React Native (a definir implementação final)
- Google Maps API
- Geolocalização

### Outras Ferramentas
- Git / GitHub
- Postman (testes de API)

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
│   │   ├── prisma/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend-web/     # Painel administrativo (React)
├── mobile/           # Aplicativo mobile (React Native)
├── .gitignore
└── README.md
```
---

## 📆 Fases de Desenvolvimento
## 🔹 Fase 1 – Planejamento e Ambiente (CONCLUÍDA)

        Objetivo: Preparar o ambiente e definir a base do sistema.

        ✔ Definição conceitual das telas do sistema
        ✔ Definição do modelo de dados (Tipo de Órgão, Secretaria e Órgão)
        ✔ Criação da estrutura do repositório
        ✔ Configuração do backend
        ✔ Integração do Prisma com PostgreSQL no Supabase
        ✔ Ambiente validado e funcional

## 🔹 Fase 2 – Backend (CONCLUÍDA)

        Objetivo: Desenvolver o backend e validar a comunicação com o banco de dados.

        ✔ Modelagem física do banco de dados
        ✔ Criação das tabelas no PostgreSQL
        ✔ Implementação da API REST com Express
        ✔ CRUD básico de:

        Tipo de Órgão

        Secretaria

        Órgão Público (com relacionamentos)

        ✔ Testes realizados via API (Postman/Insomnia)

## 🔹 Fase 3 – Sistema Web Administrativo (A FAZER)

        Objetivo: Criar o painel administrativo para a prefeitura.

        ⬜ Autenticação do administrador
        ⬜ Tela de login
        ⬜ Cadastro, edição e desativação de:

        Tipos de Órgãos

        Secretarias

        Órgãos Públicos
        ⬜ Integração completa com a API

## 🔹 Fase 4 – Aplicativo Mobile (A FAZER)

        Objetivo: Desenvolver o aplicativo para o cidadão.

        ⬜ Mapa com localização do usuário
        ⬜ Exibição dos órgãos públicos no mapa
        ⬜ Busca e filtragem por tipo de órgão
        ⬜ Tela de detalhes do órgão
        ⬜ Integração com Google Maps para criação de rotas

## 🔹 Fase 5 – Ajustes Finais e Demonstração (A FAZER)

        Objetivo: Finalizar o MVP para apresentação.

        ⬜ Testes finais
        ⬜ Ajustes visuais e de usabilidade
        ⬜ Inserção de dados de demonstração
        ⬜ Preparação para apresentação do MVP

## 🏛 Observações Finais

Este projeto está sendo desenvolvido como parte de um estágio supervisionado, seguindo boas práticas de desenvolvimento de software, organização de código e planejamento incremental.

A solução foi pensada para possibilitar futura implantação em ambiente oficial da Prefeitura de Ituiutaba, respeitando princípios de segurança, escalabilidade e manutenibilidade.
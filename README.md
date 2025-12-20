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

---

## 🗂 Estrutura do Projeto

```text
orgaos-publicos-ituiutaba/
│
├── backend/        # API e banco de dados
├── frontend-web/   # Sistema administrativo
├── mobile/         # Aplicativo mobile
└── README.md
```
---

## 📆 Planejamento de Desenvolvimento
## 🔹 Fase 1 – Planejamento e Ambiente (Concluída)

        Definição conceitual das telas do sistema

        Definição do modelo de dados (Tipo de Órgão, Secretaria, Órgão)

        Criação da estrutura do projeto

        Configuração do backend

        Integração do Prisma com o banco PostgreSQL no Supabase

## 🔹 Fase 2 – Backend (Em andamento)

        Criação das tabelas no banco de dados

        Implementação da API REST

        Autenticação do administrador

        CRUD de:

        Tipos de Órgãos

        Secretarias

        Órgãos Públicos

## 🔹 Fase 3 – Frontend Web (Admin)

        Login do administrador

        Telas de cadastro e gerenciamento

        Integração com a API

## 🔹 Fase 4 – Aplicativo Mobile

        Mapa com localização do usuário

        Exibição dos órgãos no mapa

        Tela de detalhes do órgão

        Integração com Google Maps para rotas

## 🔹 Fase 5 – Ajustes e Demonstração

        Testes finais

        Ajustes visuais

        Preparação do MVP para apresentação

## 🏛 Observações

---

Este projeto está sendo desenvolvido como MVP (Produto Mínimo Viável) para fins acadêmicos, com possibilidade de futura implantação em ambiente oficial da Prefeitura de Ituiutaba.
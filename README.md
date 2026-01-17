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

### 🗓️ DIA 1 — Revisão Geral e Planejamento Técnico

    Objetivo: Garantir base estável antes das melhorias.

    Atividades:

    Revisão geral do código (backend, admin e mobile)

    Limpeza final de código (logs, comentários desnecessários)

    Revisão do README e alinhamento do cronograma

    Definição técnica de como cada melhoria será implementada

    📌 Resultado esperado: código organizado e plano claro de execução.

### 🗓️ DIA 2 — Ícones Personalizados no Mapa (Mobile)

    Objetivo: Melhorar leitura visual do mapa.

    Atividades:

    Definir ícones por tipo de órgão (UBS, Secretaria, Escola, etc.)

    Associar tipo de órgão ao ícone correspondente

    Aplicar ícones personalizados nos marcadores do mapa

    Testes visuais no mapa

    📌 Resultado esperado: mapa mais intuitivo e visualmente organizado.

### 🗓️ DIA 3 — Filtro de Busca por Tipo de Órgão (Mobile)

    Objetivo: Reduzir poluição visual e facilitar navegação.

    Atividades:

    Criar seletor de tipo de órgão (chips ou dropdown)

    Filtrar os órgãos exibidos no mapa conforme o tipo selecionado

    Ajustar estado e comportamento do mapa

    Testes de usabilidade

    📌 Resultado esperado: usuário visualiza apenas os órgãos desejados.

### 🗓️ DIA 4 — Campo de Busca com Autocomplete (Mobile)

    Objetivo: Facilitar localização direta de um órgão.

    Atividades:

    Criar campo de busca por nome do órgão

    Implementar sugestões enquanto o usuário digita

    Centralizar o mapa ao selecionar um órgão

    Abrir automaticamente o Bottom Sheet com os detalhes

    📌 Resultado esperado: busca rápida e eficiente por nome.

### 🗓️ DIA 5 — Melhorias de UX/UI no Mobile

    Objetivo: Tornar o aplicativo mais agradável e intuitivo.

    Atividades:

    Ajustar espaçamentos e tamanhos de fonte

    Melhorar organização do Bottom Sheet

    Padronizar cores e botões

    Melhorar feedback visual das ações do usuário

    📌 Resultado esperado: aplicativo mais limpo e profissional.

### 🗓️ DIA 6 — Melhorias de UX/UI no Painel Administrativo

    Objetivo: Facilitar o uso do sistema pela prefeitura.

    Atividades:

    Reorganizar formulários

    Melhorar feedback de sucesso/erro

    Ajustar navegação e layout

    Pequenas melhorias visuais (legibilidade e organização)

    📌 Resultado esperado: painel mais intuitivo e fácil de usar.

### 🗓️ DIA 7 — Exibição de Status do Órgão (Aberto / Fechado)

    Objetivo: Informação útil ao cidadão.

    Atividades:

    Utilizar horário de funcionamento já cadastrado

    Calcular status com base no horário atual

    Exibir status visual no Bottom Sheet

    Testar diferentes horários

    📌 Resultado esperado: usuário sabe se o órgão está aberto no momento.

### 🗓️ DIA 8 — Inclusão de Foto do Órgão

    Objetivo: Melhor reconhecimento visual do local.

    Atividades:

    Utilizar campo de URL de imagem já existente

    Exibir foto no Bottom Sheet do mobile

    Ajustar layout para imagem

    Testes com imagens reais

    📌 Resultado esperado: visual mais rico e informativo.

### 🗓️ DIA 9 — Testes Gerais e Ajustes Finais

    Objetivo: Garantir estabilidade do sistema.

    Atividades:

    Testes completos no mobile

    Testes no painel administrativo

    Correção de pequenos bugs

    Ajustes finos de usabilidade

    📌 Resultado esperado: sistema estável para demonstração.

---

### 🔹 Fase 6 – Demonstração (PLANEJADA)
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

    admin@ituiutaba.mg.gov.br

    📌 Acesse no navegador:

    http://localhost:5173

    🖥️ TERMINAL 3 — MOBILE (APP)
    📁 Caminho
    cd mobile/app

    ▶️ Comando para rodar
    npm install   # só na primeira vez
    npx expo start
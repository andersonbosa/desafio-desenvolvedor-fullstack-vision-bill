
[![Creative Commons](https://img.shields.io/badge/license-CC0_1.0-blue.svg?style=flat)](http://creativecommons.org/publicdomain/zero/1.0/)
[![](https://img.shields.io/badge/contributions-WELCOME-green)](#)
[![](https://img.shields.io/badge/made_with-LOVE-red)](#)


---
<section align="center">
  <img src="docs/assets/images/banner.svg" title="Project banner" alt="Project banner" />
  <br>
  <br>
</section>

### Como rodar (em docker)

1. Vá até pasta src onde se encontra Makefile [(aqui)](./src/)
2. Rode `make dev` para inicializar os containers
3. Caso seja primeira vez iniciando o banco de dados será preciso rodar o comando abaixo para iniciá-lo:
  ```bash
  RUN POSTGRES_URL="postgres://psql_user:psql_pass@localhost:5432/lumi_db" pnpm db:first-setup
  ``` 
4. Após isso a aplicação frontend estará online no endereço http://localhost:3001

### Planejamento / trabalho futuro

Vou detalhar aqui abaixo as coisas que faltaram na aplicação.

- Testes unitários e de interface
- Tabela de exibição dos dados:
  - Faltou paginação
  - Faltou pesquisa
  - Faltou filtros
- Mais gráficos

### Rascunho de tarefas a serem feitas que não completei.

```
└─ desafio-desenvolvedor-fullstack-vision-bill
   ├─ fastify.d.ts
   │  └─ line 7: TODO define user structure decoded from JWT
   ├─ error-handler.plugin.ts
   │  └─ line 14: TODO remove in development
   ├─ parsers.ts
   │  └─ line 202: TODO create specific table on database to store this kind of data ?
   ├─ upload.controller.ts
   │  ├─ line 20: DONE create basic structure to parse file
   │  ├─ line 22: NOTE future enhancement: allow upload of multiple files same time
   │  ├─ line 34: DONE create fingerprint of the file: dont recreate if it already uploaded
   │  ├─ line 53: DONE define Output object of parsedData (review test info)
   │  ├─ line 56: DONE persist parsed data on database
   │  ├─ line 79: DONE persist file on disk where fingerprint is the filename
   │  └─ line 86: DONE return fileId to user query the parsed Data throught API
   ├─ healthcheck.schema.ts
   │  └─ line 1: TODO use fastify with zod type provider
   └─ dashboard.view.tsx
      └─ line 31: NOTE future enhancement download overview report ?

```
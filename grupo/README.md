# Serviço de Usuário e Autenticação em NestJS

**Descrição do Projeto**
Serviço de Usuário e Autenticação desenvolvido com **NestJS**, estruturado de forma modular e orientado aos princípios da disciplina de Computação Orientada a Serviços (COS).
Foco na clareza conceitual, separação de camadas e aplicação de boas práticas REST, aproveitando recursos modernos do ecossistema Node.js com TypeScript.

---

## Conceitos Aplicados

### Computação Orientada a Serviços (SOC)

* **Serviços Modulares e Reutilizáveis**
* **Fraco Acoplamento**
* **Independência de Plataforma**
* **Autodescrição**

### Arquitetura Orientada a Serviços (SOA)

* **Serviços Encapsulados**
* **Contratos de Serviço**
* **Interfaces Separadas da Implementação**

### Fundamentos de Sistemas Distribuídos

* **Arquitetura Cliente-Servidor**
* **Sem Estado (Stateless)**

### Web Services e REST

* **APIs RESTful seguindo princípios HTTP**
* **Interface Uniforme**: GET, POST, PUT, DELETE
* **Padrões de Códigos HTTP**
* **HATEOAS (quando aplicável)**
* **Armazenáveis em Cache (Cacheable)**

### Contêineres e Deploy

* **Empacotamento com Docker**
* **Execução Leve e Portável**

---

## Tecnologias Utilizadas

* **NestJS** (Node.js + TypeScript)
* **HTTP/HTTPS** via Express (ou Fastify)
* **JWT (JSON Web Token)** para autenticação
* **Swagger (OpenAPI)** para documentação da API
* **Redis** para cache (opcional)
* **SQLite** (via Prisma) como banco de dados
* **PlantUML** para diagramas arquiteturais

---

## 📁 Estrutura do Projeto

```bash
.
├── src/
│   ├── autenticacao/            # Módulo de autenticação (JWT, Guards, Estratégias)
│   ├── grupo/                   # Módulo de grupos e regras de negócio
│   │   ├── grupo.controller.ts  # Controlador do grupo (rotas HTTP + Swagger)
│   │   ├── grupo.dto.ts         # DTOs usados pelo grupo
│   │   ├── grupo.module.ts      # Módulo NestJS para agrupar dependências do grupo
│   │   ├── grupo.service.ts     # Serviço com regras de negócio do grupo
│   │   ├── grupo.swagger.ts     # Documentação Swagger específica do grupo
│   ├── swagger/                 # Pasta central de documentação Swagger
│   │   └── dto/                 # DTOs compartilhados para Swagger (erros, respostas genéricas etc.)
│   ├── prisma/                  # Serviço para conectar e configurar Prisma Client
│   └── main.ts                  # Ponto de entrada da aplicação NestJS
├── prisma/                      # Migrations e schema do Prisma
│   └── schema.prisma            # Definição do banco de dados
├── .env.example                 # Exemplo de variáveis de ambiente
├── Dockerfile                   # Dockerfile da aplicação NestJS
├── package.json                 # Dependências e scripts do projeto
└── README.md                    # Documentação principal do projeto

```

---

## 🚀 Como Executar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` com base no `.env.example`.

3. Gere o cliente do Prisma e migre o banco:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Inicie a aplicação:

```bash
npm run start:dev
```

> A aplicação estará disponível em `http://localhost:1411`

---

### 🐳 Executando com Docker

1. Crie o arquivo `.env` com base no `.env.example`.

2. Construa a imagem:

```bash
docker build -t grupo-nestjs .
```

3. Rode o contêiner:

```bash
docker run -it --rm -p 1411:1411 grupo-nestjs
```

> Acesse via `http://localhost:1411`.

---

## 📚 Documentação da API

Acesse via Swagger:

```
http://localhost:1411/docs
```

---

## 📖 Fontes e Referências

* Materiais da disciplina **Computação Orientada a Serviços – UFAL**
* [NestJS - https://nestjs.com](https://nestjs.com)
* [Prisma ORM - https://www.prisma.io](https://www.prisma.io)

# 🧭 API Gateway em Go

**Descrição do Projeto**
Este projeto implementa um **API Gateway** desenvolvido em **Go (Golang)** com foco em **composição de serviços**, conforme os princípios da **Computação Orientada a Serviços (COS)**. O Gateway atua como ponto único de entrada, com as responsabilidades principais de **rotear requisições**, **proteger com JWT** e **agregar dados de múltiplos serviços distribuídos**.

---

## 🧩 Padrões Aplicados

### 🔁 **Proxy / Adapter**

Encaminha requisições para serviços específicos, adaptando se necessário a estrutura ou autenticação exigida pelo serviço final.

### 🧷 **Aggregator**

Em determinadas rotas, agrega dados de múltiplos serviços (ex: usuário e grupo) para responder com uma estrutura única ao cliente, reduzindo a complexidade no front-end.

---

## 📌 Responsabilidades do API Gateway

- ~~Centralizar o acesso a múltiplos microsserviços~~  
* Encaminhar requisições com autenticação JWT válida
* Executar composições simples (Aggregator) ou redirecionamentos diretos (Proxy)  
- ~~Expor um ponto único de documentação via Swagger/OpenAPI~~  
- ~~Reduzir o acoplamento entre cliente e os serviços internos~~


> **Importante**: Este gateway não implementa regras de negócio, persistência de dados ou transformações complexas. Toda lógica de domínio permanece nos serviços especializados.

---

## 🧰 Tecnologias Utilizadas

* **Go (Golang)** – linguagem principal
* **Chi** – roteador HTTP leve e modular
* **JWT (JSON Web Token)** – autenticação de acesso
* **Swaggo + Swagger UI** – documentação automática das rotas
* **godotenv** – carregamento de variáveis de ambiente
* **net/http/httputil** – proxy reverso embutido
* **Docker** – empacotamento e execução da aplicação

---

## 📁 Estrutura do Projeto

```bash
api-gateway/
├── cmd/api_gateway/          # Ponto de entrada principal (main.go)
├── internal/
│   ├── config/               # Configuração do ambiente
│   ├── dto/                  # Definições de entrada e saída
│   ├── handler/              # Handlers HTTP
│   ├── middleware/           # Autenticação, logs, etc.
│   ├── proxy/                # Redirecionamento HTTP
│   ├── routes/               # Registro das rotas
│   └── service/              # Agregações específicas
├── .env.exemple              # Exemplo de variáveis de ambiente
├── Dockerfile                # Empacotamento com Docker
├── go.mod                    # Módulo e dependências do Go
└── README.md                 # Este documento
```

---

## 🚀 Execução Local

1. Clone o projeto:

```bash
git clone https://github.com/Lothriiik/Trabalho-Servicos-COS.git
cd api-gateway
```

2. Configure seu `.env` com base no `.env.exemple`.

3. Gere a documentação com:

```bash
swag init -g cmd/api_gateway/main.go
```

4. Execute a aplicação localmente:

```bash
go run ./cmd/api_gateway
```

* Gateway disponível em: `http://localhost:8080`
* Swagger UI: `http://localhost:8080/docs`

---

## 🐳 Execução com Docker

```bash
docker build -t api-gateway .
docker run -it --rm -p 8080:8080 --env-file .env api-gateway
```

---

## 📚 Referências Didáticas

* Apostila da disciplina **Computação Orientada a Serviços** – Prof. Tércio de Morais – UFAL
* [Documentação oficial do Go](https://golang.org)
* [Documentação do Swaggo](https://github.com/swaggo/swag)


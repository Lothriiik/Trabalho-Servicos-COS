# 🧭 NGINX (Proxy Reverso + Encaminhamento)

Este projeto implementa uma arquitetura de microsserviços com **NGINX** como **proxy reverso e balanceador de carga**. A estrutura busca simplicidade, desempenho e flexibilidade na orquestração de serviços.

---

## ⚠️ Pré-requisitos

* É **obrigatório iniciar previamente os serviços de Usuário, Grupo e API Gateway** antes de subir o container do NGINX, pois ele depende da resolução de nome via Docker para encaminhar corretamente as requisições.
* Certifique-se de que as **imagens Docker de cada serviço já estejam criadas**. As instruções de build estão disponíveis nas pastas específicas de cada serviço (`/usuario`, `/grupo` e `/api_gateway`).

---

## 🌐 Criação da rede Docker

```bash
docker network create servicos-cos-net
```

---

## 🚀 Subindo os containers

### 1. Serviço de Usuário (PHP)

```bash
docker run --rm --name usuario-svc --network servicos-cos-net -p 1410:1410 usuario-autenticacao-php
```

### 2. Serviço de Grupo (NestJS)

```bash
docker run --rm --name grupo-svc --network servicos-cos-net -p 1411:1411 grupo-nestjs
```

### 3. API Gateway (Go)

```bash
docker run --rm --name gateway-svc --network servicos-cos-net -p 8080:8080 api-gateway
```

### 4. Front End (React)

```bash
docker run --rm --name front-svc --network servicos-cos-net front-end-react
```

### 5. NGINX (porta pública 8000)

```bash
cd nginx
docker rm -f nginx-gateway 2>/dev/null
docker run --name nginx-gateway --network servicos-cos-net -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -p 8000:80 nginx:alpine
```

---

## 🔎 Endpoints

| Camada         | Endereço                                                                 | Função                         |
| -------------- | ------------------------------------------------------------------------ | ------------------------------ |
| NGINX Gateway  | [http://localhost:8000](http://localhost:8000)                           | Entrada pública do sistema     |
| API Gateway Go | [http://localhost:8000/docs](http://localhost:8000/docs)                 | Proxy e agregador de serviços  |
| Usuário        | [http://localhost:8000/usuario/docs](http://localhost:8000/usuario/docs) | Serviço de usuários e autenticação        |
| Grupo          | [http://localhost:8000/grupo/docs](http://localhost:8000/grupo/docs)     | Serviço de grupos e permissões |

---

## 💬 Observações

* O **NGINX** atua como **proxy reverso e balanceador de carga**, expondo a aplicação externamente e encaminhando requisições diretamente para os serviços, quando não há necessidade de lógica no Gateway.
* Foi decidido utilizar o **NGINX como frontal principal**, pois **cerca de 90% das requisições não exigem agregação ou lógica adicional**. Assim, evita-se o roteamento desnecessário via Go, o que **melhora o desempenho e reduz a complexidade**.
* Embora fosse possível centralizar tudo via o Gateway em Go, essa abordagem exigiria **recriar a lógica de redirecionamento, lidar com documentação duplicada** e ainda **pioraria o desempenho geral**, pois todas as requisições passariam pela aplicação Go.
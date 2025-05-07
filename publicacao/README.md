# Serviço de Publicações com FastAPI

**Descrição do Projeto**
Serviço de Publicações desenvolvido com **FastAPI**, estruturado de forma clara e concisa, orientado aos princípios da disciplina de Computação Orientada a Serviços (COS).
Foco na simplicidade, boas práticas REST e uso de autenticação via JWT, com tecnologias modernas do ecossistema Python.

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

* **FastAPI** (Python)
* **Uvicorn** como servidor ASGI
* **JWT (JSON Web Token)** para autenticação
* **dotenv** para variáveis de ambiente
* **Swagger** (OpenAPI) e **ReDoc** para documentação da API
* **SQLite** (via SQLAlchemy ou outro ORM)
* **PlantUML** para diagramas arquiteturais (opcional)

---

## 📁 Estrutura do Projeto

```bash
.
├── main.py              # Ponto de entrada da aplicação FastAPI
├── .env.example         # Exemplo de variáveis de ambiente
├── requirements.txt     # Dependências do projeto
├── Dockerfile           # Dockerfile para empacotamento
└── README.md            # Documentação principal do projeto
```

---

## 🚀 Como Executar Localmente

1. Crie o ambiente virtual:

```bash
python -m venv venv
```

2. Ative o ambiente virtual:

* Windows:

```bash
venv\Scripts\activate
```

* Linux/Mac:

```bash
source venv/bin/activate
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Crie o arquivo `.env` com base no `.env.example`.

5. Inicie a aplicação:

```bash
uvicorn main:app --reload --port 1412
```

> A aplicação estará disponível em `http://localhost:1412`

---

### 🐳 Executando com Docker

1. Crie o arquivo `.env` com base no `.env.example`.

2. Construa a imagem:

```bash
docker build -t publicacao-fastapi .
```

3. Rode o contêiner:

```bash
docker run -it --rm -p 1412:1412 publicacao-fastapi
```

> Acesse via `http://localhost:1412`.

---

## 📚 Documentação da API

Acesse via:

* Swagger UI: `http://localhost:1412/docs`
* ReDoc: `http://localhost:1412/redoc`

---

## 📖 Fontes e Referências

* Materiais da disciplina **Computação Orientada a Serviços – UFAL**
* [FastAPI - https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)

# Serviço de Usuário e Autenticação em PHP

**Descrição do Projeto**  
Serviço de Usuário e Autenticação em PHP: solução simples, minimalista e com poucas dependências, desenvolvida para a disciplina de Computação Orientada a Serviços (COS).  
A proposta traz uma abordagem pura e essencial, focada na aplicação dos fundamentos teóricos da disciplina, **evitando o uso de frameworks** ou bibliotecas que possam inibir o processo de ensino-aprendizagem.

---

## Conceitos Aplicados

### Computação Orientada a Serviços (SOC)

- **Serviços Modulares e Reutilizáveis**
- **Fraco Acoplamento**
- **Independência de Plataforma**
- **Autodescrição**

### Arquitetura Orientada a Serviços (SOA)

- **Serviços Encapsulados**
- **Contratos de Serviço**
- **Interfaces Separadas da Implementação**

### Fundamentos de Sistemas Distribuídos

- **Arquitetura Cliente-Servidor**
- **Sem Estado (Stateless)**

### Web Services e REST

- **APIs RESTful seguindo princípios HTTP**
- **Interface Uniforme**: GET, POST, PUT, DELETE
- **Padrões de Códigos HTTP**
- **HATEOAS (quando aplicável)**
- **Armazenáveis em Cache (Cacheable)**

### Contêineres e Deploy

- **Empacotamento Opcional com Docker**
- **Execução Leve e Portável**

---

## Tecnologias Utilizadas

- **PHP Puro** (recomendado PHP 8+)
- **HTTP/HTTPS** para comunicação
- **JSON** como formato de troca de dados
- **JWT (JSON Web Token)** para autenticação
- **Swagger (OpenAPI)** para documentação da API
- **PlantUML** para criação de diagramas de arquitetura
- **Redis** para gerenciamento de cache
- **SQLite** como banco de dados para persistência

---

## 📁 Estrutura do Projeto

```bash
.
├── controllers/    # Intermediador entre Services, Dtos e Daos
├── core/           # Camada base: Router, DAO, exceptions, JWT, UUID, Swagger
├── daos/           # Acesso direto ao banco (queries)
├── dtos/           # Data Transfer Objects (validação e estrutura dos dados)
├── docs/           # Swagger UI e arquivos OpenAPI
├── migrations/     # Scripts de criação de tabelas
├── services/       # Regras de negócio (autenticação, cadastro)
├── swaggers/       # Fragments ou YAMLs adicionais para documentação
├── index.php       # Entrada da aplicação (roteamento)
├── composer.json   # Gerenciador de dependências
└── .env.example    # Exemplo de configuração do ambiente
````

---

## 🚀 Como Executar Localmente

1. Instale as dependências:

   ```bash
   composer install
   ```

2. Crie um arquivo `.env` com base no `.env.example`.

3. Rode o servidor embutido do PHP:

   ```bash
   php -S localhost:1410 -t usuario_autenticacao
   ```

### 🐳 Executando com Docker

Caso prefira rodar via contêiner Docker, siga os passos abaixo:

1. Acesse o diretório do projeto:

   ```bash
   cd usuario_autenticacao
   ```
2. Crie um arquivo `.env` com base no `.env.example`.

3. Construa a imagem Docker:

   ```bash
   docker build -t usuario-autenticacao-php .
   ```

4. Execute o contêiner:

   ```bash
   docker run -it --rm -p 1410:1410 usuario-autenticacao-php
   ```

> O serviço estará disponível em `http://localhost:1410`.


## 📚 Documentação da API

Acesse a documentação Swagger em:

```
http://localhost:1410/docs
```

---

## 📖 Fontes e Referências

* Materiais da disciplina **Computação Orientada a Serviços – UFAL**
* RFC 7519 – JSON Web Token (JWT)
* [https://swagger.io/specification/](https://swagger.io/specification/)

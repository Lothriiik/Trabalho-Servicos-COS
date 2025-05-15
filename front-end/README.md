# front-end

Aplicação React usando [Vite](https://vitejs.dev/) como bundler para desenvolvimento rápido e moderno.

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 🔧 Instalação e execução

1. Acesse a pasta do projeto:

   ```bash
   cd front-end
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

   > O Vite indicará a porta exata no terminal. Pode variar se a 5173 estiver ocupada.

---

## 📦 Scripts disponíveis

* `npm run dev` – Inicia o servidor de desenvolvimento.
* `npm run build` – Gera a versão de produção.
* `npm run preview` – Pré-visualiza o build localmente.
* `npm run lint` – Executa o linter (ESLint).

---

### 🐳 Executando com Docker

Caso prefira rodar via contêiner Docker, siga os passos abaixo:

1. Acesse o diretório do projeto:

   ```bash
   cd front-end
   ```

2. Construa a imagem Docker:

   ```bash
   docker build -t front-end-react .
   ```

4. Execute o contêiner:

   ```bash
   docker run -it --rm -p 8080:80 front-end-react
   ```

> O serviço estará disponível em `http://localhost:8080`.

## 🧪 Tecnologias usadas

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Ant Design](https://ant.design/)
* [Axios](https://axios-http.com/)
* [React Router DOM](https://reactrouter.com/)
* [ESLint](https://eslint.org/)

---
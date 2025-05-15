# Etapa 1: Build
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação e faz o build
COPY . .
RUN npm run build

# Etapa 2: Servidor web para produção (nginx)
FROM nginx:stable-alpine AS production

# Remove a configuração default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia uma configuração mínima do Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do nginx
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]
    
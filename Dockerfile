# 1. Imagem base
FROM node:18-alpine

# 2. Definir o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# 4. Instalar as dependências
RUN npm install

# 5. Copiar o restante dos arquivos da aplicação para o container
COPY . .

# 6. Compilar o TypeScript
RUN npm run build

# 7. Definir a variável de ambiente para rodar o servidor
ENV NODE_ENV production

# 8. Expor a porta que a aplicação vai usar
EXPOSE 5000

# 9. Rodar a aplicação
CMD ["npm", "start"]

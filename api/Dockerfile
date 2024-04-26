FROM node:14
WORKDIR /app
COPY ./api/package*.json ./
RUN npm install
COPY ./api ./
EXPOSE 4000
CMD ["node", "index.js"]

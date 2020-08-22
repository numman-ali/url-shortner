FROM node:12-alpine

WORKDIR /app/src/client

COPY src/client/package*.json ./
RUN npm install

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:all

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

FROM node:12-alpine

WORKDIR /app
RUN mkdir -p src/client
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:all

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

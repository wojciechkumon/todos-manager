FROM node:18.19.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

COPY . .
COPY .env.docker-compose .env
RUN npm ci && npm run build

CMD ["node", "dist/main"]

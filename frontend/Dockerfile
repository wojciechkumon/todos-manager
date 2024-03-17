FROM node:18.19.1-alpine3.18 as build

WORKDIR /app
COPY . /app
RUN npm ci && npm run build


FROM nginx:1.25.4-alpine as deployment

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

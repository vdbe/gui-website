FROM node:latest AS build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine AS nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/gui-website /usr/share/nginx/html

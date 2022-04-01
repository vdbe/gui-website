FROM node:latest as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build-stage /app/dist/gui-website /usr/share/nginx/html
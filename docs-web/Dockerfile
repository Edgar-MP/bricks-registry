# Build context = raíz del monorepo (bricks-registry): docs-web/scripts/assemble.mjs
# lee ../blocks/ y ../registry.json relativos a docs-web/, así que copiar solo
# la carpeta docs-web/ rompería el assemble (ver docs-web/README.md).
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
WORKDIR /app/docs-web
RUN npm ci
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/docs-web/dist /usr/share/nginx/html
COPY docs-web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

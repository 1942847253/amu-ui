FROM node:22-bookworm-slim AS builder

WORKDIR /app

RUN corepack enable

COPY package.json ./
RUN pnpm install --no-frozen-lockfile

COPY . .

ENV VITE_USE_WORKSPACE_SOURCE=false

RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm AS builder

WORKDIR /app

RUN corepack enable

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
COPY prisma ./prisma
COPY src ./src

RUN pnpm install --no-frozen-lockfile
RUN pnpm db:generate
RUN pnpm build

FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm AS runtime

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:migrate && pnpm db:seed && node dist/main.js"]

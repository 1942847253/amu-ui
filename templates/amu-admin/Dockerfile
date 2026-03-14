FROM node:22-bookworm-slim AS builder

ARG APP_BASE_PATH=/

WORKDIR /app

RUN corepack enable

COPY package.json ./
RUN pnpm install --no-frozen-lockfile

COPY . .

ENV VITE_APP_BASE_PATH=$APP_BASE_PATH
ENV VITE_USE_WORKSPACE_SOURCE=false

RUN pnpm build

FROM nginx:1.27-alpine AS runtime

ARG APP_BASE_PATH=/

ENV APP_BASE_PATH=$APP_BASE_PATH

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=builder /app/dist /tmp/dist

RUN chmod +x /docker-entrypoint.sh \
	&& set -eux; \
	if [ "$APP_BASE_PATH" = "/" ]; then \
		target="/usr/share/nginx/html"; \
	else \
		normalized="$(printf '%s' "$APP_BASE_PATH" | sed 's#^/*##; s#/*$##')"; \
		target="/usr/share/nginx/html/$normalized"; \
		mkdir -p "$target"; \
	fi; \
	cp -r /tmp/dist/. "$target"/; \
	rm -rf /tmp/dist

EXPOSE 80

CMD ["/docker-entrypoint.sh"]

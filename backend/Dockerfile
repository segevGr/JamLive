FROM node:20.10.0-alpine3.19 AS base

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci --ignore-scripts

COPY nest-cli.json tsconfig.build.json tsconfig.json jest.config.js eslint.config.mjs ./
COPY src ./src

######################################

FROM base AS linter
RUN npm run lint -- --cache --cache-location .eslintcache

######################################

FROM base AS unit-tests
COPY test ./test
RUN npm test

######################################

FROM base AS builder
COPY public ./public
RUN npm run build

######################################

FROM node:20.10.0-alpine3.19 AS runner

RUN addgroup -S appuser && adduser -S appuser -G appuser
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

RUN npm prune --omit=dev

RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8000
ENTRYPOINT ["node", "dist/main"]
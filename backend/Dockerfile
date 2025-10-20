FROM node:20.10.0-alpine3.19 AS builder

ENV BUILDKIT_INLINE_CACHE=1

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY nest-cli.json tsconfig.build.json tsconfig.json jest.config.js ./
COPY src ./src
COPY public ./public

RUN npm run build

######################################

FROM builder AS unit-tests
RUN npm test

######################################

FROM node:20.10.0-alpine3.19 AS runner

RUN addgroup -S appuser && adduser -S appuser -G appuser
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --from=builder --chown=appuser:appuser /app/public ./public

RUN npm prune --omit=dev

USER appuser

EXPOSE 8000
ENTRYPOINT ["node", "dist/main"]
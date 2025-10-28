FROM node:20.10.0-alpine3.19 AS base

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci --ignore-scripts

COPY tsconfig.json tailwind.config.js postcss.config.js ./
COPY src ./src

######################################

FROM base AS linter
RUN npm run lint -- --cache --cache-location .eslintcache

######################################

FROM base AS unit-tests
RUN npm test

######################################

FROM base AS builder
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
COPY public ./public
RUN npm run build

######################################

FROM node:20.10.0-alpine3.19 AS runner

RUN addgroup -S appuser && adduser -S appuser -G appuser
WORKDIR /app

RUN npm install -g serve@14.2.1

COPY --from=builder --chown=appuser:appuser /app/build ./build
USER appuser

EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
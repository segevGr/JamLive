FROM node:20.10.0-alpine3.19 AS builder

WORKDIR /app

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci

COPY tsconfig.json tailwind.config.js postcss.config.js ./
COPY public ./public
COPY src ./src

RUN npm run lint

RUN npm run build

######################################

FROM builder AS unit-tests
RUN npm test

######################################

FROM node:20.10.0-alpine3.19 AS runner

RUN addgroup -S appuser && adduser -S appuser -G appuser
WORKDIR /app

RUN npm install -g serve@14.2.1

COPY --from=builder --chown=appuser:appuser /app/build ./build
USER appuser

EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
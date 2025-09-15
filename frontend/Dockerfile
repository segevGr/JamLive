FROM node:20.10.0-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm install -g serve
CMD ["sh", "-c", "npm run build && serve -s build -l 3000"]
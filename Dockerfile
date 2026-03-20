# BUILD
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

#RUN

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/main.js"]
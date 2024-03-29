ARG NODE_VERSION=20

###################
# Dev stage
###################
FROM node:${NODE_VERSION}-alpine AS dev

RUN apk add --no-cache tini

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY tsconfig.json tsconfig.build.json ./
COPY src src
COPY prisma prisma

RUN pnpm generate:prisma

EXPOSE 3000

CMD ["/sbin/tini", "--", "pnpm", "start:dev"]

###################
# Build stage
###################
FROM node:${NODE_VERSION}-alpine AS build

# Setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

WORKDIR /app

COPY tsconfig.json tsconfig.build.json package.json ./

COPY src src
COPY prisma prisma

RUN pnpm run generate:prisma

RUN pnpm run build

RUN pnpm prune --prod --config.ignore-scripts=true

###################
# Release stage
###################
FROM node:${NODE_VERSION}-alpine AS release

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

RUN chown -R node:node /app

USER node

CMD ["/sbin/tini", "--", "node", "dist/main.js"]

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

RUN --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

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

RUN --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

WORKDIR /app

COPY tsconfig.json tsconfig.build.json package.json ./

COPY src src
COPY prisma prisma

RUN pnpm run generate:prisma

RUN pnpm run build

RUN --mount=type=cache,target=/pnpm/store \
    pnpm prune --prod --config.ignore-scripts=true

###################
# Release stage
###################
FROM node:${NODE_VERSION}-alpine AS release

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules

USER node

CMD ["/sbin/tini", "--", "node", "dist/main.js"]

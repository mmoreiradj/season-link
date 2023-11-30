FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tini

RUN npm i -g json-server

RUN addgroup -S json-server && adduser -S json-server -G json-server

RUN chown -R json-server:json-server /app

USER json-server

CMD ["/sbin/tini", "--", "npx", "json-server", "data/server.json", "--host", "0.0.0.0"]

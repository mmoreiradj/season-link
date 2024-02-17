FROM golang:1.22-alpine3.19 AS develop

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

FROM golang:1.22-alpine3.19 AS build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o /recommendations

FROM alpine:3.19 AS production

WORKDIR /app

RUN apk add --no-cache ca-certificates

RUN adduser -D recommendations

COPY --from=build --chown=recommendations:recommendations /recommendations /app/recommendations

USER recommendations

CMD ["/app/recommendations"]

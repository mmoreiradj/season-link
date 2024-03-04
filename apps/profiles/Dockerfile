FROM rust:1.74-alpine as builder

RUN apk update && apk add openssl-dev && apk add musl-dev

# TODO some form of cache lmao
COPY ./src /build/src
COPY ./Cargo.* /build

WORKDIR /build

RUN cargo fetch
ENV RUSTFLAGS="-Ctarget-feature=-crt-static"
RUN cargo build


FROM alpine:3.19 as runner

# TLS support, libgcc for musl dynamic linking
RUN apk update && apk add openssl ca-certificates && apk add libgcc && apk upgrade

# COPY only the executable
COPY --from=builder /build/target/debug/season-link-profiles /opt


# non root user
RUN adduser -D rust
RUN chown -R rust:rust /opt

USER rust


CMD [ "/opt/season-link-profiles" ]
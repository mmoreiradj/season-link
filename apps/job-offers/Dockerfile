# Build stage
FROM alpine:3.18 AS build

RUN apk add --no-cache openjdk17

WORKDIR /app

COPY src src
COPY gradle gradle
COPY settings.gradle build.gradle gradlew ./

RUN --mount=type=cache,target=/root/.gradle ./gradlew bootJar -x test --no-daemon

# Run stage
FROM alpine:3.18 AS run

RUN apk add --no-cache openjdk17-jre

WORKDIR /app

COPY --from=build /app/build/libs/*-SNAPSHOT.jar ./app.jar

ENTRYPOINT ["java", "-jar", "./app.jar"]

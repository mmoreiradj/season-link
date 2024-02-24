FROM eclipse-temurin:17-jdk-alpine AS base

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw clean install -DskipTests

COPY src ./src

FROM base AS build

RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS prod

WORKDIR /app

COPY --from=build /app/target/quarkus-app ./

EXPOSE 8080

CMD ["java", "-jar", "quarkus-run.jar", "-Dquarkus.http.host=0.0.0.0"]

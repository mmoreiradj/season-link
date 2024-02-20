FROM eclipse-temurin:17-jdk-alpine AS base

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src ./src

FROM base AS build

RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine AS prod

WORKDIR /app

COPY --from=build /app/target/*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

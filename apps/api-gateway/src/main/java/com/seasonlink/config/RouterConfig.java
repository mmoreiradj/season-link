package com.seasonlink.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouterConfig {

    private final UriConfig uriConfig;

    @Bean
    public RouteLocator routesLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(predicate -> predicate
                        .path("/jobs/**")
                        .uri("http://localhost:3000/"))
                .route(predicate -> predicate
                        .path("/companies/**")
                        .uri("http://localhost:3000/"))
                .build();
    }
}

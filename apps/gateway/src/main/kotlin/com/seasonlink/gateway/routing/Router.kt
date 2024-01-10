package com.seasonlink.gateway.routing

import com.seasonlink.gateway.config.UriConfig
import org.springframework.cloud.gateway.route.RouteLocator
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component

@Component
class Router(private val uriConfig: UriConfig) {

    @Bean
    fun gatewayRouter(builder: RouteLocatorBuilder): RouteLocator {
        return builder.routes()
            .route { r ->
                r
                    .path("/job-offers/**")
                    .uri(uriConfig.jobOffers)
            }
            .route{r ->
                r
                    .path("/applications/**")
                    .uri(uriConfig.jobOffers)
            }
            .route { r ->
                r
                    .path("/jobs/**")
                    .or()
                    .path("/job-categories/**")
                    .uri(uriConfig.jobs)
            }
            .route { r ->
                r
                    .path("/companies/**")
                    .uri(uriConfig.companies)
            }
            .route { r ->
                r
                    .path("/profiles/**")
                    .uri(uriConfig.profiles)
            }
            .route { r ->
                r
                    .path("/ratings/**")
                    .uri(uriConfig.ratings)
            }
            .route { r ->
                r
                    .path("/notifications/**")
                    .uri(uriConfig.notifications)
            }
            .build()
    }
}

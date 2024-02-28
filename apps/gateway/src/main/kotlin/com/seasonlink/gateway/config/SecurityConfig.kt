package com.seasonlink.gateway.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain

@Configuration
@EnableWebFluxSecurity
class SecurityConfig {

    /**
     * Configures the security of the application.
     * All requests to the actuator endpoints are permitted.
     * All other requests are authenticated.
     *
     * @param http the [ServerHttpSecurity] to configure
     * @return the [SecurityWebFilterChain] to use
     */
    @Bean
    fun resourceServerFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain = http
        .authorizeExchange { exchanges ->
            exchanges
                .pathMatchers("/actuator/**")
                .permitAll()
                .pathMatchers(HttpMethod.POST, "/profiles/user")
                .permitAll()
                .anyExchange()
                .authenticated()
        }
        .csrf { csrf -> csrf.disable() }
        .oauth2ResourceServer { oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()) }
        .build()
}

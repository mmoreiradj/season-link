package com.seasonlink.gateway.config

import org.springframework.boot.context.properties.ConfigurationProperties

/**
 * Configuration properties for the URIs of the services.
 * The URIs are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "seasonlink.services")
data class UriConfig(
    val jobs: String,
    val jobOffers: String,
    val companies: String,
    val profiles: String,
    val ratings: String,
    val notifications: String,
    val chat: String,
)

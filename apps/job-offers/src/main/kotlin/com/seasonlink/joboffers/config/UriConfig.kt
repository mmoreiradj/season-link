package com.seasonlink.joboffers.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "seasonlink.services")
data class UriConfig(
    val jobs: String,
    val companies: String,
)

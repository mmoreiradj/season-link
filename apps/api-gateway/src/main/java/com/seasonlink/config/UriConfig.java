package com.seasonlink.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "seasonlink.services")
public class UriConfig {
    private String jobs;
    private String jobOffers;
    private String companies;
    private String applications;
    private String profiles;
    private String ratings;
    private String messagery;
    private String notifications;
}

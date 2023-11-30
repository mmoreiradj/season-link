package com.seasonlink.joboffers

import com.seasonlink.joboffers.config.UriConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(UriConfig::class)
class JobOffersApplication

fun main(args: Array<String>) {
    runApplication<JobOffersApplication>(*args)
}

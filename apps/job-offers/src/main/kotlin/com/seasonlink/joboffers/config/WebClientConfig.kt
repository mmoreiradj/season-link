package com.seasonlink.joboffers.config

import com.seasonlink.joboffers.service.CompanyService
import com.seasonlink.joboffers.service.JobService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.support.WebClientAdapter
import org.springframework.web.service.invoker.HttpServiceProxyFactory

@Configuration
class WebClientConfig(
    private val environment: Environment,
    private val uriConfig: UriConfig
) {

    @Bean
    fun jobService(): JobService {
        val client = WebClient
            .builder()
            .baseUrl(uriConfig.jobs)
            .build()

        val factory = HttpServiceProxyFactory
            .builder(WebClientAdapter.forClient(client))
            .build()

        return factory.createClient(JobService::class.java)
    }

    @Bean
    fun companyService(): CompanyService {
        val client = WebClient
            .builder()
            .baseUrl(uriConfig.companies)
            .build()

        val factory = HttpServiceProxyFactory
            .builder(WebClientAdapter.forClient(client))
            .build()

        return factory.createClient(CompanyService::class.java)
    }
}

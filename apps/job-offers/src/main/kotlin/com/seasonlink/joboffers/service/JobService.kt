package com.seasonlink.joboffers.service

import org.springframework.boot.autoconfigure.batch.BatchProperties.Job
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.service.annotation.GetExchange
import reactor.core.publisher.Mono
import java.util.UUID

interface JobService {

    @GetExchange("/jobs/{id}")
    fun getById(@PathVariable id: UUID): Mono<Job>
}
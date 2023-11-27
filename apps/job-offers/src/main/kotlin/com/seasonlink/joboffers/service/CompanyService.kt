package com.seasonlink.joboffers.service

import com.seasonlink.joboffers.model.Company
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.service.annotation.GetExchange
import reactor.core.publisher.Mono
import java.util.UUID

interface CompanyService {

    @GetExchange("/companies/{id}")
    fun getById(@PathVariable id: UUID): Mono<Company>
}

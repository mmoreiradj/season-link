package com.seasonlink.joboffers.repository

import com.seasonlink.joboffers.model.Advantage
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import java.util.*

interface AdvantageRepository: ReactiveCrudRepository<Advantage, UUID> {

    @Query("""
        SELECT * FROM advantage
        WHERE job_offer_id = :jobOfferId
    """)
    fun findAllByJobOfferId(jobOfferId: UUID): Flux<Advantage>
}

package com.seasonlink.joboffers.repository

import com.seasonlink.joboffers.model.Application
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import java.util.*

interface ApplicationRepository: ReactiveCrudRepository<Application, UUID> {

    @Query("""
        SELECT * FROM application
        WHERE candidate_id = :candidateId
    """)
    fun findAllByCandidateId(candidateId: UUID): Flux<Application>
}

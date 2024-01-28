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

    @Query("""
        SELECT a.*
        FROM application a
        JOIN job_offer jo ON a.job_offer_id = jo.id
        WHERE a.candidate_id = :candidateId
          AND jo.company_id = :companyId
    """)
    fun findAllByCandidateIdAndCompanyId(candidateId: UUID, companyId: UUID): Flux<Application>
}

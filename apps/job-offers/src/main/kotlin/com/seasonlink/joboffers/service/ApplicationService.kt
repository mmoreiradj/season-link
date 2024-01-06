package com.seasonlink.joboffers.service

import com.seasonlink.joboffers.model.Application
import com.seasonlink.joboffers.model.ApplicationState
import com.seasonlink.joboffers.repository.ApplicationRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@Service
class ApplicationService(
    private val applicationRepository: ApplicationRepository
) {

    fun create(application: Application): Mono<Application> = applicationRepository.save(application)

    fun findByCandidateId(candidateId: UUID): Flux<Application> = applicationRepository.findAllByCandidateId(candidateId)

    fun updateState(applicationId: UUID, state: ApplicationState): Mono<Application> =
        applicationRepository.findById(applicationId)
            .flatMap { application ->
                applicationRepository.save(
                    application.copy(
                        state = state,
                        updatedAt = null
                    )
                )
            }
            .switchIfEmpty(
                Mono.error(
                    ResponseStatusException(HttpStatus.NOT_FOUND, "Company does not exist")
                )
            )

    fun findById(applicationId: UUID): Mono<Application> =
        applicationRepository.findById(applicationId)
            .switchIfEmpty(
                Mono.error(
                    ResponseStatusException(HttpStatus.NOT_FOUND, "Application does not exist")
                )
            )
}
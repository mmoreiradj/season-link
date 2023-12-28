package com.seasonlink.joboffers.controller

import com.seasonlink.joboffers.dto.UpdateApplicationDto
import com.seasonlink.joboffers.model.Application
import com.seasonlink.joboffers.model.ApplicationState
import com.seasonlink.joboffers.service.ApplicationService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@RestController
@RequestMapping
class ApplicationController(
    private val applicationService: ApplicationService
) {

    @PostMapping("/job-offers/{jobOfferId}/applications")
    fun create(
        @RequestHeader("X-User-Id") candidateId: UUID,
        @PathVariable("jobOfferId") jobOfferId: UUID
    ): Mono<Application> = applicationService.create(
        Application (
            id = null,
            state = ApplicationState.PENDING,
            jobOfferId = jobOfferId,
            candidateId = candidateId,
            createdAt = null,
            updatedAt = null
        )
    )

    @GetMapping("/applications/{applicationId}")
    fun findApplication(
        @PathVariable("applicationId") applicationId: UUID,
        @RequestHeader("X-User-Id") userId: UUID,
        @RequestHeader("X-User-Role") candidateRole: String,
    ) = applicationService
        .findById(applicationId)
        .doOnNext { application ->
            if (candidateRole == "admin" || application.candidateId == userId) {
                return@doOnNext
            } else if (application.candidateId == userId) {
                return@doOnNext
            } else {
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }
        }

    @PostMapping("/applications")
    fun findByCandidateIdOrCompanyId(
        @RequestHeader("X-User-Id") candidateId: UUID,
        @RequestHeader("X-User-Role") role: String
    ): Flux<Application> =
        when (role) {
            "candidate" -> {
                applicationService.findByCandidateId(candidateId)
            }
            "recruiter" -> {
                TODO()
            }
            "admin" -> {
                TODO()
            }

            else -> {
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }
        }


    /**
     * Only recruiters can update the state of an application
     */
    @PutMapping("/applications/{applicationId}/state")
    fun updateState(
        @PathVariable("applicationId") applicationId: UUID,
        @RequestHeader("X-User-Id") candidateId: UUID,
        @RequestHeader("X-User-Role") role: String,
        @Valid @RequestBody updateApplicationDto: UpdateApplicationDto
    ): Mono<Application> =
        if (role == "recruiter") {
            applicationService
                .updateState(
                    applicationId,
                    updateApplicationDto.state
                )
                .doOnError {
                    throw ResponseStatusException(HttpStatus.NOT_FOUND, "Application does not exit")
                }
        } else {
            Mono.error(
                ResponseStatusException(HttpStatus.FORBIDDEN, "Only recruiters can update the state of an application")
            )
        }
}

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

    @GetMapping("/applications/search")
    fun searchApplications(
        @RequestParam candidateId: UUID,
        @RequestParam companyId: UUID
    ): Flux<Application> = applicationService.search(
        candidateId,
        companyId
    )

    @GetMapping("/applications/{applicationId}")
    fun findApplication(
        @PathVariable("applicationId") applicationId: UUID,
        @RequestHeader("X-User-Id") userId: UUID,
        @RequestHeader("X-User-Roles") candidateRole: String,
    ) = applicationService
        .findById(applicationId)
        .doOnNext { application ->
            if (candidateRole == "admin" || application.candidateId == userId) {
                return@doOnNext
            } else if (application.candidateId == userId) {
                return@doOnNext
            } else if (candidateRole == "client_recruiter") {
                // TODO: check if the recruiter is the owner of the job offer
                return@doOnNext
            } else {
                throw ResponseStatusException(HttpStatus.FORBIDDEN)
            }
        }

    @GetMapping("/applications")
    fun findByCandidateIdOrCompanyId(
        @RequestHeader("X-User-Id") candidateId: UUID,
        @RequestHeader("X-User-Roles") role: String
    ): Flux<Application> =
        when (role) {
            "client_candidate" -> {
                applicationService.findByCandidateId(candidateId)
            }
            "client_recruiter" -> {
                TODO()
            }
            "client_admin" -> {
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
        @RequestHeader("X-User-Roles") role: String,
        @RequestBody updateApplicationDto: UpdateApplicationDto
    ): Mono<Application> =
        if (role == "client_recruiter") {
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

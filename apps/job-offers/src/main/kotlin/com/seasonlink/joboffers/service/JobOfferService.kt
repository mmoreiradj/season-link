package com.seasonlink.joboffers.service

import com.seasonlink.joboffers.dto.JobOfferDto
import com.seasonlink.joboffers.model.JobOffer
import com.seasonlink.joboffers.repository.JobOfferRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClientResponseException
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@Service
class JobOfferService(
    private val jobOfferRepository: JobOfferRepository,
    private val jobService: JobService,
    private val companyService: CompanyService
) {

    fun findAll(): Flux<JobOffer> = jobOfferRepository.findAll()

    fun findById(id: UUID): Mono<JobOffer> = jobOfferRepository.findById(id)

    fun save(jobOffer: JobOfferDto): Mono<JobOffer> = Mono.zip(
        jobService.getById(jobOffer.jobId)
            .onErrorResume(
                WebClientResponseException.NotFound::class.java
            ) { throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Job does not exit") },
        companyService.getById(jobOffer.companyId)
            .onErrorResume(
                WebClientResponseException.NotFound::class.java
            ) { throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Company does not exit") }
    ).flatMap { jobOfferRepository.save(jobOffer.toModel()) }

    fun update(id: UUID, jobOffer: JobOfferDto): Mono<JobOffer> = Mono.zip(
        jobService.getById(jobOffer.jobId)
            .onErrorResume(
                WebClientResponseException.NotFound::class.java
            ) { throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Job does not exit") },
        companyService.getById(jobOffer.companyId)
            .onErrorResume(
                WebClientResponseException.NotFound::class.java
            ) { throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Company does not exit") }
    ).flatMap { jobOfferRepository.save(jobOffer.toModel().copy(id = id)) }

    fun delete(id: UUID): Mono<Void> = jobOfferRepository.deleteById(id)
}

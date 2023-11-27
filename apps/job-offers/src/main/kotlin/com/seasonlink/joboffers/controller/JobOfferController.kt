package com.seasonlink.joboffers.controller

import com.seasonlink.joboffers.dto.JobOfferDto
import com.seasonlink.joboffers.model.JobOffer
import com.seasonlink.joboffers.service.JobOfferService
import jakarta.validation.Valid
import org.springframework.dao.TransientDataAccessResourceException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Mono
import java.util.*

@RestController
@RequestMapping("/job-offers")
class JobOfferController(private val jobOfferService: JobOfferService) {

    @GetMapping
    fun getAll() = jobOfferService.findAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: UUID): Mono<JobOffer> = jobOfferService.findById(id).switchIfEmpty(
            Mono.error(
                ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Job offer not found"
                )
            )
        )

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@Valid @RequestBody jobOfferDto: JobOfferDto) = jobOfferService.save(jobOfferDto)

    @PutMapping("/{id}")
    fun update(@PathVariable id: UUID, @Valid @RequestBody jobOfferDto: JobOfferDto): Mono<JobOffer> =
        jobOfferService.update(id, jobOfferDto).doOnError(
                TransientDataAccessResourceException::class.java
            ) { throw ResponseStatusException(HttpStatus.NOT_FOUND, "Job offer not found") }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: UUID): Mono<Void> = jobOfferService.delete(id).switchIfEmpty(
            Mono.error(
                ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Job offer not found"
                )
            )
        )
}

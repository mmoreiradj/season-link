package com.seasonlink.joboffers.controller

import com.seasonlink.joboffers.dto.AdvantageDto
import com.seasonlink.joboffers.model.Advantage
import com.seasonlink.joboffers.repository.AdvantageRepository
import com.seasonlink.joboffers.service.AdvantageService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID

@RestController
@RequestMapping("/job-offers/{jobOfferId}/advantages")
class AdvantageController(
    private val advantageService: AdvantageService,
) {

    @GetMapping
    fun getAll(@PathVariable jobOfferId: UUID): Flux<Advantage> = advantageService.findAllByJobOfferId(jobOfferId)

    @PostMapping
    fun create(@PathVariable jobOfferId: UUID, @Valid @RequestBody advantageDto: AdvantageDto): Mono<Advantage> =
        advantageService.save(jobOfferId, advantageDto)
            .doOnError(
                IllegalArgumentException::class.java
            ) { throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Advantage already exists") }
}
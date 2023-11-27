package com.seasonlink.joboffers.service

import com.seasonlink.joboffers.dto.AdvantageDto
import com.seasonlink.joboffers.model.Advantage
import com.seasonlink.joboffers.repository.AdvantageRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.UUID
import java.util.stream.Collectors

@Service
class AdvantageService(
    private val advantageRepository: AdvantageRepository
) {

    fun findAllByJobOfferId(jobOfferId: UUID): Flux<Advantage> = advantageRepository
        .findAllByJobOfferId(jobOfferId)

    fun save(jobOfferId: UUID, advantageDto: AdvantageDto): Mono<Advantage> = advantageRepository
        .findAllByJobOfferId(jobOfferId)
        .collect(Collectors.toList())
        .flatMap { advantages ->
            if (advantages.any { it.type == advantageDto.type }) {
                Mono.error(IllegalArgumentException("Advantage already exists"))
            } else {
                advantageRepository.save(AdvantageDto.toModel(advantageDto).copy(jobOfferId = jobOfferId))
            }
        }
}
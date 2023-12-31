package com.seasonlink.joboffers.model

import org.springframework.data.annotation.Id
import java.time.LocalDateTime
import java.util.*

data class Application (
    @Id val id: UUID?,
    val state: ApplicationState,
    val jobOfferId: UUID?,
    val candidateId: UUID?,
    val createdAt: LocalDateTime?,
    val updatedAt: LocalDateTime?
)

package com.seasonlink.joboffers.model

import org.springframework.data.annotation.Id
import java.util.UUID

data class Advantage (
    @Id val id: UUID?,
    val type: AdvantageType,
    val jobOfferId: UUID?
)

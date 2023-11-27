package com.seasonlink.joboffers.dto

import com.seasonlink.joboffers.model.Advantage
import com.seasonlink.joboffers.model.AdvantageType
import jakarta.validation.constraints.NotNull

data class AdvantageDto (
    @field:NotNull val type: AdvantageType,
) {
    companion object {
        fun toModel(advantageDto: AdvantageDto): Advantage {
            return Advantage(
                id = null,
                type = advantageDto.type,
                jobOfferId = null
            )
        }
    }
}

package com.seasonlink.joboffers.dto

import com.seasonlink.joboffers.model.ApplicationState
import jakarta.validation.constraints.NotBlank

data class UpdateApplicationDto(
    @field:NotBlank val state: ApplicationState
)

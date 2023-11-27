package com.seasonlink.joboffers.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.seasonlink.joboffers.model.JobOffer
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDate
import java.util.UUID

data class JobOfferDto(
    @field:NotNull val jobId: UUID,
    @JsonFormat(pattern = "dd-MM-yyyy") @field:NotNull val fromDate: LocalDate,
    @JsonFormat(pattern = "dd-MM-yyyy") @field:NotNull val toDate: LocalDate,
    @field:NotBlank val currency: String,
    @field:NotNull val hourlySalary: Double,
    @field:NotNull val hoursPerWeek: Int,
    @field:NotBlank @field:Size(min = 50, max = 500) val description: String,
    @field:NotBlank val address: String,
    @field:NotNull val companyId: UUID,
) {
    fun toModel(): JobOffer {
        return JobOffer(
            id = null,
            jobId = this.jobId,
            fromDate = this.fromDate,
            toDate = this.toDate,
            currency = this.currency,
            hourlySalary = this.hourlySalary,
            hoursPerWeek = this.hoursPerWeek,
            description = this.description,
            address = this.address,
            companyId = this.companyId,
            createdAt = null,
            updatedAt = null
        )
    }
}

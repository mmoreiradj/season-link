package com.seasonlink.joboffers.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Table(name = "job_offer")
data class JobOffer(
    @Id val id: UUID?,
    val jobId: UUID,
    val fromDate: LocalDate,
    val toDate: LocalDate,
    val currency: String,
    val hourlySalary: Double,
    val hoursPerWeek: Int,
    val description: String,
    val address: String,
    val companyId: UUID,
    val createdAt: LocalDateTime?,
    val updatedAt: LocalDateTime?
)

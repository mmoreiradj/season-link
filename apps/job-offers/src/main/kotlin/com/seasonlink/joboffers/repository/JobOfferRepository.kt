package com.seasonlink.joboffers.repository

import com.seasonlink.joboffers.model.JobOffer
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.*

interface JobOfferRepository: ReactiveCrudRepository<JobOffer, UUID>

package com.seasonlink.joboffers.service

import io.nats.client.Connection
import io.nats.client.Nats
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Service
@Lazy
class NatsService(@Value("\${nats.url}") private val natsUrl: String) {
    private val nc: Connection = Nats.connect(natsUrl)

    fun publish(subject: String, data: String) {
        nc.publish(subject, data.toByteArray())
    }
}

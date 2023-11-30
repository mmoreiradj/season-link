package com.seasonlink.gateway.filters

import com.nimbusds.jose.shaded.gson.Gson
import com.nimbusds.jose.shaded.gson.JsonObject
import com.seasonlink.gateway.models.User
import org.springframework.cloud.gateway.filter.GatewayFilterChain
import org.springframework.cloud.gateway.filter.GlobalFilter
import org.springframework.stereotype.Component
import org.springframework.http.HttpHeaders
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono
import java.util.*

@Component
class AuthFilter: GlobalFilter {

    /**
     * This method is called for every request that comes to the gateway.
     * It is used to filter the requests and add the user information and a request to the request headers.
     *
     * The user information is added to the request in the headers.
     * The headers are:
     * - X-User-Id: The id of the user.
     * - X-User-Roles: The roles of the user. A comma separated string. Example: "admin,manager"
     * - X-Request-Id: The id of the request.
     *
     * @param exchange The request that comes to the gateway.
     * @param chain The chain of filters that will be applied to the request.
     * @return A Mono<Void> that indicates that the request has been filtered.
     */
    override fun filter(exchange: ServerWebExchange, chain: GatewayFilterChain): Mono<Void> {
        val authorizationToken = exchange.request.headers.getFirst("Authorization")
        if (authorizationToken.isNullOrEmpty()) {
            return chain.filter(exchange)
        }

        val user = decodeToken(authorizationToken)

        val headers = HttpHeaders()
        headers["X-User-Id"] = user.oidcId
        headers["X-User-Roles"] = user.roles.joinToString(",")
        headers["X-Request-Id"] = UUID.randomUUID().toString()

        val request = exchange.request.mutate().headers { httpHeaders: HttpHeaders -> httpHeaders.addAll(headers) }.build()
        return chain.filter(exchange.mutate().request(request).build())
    }

    /**
     * This method is used to decode the jwt token and get the user information from it.
     * @param authorizationToken The jwt token.
     * @return The user information.
     */
    private fun decodeToken(authorizationToken: String): User {
        val chunks = authorizationToken.split("\\.".toRegex()).toTypedArray()
        val decoder = Base64.getUrlDecoder()
        val payload = Gson().fromJson(String(decoder.decode(chunks[1])), JsonObject::class.java)
        val roles = Gson().fromJson<List<String>>(payload["resource_access"]
            .asJsonObject["mobile-app"]
            .asJsonObject["roles"]
            .asJsonArray,
            List::class.java)
        val sub = payload["sub"].asString

        return User(sub, roles)
    }
}
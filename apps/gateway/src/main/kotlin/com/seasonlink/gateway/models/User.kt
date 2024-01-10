package com.seasonlink.gateway.models

/**
 * User data class.
 * Represents a user of the application.
 *
 * @param oidcId the user's OpenID Connect ID
 * @param roles the user's roles
 */
data class User(
    val oidcId: String,
    val roles: List<String> = listOf()
)

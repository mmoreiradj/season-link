use crate::api::utils::AppError;
use anyhow::anyhow;
use axum::{extract::Request, middleware::Next, response::Response};

use super::auth_headers::{AuthHeaders, Role};

/// Check whether the user is an admin
pub async fn is_admin(
    AuthHeaders {
        user_id: _,
        roles,
        request_id: _,
    }: AuthHeaders,
    request: Request,
    next: Next,
) -> Result<Response, AppError> {
    // Can probably be generalized for roles
    if !roles.iter().any(|role| *role == Role::Admin) {
        return Err(AppError(anyhow!(
            "The user does not have one of the following roles: {:?}",
            Role::Admin
        )));
    }

    Ok(next.run(request).await)
}

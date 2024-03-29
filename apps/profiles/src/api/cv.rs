use std::{env, sync::Arc};

use anyhow::anyhow;
use aws_sdk_s3::{
    primitives::{AggregatedBytes, ByteStream},
    Client,
};
use axum::{
    extract::{Multipart, Path, State},
    response::IntoResponse,
    Json,
};
use uuid::Uuid;

use crate::SharedState;

use super::{middlewares::auth_headers::AuthHeaders, utils::AppError};

/// Post the cv into the bucket
pub async fn post_cv(
    State(state): State<Arc<SharedState>>,
    AuthHeaders {
        user_id,
        roles: _,
        request_id: _,
    }: AuthHeaders,
    mut multipart: Multipart,
) -> axum::response::Result<(), AppError> {
    // We only support one file at the maximum
    let field = multipart.next_field().await?;
    if field.is_none() {
        return Err(AppError(anyhow!("No file found !")));
    }

    // Safe unwrap
    let file = field.unwrap();

    let data = file.bytes().await?;
    let result = state
        .s3_client
        .put_object()
        .bucket(get_bucket_name())
        .key(get_cv_filename_from_user(&user_id))
        .body(ByteStream::from(data))
        .send()
        .await?;

    println!("{:?}", result);

    Ok(())
}

/// Get the CV from the bucket
pub async fn get_cv(
    State(state): State<Arc<SharedState>>,
    Path(user_id): Path<Uuid>,
) -> Result<impl IntoResponse, AppError> {
    Ok(axum::response::IntoResponse::into_response(
        get_user_cv(&state.s3_client, &user_id).await?.into_bytes(),
    ))
}

/// Get the user own cv
pub async fn get_cv_self(
    State(state): State<Arc<SharedState>>,
    AuthHeaders {
        user_id,
        roles: _,
        request_id: _,
    }: AuthHeaders,
) -> Result<impl IntoResponse, AppError> {
    Ok(axum::response::IntoResponse::into_response(
        get_user_cv(&state.s3_client, &user_id).await?.into_bytes(),
    ))
}

/// Get whether the candidate has an uploaded a cv
pub async fn has_uploaded_cv_self(
    State(state): State<Arc<SharedState>>,
    AuthHeaders {
        user_id,
        roles: _,
        request_id: _,
    }: AuthHeaders,
) -> Result<impl IntoResponse, AppError> {
    Ok(Json(
        has_uploaded_cv_from_id(&state.s3_client, &user_id).await,
    ))
}

/// Get whether the candidate has an uploaded a cv
pub async fn has_uploaded_cv(
    State(state): State<Arc<SharedState>>,
    Path(user_id): Path<Uuid>,
) -> Result<impl IntoResponse, AppError> {
    Ok(Json(
        has_uploaded_cv_from_id(&state.s3_client, &user_id).await,
    ))
}

/// Get whether the candidate has uploaded a CV
async fn has_uploaded_cv_from_id(client: &Client, candidate_id: &Uuid) -> bool {
    let result = client
        .head_object()
        .bucket(get_bucket_name())
        .key(get_cv_filename_from_user(candidate_id))
        .send()
        .await;

    match result {
        Ok(_) => true,
        Err(bad_result) => !bad_result.into_service_error().is_not_found(),
    }
}

/// Get the file from the bucket, then use the user
async fn get_user_cv(client: &Client, user_id: &Uuid) -> Result<AggregatedBytes, AppError> {
    let result = client
        .get_object()
        .bucket(get_bucket_name())
        .key(get_cv_filename_from_user(user_id))
        .send()
        .await?;

    Ok(result.body.collect().await?)
}

fn get_cv_filename_from_user(user_id: &Uuid) -> String {
    user_id.to_string() + "_cv"
}

fn get_bucket_name() -> String {
    env::var("MINIO_BUCKET_NAME").expect("No bucket name !")
}

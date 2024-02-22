use std::{env, sync::Arc};

use axum::{
    extract::{Path, State},
    http::HeaderValue,
    response::IntoResponse,
};
use hex_color::HexColor;
use reqwest::header;
use serde_json::json;
use uuid::Uuid;

use super::utils::AppError;

/// Get the profile picture associated to a candidate
pub async fn get_candidate_picture(
    Path(user_id): Path<Uuid>,
) -> axum::response::Result<impl IntoResponse, AppError> {
    let url = env::var("IMAGE_GENERATOR_SERVICE_URL").expect("No image generation !");

    let split_uuid = user_id.as_bytes();

    let json_payload = json!({
      "background": {
        "pattern_type": "LINEAR_GRADIENT",
        "colors": [HexColor::rgb(split_uuid[0], split_uuid[1], split_uuid[2])
        .display_rgb()
        .to_string(),
        HexColor::rgb(split_uuid[3], split_uuid[4], split_uuid[5])
        .display_rgb()
        .to_string()
        ],
        "angle": 90
      },

      "width": 360,
      "height": 360,

      "blobs": [
        {
          "blob": {
            "pattern": {
              "pattern_type": "LINEAR_GRADIENT",
              "colors": [HexColor::rgb(split_uuid[6], split_uuid[7], split_uuid[8])
              .display_rgb()
              .to_string(),
              HexColor::rgb(split_uuid[9], split_uuid[10], split_uuid[11])
              .display_rgb()
              .to_string()],
              "angle": 90
            },
            "coordinates": [[100, 100]],
            "center": [0.5, 0.5],
            "shape_type": "CIRCLE",
            "scale": 1
          }
        },
        {
          "blob": {
            "pattern": {
              "pattern_type": "LINEAR_GRADIENT",
              "colors": [
                HexColor::rgb(split_uuid[12], split_uuid[13], split_uuid[14])
                .display_rgb()
                .to_string(),
                HexColor::rgb(split_uuid[13], split_uuid[14], split_uuid[15])
                .display_rgb()
                .to_string()
                ],
              "angle": 90
            },
            "coordinates": [
              [-100, -50],
              [0, -50],
              [100, -20],
              [100, 100],
              [100, 100],
              [-100, 100]
            ],
            "center": [0.5, 0.9],
            "shape_type": "BLOB",
            "scale": 3.5,
            "elevation": 5
          }
        }
      ]
    });

    let client = reqwest::Client::new();
    let result = client
        .post(url + "/image")
        .json(&json_payload)
        .send()
        .await?
        .bytes()
        .await?;

    // Axum split the stream proxy handling into another component.
    // Sadly it handle only specific files format instead or raw bytes.
    let mut response = axum::response::IntoResponse::into_response(result);
    let headers = response.headers_mut();
    headers.insert(header::CONTENT_TYPE, HeaderValue::from_static("image/png"));
    headers.insert(
        header::CONTENT_DISPOSITION,
        HeaderValue::from_static("image/png"),
    );

    Ok(response)
}

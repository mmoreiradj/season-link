use aws_sdk_s3::{
    config::{Credentials, Region},
    Client,
};
use dotenvy::dotenv;
use std::{env, sync::Arc};
use tower_http::trace::TraceLayer;

use api::{
    candidate::{
        create_candidate, delete_candidate, get_candidate, get_candidate_self, get_candidates,
        update_candidate,
    },
    cv::post_cv,
    experience::{
        create_experience, delete_experience, get_experience, get_experiences, update_experience,
    },
    middlewares::is_admin::is_admin,
    reference::{
        create_reference, delete_reference, get_reference, get_references, update_reference,
    },
    utils::handler_404,
};
use axum::{
    handler::Handler,
    middleware,
    routing::{get, post, put},
    Router,
};
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

use crate::api::{
    candidate::request_account_deletion,
    cv::{get_cv, get_cv_self, has_uploaded_cv, has_uploaded_cv_self},
    experience::get_experiences_self,
    picture::get_candidate_picture,
    reference::get_references_self,
};

mod api;

#[derive(Debug)]
pub struct SharedState {
    pub pool: Pool<Postgres>,
    pub s3_client: Client,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // load environment variables from .env file
    match dotenv() {
        Ok(_) => println!("LOG: Env file loaded"),
        Err(_) => println!("WARN: no env file found, is this expected ?"),
    }

    // Check env vars
    let db_host = env::var("DB_HOST").expect("No database host !");
    let db_port = env::var("DB_PORT").expect("No database port !");
    let db_user = env::var("DB_USER").expect("No database user !");
    let db_password = env::var("DB_PASSWORD").expect("No database password !");
    let db_name = env::var("DB_NAME").expect("No database name !");
    let postgres_url = format!(
        "postgres://{}:{}@{}:{}/{}",
        db_user, db_password, db_host, db_port, db_name
    );
    let server_port = env::var("SERVER_PORT").unwrap_or(String::from("4000"));

    //Access the DB
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&postgres_url)
        .await?;

    let shared_pool = Arc::new(SharedState {
        pool,
        s3_client: client_to_s3().await,
    });

    // build our applications
    let mut router = Router::new();

    router = router
        .route("/health/live", get(api::health::health))
        .route("/health/ready", get(api::health::health));

    // Register the users
    router = router
        .route("/profiles/user", post(create_candidate))
        .route("/profiles/users", get(get_candidates))
        .route(
            "/profiles/user/me",
            put(update_candidate)
                .get(get_candidate_self)
                .delete(request_account_deletion),
        )
        .route(
            "/profiles/user/:user_id",
            get(get_candidate).delete(delete_candidate.layer(middleware::from_fn(is_admin))),
        )
        .route(
            "/profiles/user/:user_id/picture",
            get(get_candidate_picture),
        );

    // Register the user files operations
    router = router
        .route("/profiles/user/me/cv", post(post_cv).get(get_cv_self))
        .route("/profiles/user/:user_id/cv", get(get_cv))
        // FIXME I should have used the HEAD verb instead
        .route("/profiles/user/me/cv/exists", get(has_uploaded_cv_self))
        .route("/profiles/user/:user_id/cv/exists", get(has_uploaded_cv));

    // Register the references
    router = router
        .route("/profiles/user/me/references", get(get_references_self))
        .route("/profiles/user/:user_id/references", get(get_references))
        .route("/profiles/references", post(create_reference))
        .route(
            "/profiles/reference/:reference_id",
            get(get_reference)
                .delete(delete_reference)
                .put(update_reference),
        );

    // Register the experiences
    router = router
        .route("/profiles/user/me/experiences", get(get_experiences_self))
        .route("/profiles/user/:user_id/experiences", get(get_experiences))
        .route("/profiles/experiences", post(create_experience))
        .route(
            "/profiles/experience/:experience_id",
            get(get_experience)
                .delete(delete_experience)
                .put(update_experience),
        );

    // Register fallback
    router = router.fallback(handler_404);

    // Logging
    router = router.layer(TraceLayer::new_for_http());

    let app = router.with_state(shared_pool);

    // run it with hyper on localhost:3000
    println!("Binding server port {}", &server_port);
    let address = String::from("0.0.0.0:") + &server_port;

    let listener = tokio::net::TcpListener::bind(&address).await.unwrap();
    axum::serve(listener, app).await.unwrap();

    // axum::Server::bind(
    //     &(String::from("0.0.0.0:") + &server_port)
    //         .parse()
    //         .expect("Malformed server url !"),
    // )
    // .serve(app.into_make_service())
    // .await
    // .unwrap();

    Ok(())
}

// Build a client to the s3 instance
async fn client_to_s3() -> Client {
    let key_id = env::var("MINIO_ACCESS_KEY_ID").expect("No S3 key id !");
    let secret_key = env::var("MINIO_SECRET_ACCESS_KEY").expect("No secret access key !");
    let url = env::var("MINIO_URL").expect("No S3 URL !");
    let bucket_name = env::var("MINIO_BUCKET_NAME").expect("No bucket name !");

    let cred = Credentials::new(key_id, secret_key, None, None, "loaded-from-custom-env");

    let s3_config = aws_sdk_s3::config::Builder::new()
        .endpoint_url(url)
        .credentials_provider(cred)
        .region(Region::new("eu-central-1"))
        .force_path_style(true) // apply bucketname as path param instead of pre-domain
        .build();

    let client = aws_sdk_s3::Client::from_conf(s3_config);

    //FIXME handle already existing bucket
    let result = client.create_bucket().bucket(bucket_name).send().await;
    match result {
        Ok(_) => println!("Bucket created !"),
        Err(err) => println!("Error with bucket creation: {:?}", err),
    }

    client
}

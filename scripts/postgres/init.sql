CREATE DATABASE joboffers;
CREATE DATABASE keycloak;

CREATE USER keycloak WITH PASSWORD 'keycloak';

GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
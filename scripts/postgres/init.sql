CREATE DATABASE keycloak;

CREATE USER keycloak WITH PASSWORD 'keycloak';

GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;

CREATE DATABASE joboffers;

CREATE USER joboffers WITH PASSWORD 'joboffers';

GRANT ALL PRIVILEGES ON DATABASE joboffers TO joboffers;

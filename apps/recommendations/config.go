package main

import (
	"github.com/nats-io/nats.go"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func SetupLogger() {
	logLevel := GetEnvOrFail("LOG_LEVEL")

	var chosenLogLevel zerolog.Level

	switch logLevel {
	case "debug":
		chosenLogLevel = zerolog.DebugLevel
	case "info":
		chosenLogLevel = zerolog.InfoLevel
	case "warn":
		chosenLogLevel = zerolog.WarnLevel
	case "error":
		chosenLogLevel = zerolog.ErrorLevel
	default:
		chosenLogLevel = zerolog.InfoLevel
	}

	log.Info().Msg("logger setup with level: " + chosenLogLevel.String())
	zerolog.SetGlobalLevel(chosenLogLevel)
}

type NatsConfig struct {
	Url string
}

func (n *NatsConfig) NewNatsClient() (*nats.Conn, error) {
	return nats.Connect(n.Url)
}

func ParseNatsConfig() NatsConfig {
	url := GetEnvOrFail("NATS_URL")

	return NatsConfig{
		Url: url,
	}
}

type Neo4jConfig struct {
	Url      string
	Username string
	Password string
	Database string
}

func (n *Neo4jConfig) NewDriver() (neo4j.DriverWithContext, error) {
	return neo4j.NewDriverWithContext(
		n.Url,
		neo4j.BasicAuth(n.Username, n.Password, ""),
	)
}

func ParseNeo4JConfig() Neo4jConfig {
	database := GetEnvOrFail("NEO4J_DATABASE")
	url := GetEnvOrFail("NEO4J_URL")
	username := GetEnvOrFail("NEO4J_USERNAME")
	password := GetEnvOrFail("NEO4J_PASSWORD")

	return Neo4jConfig{
		Url:      url,
		Username: username,
		Password: password,
		Database: database,
	}
}

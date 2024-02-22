package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"sync"

	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

const (
	createJobOfferSubject    = "recommendations.job-offer.create"
	createJobCategorySubject = "recommendations.job-category.create"
	createJobSubject         = "recommendations.job.create"
	createAdvantageSubject   = "recommendations.advantage.create"
)

var (
	wg = &sync.WaitGroup{}
)

func main() {
	godotenv.Load()

	SetupLogger()

	ctx := context.Background()

	neo4jConfig := ParseNeo4JConfig()
	neo4jDriver, err := neo4jConfig.NewDriver()

	if err != nil {
		panic(err)
	}

	log.Info().Msg("Connected to Neo4j")

	defer neo4jDriver.Close(ctx)

	recommendationService := NewRecommendationService(neo4jDriver, ctx)

	natsHandlers := NewRecommendationHandlers(recommendationService)

	natsConfig := ParseNatsConfig()
	nc, err := natsConfig.NewNatsClient()

	log.Info().Msg("Connected to NATS")

	if err != nil {
		panic(err)
	}

	defer nc.Close()

	nc.Subscribe(createJobOfferSubject, natsHandlers.NewRecommendationHandler)
	log.Info().Msg("Subscribed to " + createJobOfferSubject)

	nc.Subscribe(createJobCategorySubject, natsHandlers.NewJobCategoryHandler)
	log.Info().Msg("Subscribed to " + createJobCategorySubject)

	nc.Subscribe(createJobSubject, natsHandlers.NewJobHandler)
	log.Info().Msg("Subscribed to " + createJobSubject)

	nc.Subscribe(createAdvantageSubject, natsHandlers.NewAdvantageHandler)
	log.Info().Msg("Subscribed to " + createAdvantageSubject)

	nc.Flush()

	if err := nc.LastError(); err != nil {
		log.Error().Msg("Error when subscribing")
		panic(err)
	}

	httpServer := &http.Server{Addr: ":5000"}

	// Handle termination
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	wg.Add(1)
	go func() {
		defer wg.Done()
		<-c
		log.Info().Msg("Shutting down")
		nc.Drain()

		if err := neo4jDriver.Close(ctx); err != nil {
			log.Error().Msg("Error when closing Neo4j driver: " + err.Error())
		}

		if err := httpServer.Shutdown(ctx); err != nil {
			log.Error().Msg("Error when shutting down HTTP server: " + err.Error())
		}
	}()

	httpHandlers := HttpHandlersImpl{
		recommendationService: recommendationService,
	}
	http.HandleFunc("/recommendations", httpHandlers.RecommendJobOffers)
	http.HandleFunc("/health/live", httpHandlers.Liveness)
	http.HandleFunc("/health/ready", httpHandlers.Readiness)

	err = httpServer.ListenAndServe()
	if err != nil {
		log.Error().Msg("Error when starting HTTP server")
	}

	wg.Wait()
}

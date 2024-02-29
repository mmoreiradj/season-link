package main

import (
	"context"
	"encoding/json"
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

	http.HandleFunc("/recommendations", func(w http.ResponseWriter, r *http.Request) {
		userRequest := UserRecommendationRequest{
			JobId:               r.URL.Query().Get("jobId"),
			PrefferedAdvantages: r.URL.Query()["advantages"],
		}

		if userRequest.JobId == "" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		log.Info().Msgf("Received recommendation request: %+v", userRequest)

		result, err := recommendationService.RecommendJobOffers(userRequest)
		if err != nil {
			log.Error().Msg("Error when recommending job offers: " + err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// Convert result to JSON byte array
		resultJSON, err := json.Marshal(result)
		if err != nil {
			log.Error().Msg("Error when marshaling job offers to JSON: " + err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(resultJSON)
	})

	err = httpServer.ListenAndServe()
	if err != nil {
		log.Error().Msg("Error when starting HTTP server")
	}

	wg.Wait()
}

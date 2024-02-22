package main

import (
	"encoding/json"
	"net/http"

	"github.com/rs/zerolog/log"
)

type HttpHandlers interface {
	// Handle new recommendation
	RecommenendJobOffers(w http.ResponseWriter, r *http.Request)
	// Liveness probe
	Liveness(w http.ResponseWriter, r *http.Request)
	// Readiness probe
	Readiness(w http.ResponseWriter, r *http.Request)
}

type HttpHandlersImpl struct {
	recommendationService RecommendationService
}

func (h *HttpHandlersImpl) RecommendJobOffers(w http.ResponseWriter, r *http.Request) {
	userRequest := UserRecommendationRequest{
		JobId:               r.URL.Query().Get("jobId"),
		PrefferedAdvantages: r.URL.Query()["advantages"],
	}

	if userRequest.JobId == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	log.Info().Msgf("Received recommendation request: %+v", userRequest)

	result, err := h.recommendationService.RecommendJobOffers(userRequest)
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
}

func (h *HttpHandlersImpl) Liveness(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func (h *HttpHandlersImpl) Readiness(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

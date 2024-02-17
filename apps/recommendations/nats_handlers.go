package main

import (
	"encoding/json"

	"github.com/nats-io/nats.go"
	"github.com/rs/zerolog/log"
)

type RecommendationHandlers interface {
	// Handle new recommendation
	NewRecommendationHandler(msg *nats.Msg)
	// Handle new job category
	NewJobCategoryHandler(msg *nats.Msg)
	// Handle new job
	NewJobHandler(msg *nats.Msg)
	// Handle new advantage
	NewAdvantageHandler(msg *nats.Msg)
}

type RecommendationHandlersImpl struct {
	recommendationService RecommendationService
}

func (r *RecommendationHandlersImpl) NewRecommendationHandler(msg *nats.Msg) {
	var jobOffer JobOffer

	data, err := jsonSnakeToCamel(msg.Data)
	if err != nil {
		log.Error().Msg("Error when converting JSON to camel case: " + err.Error())
		return
	}

	err = json.Unmarshal(data, &jobOffer)
	if err != nil {
		log.Error().Msg("Error when unmarshalling job offer: " + err.Error())
		return
	}

	log.Debug().Msgf("Received job offer: %+v", jobOffer)

	err = r.recommendationService.InsertJobOffer(jobOffer)

	if err != nil {
		log.Error().Msg("Error when inserting job offer: " + err.Error())
		return
	}
}

func (r *RecommendationHandlersImpl) NewJobHandler(msg *nats.Msg) {
	var job Job

	data, err := jsonSnakeToCamel(msg.Data)
	if err != nil {
		log.Error().Msg("Error when converting JSON to camel case: " + err.Error())
		return
	}

	err = json.Unmarshal(data, &job)
	if err != nil {
		log.Error().Msg("Error when unmarshalling job: " + err.Error())
		return
	}

	log.Debug().Msgf("Received job: %+v", job)

	err = r.recommendationService.InsertJob(job)

	if err != nil {
		log.Error().Msg("Error when inserting job: " + err.Error())
		return
	}
}

func (r *RecommendationHandlersImpl) NewJobCategoryHandler(msg *nats.Msg) {
	var jobCategory JobCategory

	data, err := jsonSnakeToCamel(msg.Data)
	if err != nil {
		log.Error().Msg("Error when converting JSON to camel case: " + err.Error())
		return
	}

	err = json.Unmarshal(data, &jobCategory)
	if err != nil {
		log.Error().Msg("Error when unmarshalling job category: " + err.Error())
		return
	}

	log.Debug().Msgf("Received job category: %+v", jobCategory)

	err = r.recommendationService.InsertJobCategory(jobCategory)

	if err != nil {
		log.Error().Msg("Error when inserting job category: " + err.Error())
		return
	}
}

func (r *RecommendationHandlersImpl) NewAdvantageHandler(msg *nats.Msg) {
	var advantage Advantage

	data, err := jsonSnakeToCamel(msg.Data)
	if err != nil {
		log.Error().Msg("Error when converting JSON to camel case: " + err.Error())
		return
	}

	err = json.Unmarshal(data, &advantage)
	if err != nil {
		log.Error().Msg("Error when unmarshalling advantage: " + err.Error())
		return
	}

	log.Debug().Msgf("Received advantage: %+v", advantage)

	err = r.recommendationService.InsertAdvantage(advantage)

	if err != nil {
		log.Error().Msg("Error when inserting advantage: " + err.Error())
		return
	}
}

func NewRecommendationHandlers(recommendationService RecommendationService) RecommendationHandlers {
	return &RecommendationHandlersImpl{
		recommendationService: recommendationService,
	}
}

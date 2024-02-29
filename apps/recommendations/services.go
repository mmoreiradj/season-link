package main

import (
	"context"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type RecommendationService interface {
	// Insert job offer into the database
	InsertJobOffer(jobOffer JobOffer) error
	// Insert Job Category into the database
	InsertJobCategory(jobCategory JobCategory) error
	// Insert job into the database
	InsertJob(job Job) error
	// Insert advantage into the database
	InsertAdvantage(advantage Advantage) error
	// Recommend job offers for a given user
	RecommendJobOffers(user UserRecommendationRequest) ([]JobOffer, error)
}

type RecommendationServiceImpl struct {
	neo4jDriver neo4j.DriverWithContext
	ctx         context.Context
}

func (r *RecommendationServiceImpl) InsertJobOffer(jobOffer JobOffer) error {
	_, err := neo4j.ExecuteQuery(r.ctx, r.neo4jDriver, `
		MATCH (job:Job {id: $job_id})
		MERGE (jobOffer:JobOffer {id: $id, to_date: $to_date, from_date: $from_date, company_id: $company_id})
		CREATE (jobOffer)-[:FOR_JOB]->(job)
	`, map[string]interface{}{
		"id":         jobOffer.ID,
		"job_id":     jobOffer.JobID,
		"company_id": jobOffer.CompanyID,
		"to_date":    jobOffer.ToDate,
		"from_date":  jobOffer.FromDate,
	}, neo4j.EagerResultTransformer)

	return err
}

func (r *RecommendationServiceImpl) InsertJobCategory(jobCategory JobCategory) error {
	_, err := neo4j.ExecuteQuery(r.ctx, r.neo4jDriver, `
		CREATE (jobCategory:JobCategory {id: $id, title: $title})
	`, map[string]interface{}{
		"id":    jobCategory.ID,
		"title": jobCategory.Title,
	}, neo4j.EagerResultTransformer)

	return err
}

func (r *RecommendationServiceImpl) InsertJob(job Job) error {
	_, err := neo4j.ExecuteQuery(r.ctx, r.neo4jDriver, `
		MATCH (jobCategory:JobCategory {id: $category_id})
		CREATE (job:Job {id: $id, title: $title})
		CREATE (job)-[:BELONGS_TO]->(jobCategory)
	`, map[string]interface{}{
		"id":          job.ID,
		"title":       job.Title,
		"category_id": job.CategoryId,
	}, neo4j.EagerResultTransformer)

	return err
}

func (r *RecommendationServiceImpl) InsertAdvantage(advantage Advantage) error {
	_, err := neo4j.ExecuteQuery(r.ctx, r.neo4jDriver, `
		MATCH (jobOffer:JobOffer {id: $job_offer_id})
		CREATE (advantage:Advantage {id: $id, type: $type})
		CREATE (advantage)-[:FOR_JOB_OFFER]->(jobOffer)
	`, map[string]interface{}{
		"id":           advantage.ID,
		"type":         advantage.Type,
		"job_offer_id": advantage.JobOfferID,
	}, neo4j.EagerResultTransformer)

	return err
}

func (r *RecommendationServiceImpl) RecommendJobOffers(user UserRecommendationRequest) ([]JobOffer, error) {
	var cypherQuery string
	var queryParams map[string]interface{}

	if len(user.PrefferedAdvantages) > 0 {
		cypherQuery = `
			MATCH (job:Job {id: $job_id})
			MATCH (advantage:Advantage)
			WHERE advantage.type IN $advantages
			MATCH (jobOffer:JobOffer)-[:FOR_JOB]->(job)
			MATCH (jobOffer)-[:FOR_JOB_OFFER]->(advantage)
			RETURN jobOffer.id, jobOffer.to_date, jobOffer.from_date, jobOffer.company_id, job.id
		`
		queryParams = map[string]interface{}{
			"job_id":     user.JobId,
			"advantages": user.PrefferedAdvantages,
		}
	} else {
		cypherQuery = `
			MATCH (job:Job {id: $job_id})
			MATCH (jobOffer:JobOffer)-[:FOR_JOB]->(job)
			RETURN jobOffer.id, jobOffer.to_date, jobOffer.from_date, jobOffer.company_id, job.id
		`
		queryParams = map[string]interface{}{
			"job_id": user.JobId,
		}
	}

	result, err := neo4j.ExecuteQuery(r.ctx, r.neo4jDriver, cypherQuery, queryParams, neo4j.EagerResultTransformer)
	if err != nil {
		return nil, err
	}

	jobOffers := make([]JobOffer, len(result.Records))
	for i, record := range result.Records {
		jobOffers[i] = JobOffer{
			ID:        record.Values[0].(string),
			ToDate:    record.Values[1].(string),
			FromDate:  record.Values[2].(string),
			CompanyID: record.Values[3].(string),
			JobID:     record.Values[4].(string),
		}
	}

	return jobOffers, nil
}

func NewRecommendationService(neo4jDriver neo4j.DriverWithContext, ctx context.Context) RecommendationService {
	return &RecommendationServiceImpl{
		neo4jDriver: neo4jDriver,
		ctx:         ctx,
	}
}

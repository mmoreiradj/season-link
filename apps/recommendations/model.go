package main

type Job struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	CategoryId string `json:"categoryId"`
}

type JobCategory struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

type JobOffer struct {
	ID        string `json:"id"`
	JobID     string `json:"jobId"`
	CompanyID string `json:"companyId"`
	ToDate    string `json:"toDate"`
	FromDate  string `json:"fromDate"`
}

type Advantage struct {
	ID         string `json:"id"`
	Type       string `json:"type"`
	JobOfferID string `json:"jobOfferId"`
}

type UserRecommendationRequest struct {
	JobId               string   `json:"jobId"`
	PrefferedAdvantages []string `json:"prefferedAdvantages"`
}

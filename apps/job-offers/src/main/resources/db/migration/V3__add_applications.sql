CREATE TABLE application (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state VARCHAR(50) NOT NULL,
  job_offer_id UUID NOT NULL REFERENCES job_offer(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_application_updated_at BEFORE UPDATE
    ON application FOR EACH ROW EXECUTE PROCEDURE
    update_updated_at_column();

CREATE TABLE advantage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(255) NOT NULL,
  job_offer_id UUID NOT NULL REFERENCES job_offer(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_updated_at_on_job_offer_change BEFORE UPDATE
    ON advantage FOR EACH ROW EXECUTE PROCEDURE
    update_updated_at_column();

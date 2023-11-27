CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE job_offer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    currency VARCHAR(255) NOT NULL,
    hourly_salary DOUBLE PRECISION NOT NULL,
    hours_per_week INT NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    company_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX job_offer_job_id_idx ON job_offer (job_id);
CREATE INDEX job_offer_company_id_idx ON job_offer (company_id);

CREATE TRIGGER update_updated_at_on_job_offer_change BEFORE UPDATE
    ON job_offer FOR EACH ROW EXECUTE PROCEDURE
    update_updated_at_column();

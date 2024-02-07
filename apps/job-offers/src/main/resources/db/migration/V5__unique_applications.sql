-- Delete all duplicate applications
DELETE FROM application
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT DISTINCT ON (job_offer_id, candidate_id) id
        FROM application
        ORDER BY job_offer_id, candidate_id, created_at DESC
    ) AS t
);

ALTER TABLE application
    ADD CONSTRAINT unique_job_candidate_pair UNIQUE (job_offer_id, candidate_id);

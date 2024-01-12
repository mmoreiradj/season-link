-- Insert data into job_offer table
INSERT INTO
    job_offer (
        id,
        job_id,
        from_date,
        to_date,
        currency,
        hourly_salary,
        hours_per_week,
        description,
        address,
        company_id,
        created_at,
        updated_at
    )
VALUES
    (
        '65ef032e-8aa4-498b-8e91-e2256cb4f828',
        'debe1c49-5420-4e1c-a140-a75dcea7ea92',
        '2024-01-11',
        '2024-01-18',
        'USD',
        20.0,
        40,
        'Software Engineer',
        '123 Main St',
        'e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9a',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'a60858bb-8321-4880-b466-110f2854f47b',
        '70dbc08f-5824-4d31-be3c-e3bf9740b257',
        '2024-01-15',
        '2024-01-22',
        'EUR',
        15.0,
        35,
        'Platform Engineer',
        '456 Oak St',
        'e1b2b2a0-5b9a-4b9e-9b9a-9b9a9b9a9b9b',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Insert data into advantage table
INSERT INTO
    advantage (type, job_offer_id, created_at, updated_at)
VALUES
    (
        'FOOD',
        '65ef032e-8aa4-498b-8e91-e2256cb4f828',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'TRANSPORT',
        '65ef032e-8aa4-498b-8e91-e2256cb4f828',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'HEALTH',
        'a60858bb-8321-4880-b466-110f2854f47b',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'HOUSING',
        'a60858bb-8321-4880-b466-110f2854f47b',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
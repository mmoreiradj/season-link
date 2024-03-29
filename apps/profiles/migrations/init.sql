create table candidate (
    id uuid primary key,
    first_name VARCHAR(255) not null,
    last_name VARCHAR(255) not null,
    birth_date timestamp not null,
    nationality_country_id VARCHAR(255) not null,
    description text not null,
    email VARCHAR(255) not null,
    phone_number VARCHAR(30) not null,
    address VARCHAR(255) not null,
    gender smallint not null,
    is_available boolean not null,
    available_from timestamp not null,
    available_to timestamp not null,
    place VARCHAR(255) not null,
    job_id uuid not null
);

create table experience (
    id uuid primary key,
    candidate_id uuid references candidate(id) not null,
    company_name VARCHAR(255) not null,
    job_id uuid not null,
    start_time timestamp not null,
    end_time timestamp not null,
    description text not null
);

create table reference (
    id uuid primary key,
    candidate_id uuid references candidate(id) not null,
    first_name VARCHAR(50) not null,
    last_name VARCHAR(50) not null,
    email VARCHAR(255) not null,
    phone_number VARCHAR(30) not null,
    company_name VARCHAR(255) not null
);

-- DATA GENERATED BY CHAT GPT  !

-- Function to generate random phone numbers in international format
CREATE OR REPLACE FUNCTION generate_phone_number() RETURNS VARCHAR AS $$
DECLARE
    phone_num VARCHAR;
BEGIN
    phone_num := CONCAT('+', FLOOR(random() * 10000000000)::BIGINT);
    RETURN phone_num;
END;
$$ LANGUAGE plpgsql;

-- Generating data for three candidates, each with experiences and references
DO $$
DECLARE
    i INT := 1;
    uuids VARCHAR[] := ARRAY['78be69c6-508b-40b3-b9f4-dd62703f15b5', 'ba00fcf5-6078-45af-b646-f7a0ff8c742f', '1840f235-23f0-4d96-bbdc-04d5e7dc471c', '2e33ab65-2075-4c2b-8b31-445d0fa0ae72'];
    first_names VARCHAR[] := ARRAY['John', 'Emma', 'Michael', 'Sophia', 'David', 'Olivia'];
    last_names VARCHAR[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
BEGIN
    WHILE i <= 3 LOOP
        -- Inserting a candidate with random first name, last name, and birth date
        INSERT INTO candidate (id, first_name, last_name, birth_date, nationality_country_id, description, email, phone_number, address, gender, is_available, available_from, available_to, place, job_id)
        VALUES
            (uuids[i], first_names[FLOOR(random() * array_length(first_names, 1)) + 1], last_names[FLOOR(random() * array_length(last_names, 1)) + 1], 
             MAKE_DATE(1990 + FLOOR(random() * 30)::INT, FLOOR(random() * 12 + 1)::INT, FLOOR(random() * 28 + 1)::INT), 
             'US', 'Experienced professional', 'john@example.com', generate_phone_number(), '123 Main St, City', 1, true, '2023-01-01', '2023-12-31', 'City A', gen_random_uuid());

        -- Inserting three experiences for the candidate
        INSERT INTO experience (id, candidate_id, company_name, job_id, start_time, end_time, description)
        VALUES
            (gen_random_uuid(), (SELECT id FROM candidate ORDER BY random() LIMIT 1), 'ABC Corp', (SELECT job_id FROM candidate ORDER BY random() LIMIT 1), '2015-01-01', '2017-12-31', 'Worked on various projects'),
            (gen_random_uuid(), (SELECT id FROM candidate ORDER BY random() LIMIT 1), 'XYZ Inc', (SELECT job_id FROM candidate ORDER BY random() LIMIT 1), '2018-02-01', '2020-03-15', 'Led a team in product development'),
            (gen_random_uuid(), (SELECT id FROM candidate ORDER BY random() LIMIT 1), '123 Industries', (SELECT job_id FROM candidate ORDER BY random() LIMIT 1), '2020-05-01', '2022-08-31', 'Managed client relationships');

        -- Inserting two references for the candidate
        INSERT INTO reference (id, candidate_id, first_name, last_name, email, phone_number, company_name)
        VALUES
            (gen_random_uuid(), (SELECT id FROM candidate ORDER BY random() LIMIT 1), 'Jane', 'Smith', 'jane@example.com', generate_phone_number(), 'ABC Corp'),
            (gen_random_uuid(), (SELECT id FROM candidate ORDER BY random() LIMIT 1), 'Michael', 'Johnson', 'michael@example.com', generate_phone_number(), 'XYZ Inc');

        i := i + 1;
    END LOOP;
END $$;